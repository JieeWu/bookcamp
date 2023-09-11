import 'dotenv/config'
import express, { query, urlencoded } from 'express'
import db from '../../modules/database.js'
import bcrypt from 'bcryptjs'
import authenticate from '../../middlewares/jwt.js'
import upload from '../../modules/upload-img.js'

const forum = express.Router()

forum.use(express.urlencoded({ extended: false }))
forum.use(express.json())
// 自訂 middleware 檢查是否有帶著token進來

forum.get('/select/category/:pid', async (req, res) => {
  const itemsPerPage = 6
  const pageIndex = parseInt(req.query.page) || 1
  const pid = req.params.pid
  try {
    const totalCountQuery = `SELECT COUNT(*) as totalCount FROM forum JOIN forum_category ON forum.forum_category_id = forum_category.forum_category_id WHERE forum_category.forum_Cname='${pid}'`
    const [totalCountResult] = await db.query(totalCountQuery)
    console.log(totalCountResult)
    // 分頁做到一半 幹你娘

    const sql = `SELECT * FROM forum JOIN forum_category ON forum.forum_category_id = forum_category.forum_category_id WHERE forum_category.forum_Cname ='${pid}' LIMIT 6`
    const [rows] = await db.query(sql, [pid])
    rows.forEach((row) => {
      const publishTime = new Date(row.forum_create_time)
      const taiwanTime = publishTime.toLocaleString({
        timeZone: 'Asia/Taipei',
        hour12: false,
      })
      row.forum_create_time = taiwanTime
        .replace(' 上午', '')
        .replace(' 下午', '')
    })
    res.json({ rows, totalCountResult })
  } catch (error) {
    console.log(error)
  }
})
// 收藏
forum.post('/collect', async (req, res) => {
  try {
    const [data] = req.body
    const pid = data.post_id
    const cid = data.client_id
    const checkSql =
      'select *  from forum_collect WHERE forum_id = ? AND client_id = ?'
    const [resCheck] = await db.query(checkSql, [pid, cid])
    if (resCheck.length > 0) {
      const deleteSql = 'DELETE FROM forum_collect WHERE collect_id = ?'
      const result = await db.query(deleteSql, [resCheck[0].collect_id])
      res.json(result)
    } else {
      const sql = 'INSERT INTO forum_collect (forum_id,client_id) VALUES (?,?)'
      const result = await db.query(sql, [data.post_id, data.client_id])
      res.json(result)
    }
  } catch (error) {
    res.json(error)
  }
})
//印出收藏
forum.get('/collect', authenticate, async (req, res) => {
  try {
    console.log(req.user.client_id)
    const sql =
      'select f.forum_id,f.forum_title,f.forum_content,f.forum_create_time,fc.forum_Cname from forum_collect as c JOIN forum as f ON c.forum_id = f.forum_id JOIN forum_category as fc ON f.forum_category_id = fc.forum_category_id  WHERE c.client_id = ?'
    const [result] = await db.query(sql, [req.user.client_id])
    console.log(result)
    res.json(result)
  } catch (error) {
    console.error(error)
  }
})
forum.get('/user/Post', authenticate, async (req, res) => {
  try {
    console.log(req.user.client_id)
    const sql =
      'select forum.*, forum_category.forum_Cname FROM forum JOIN forum_category ON forum.forum_category_id = forum_category.forum_category_id WHERE client_id = ?'
    const [result] = await db.query(sql, [req.user.client_id])
    console.log(result)
    res.json(result)
  } catch (error) {
    console.error(error)
  }
})
// // 根據pid取得文章
forum.get('/post/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params
    const { status } = req.query
    const sql =
      'SELECT * FROM forum JOIN client ON forum_id = ? AND (forum.client_id = client.client_id) '
    const replyDataSql =
      'SELECT forum_reply.*,client.client_name FROM forum_reply JOIN forum ON forum_reply.forum_id = forum.forum_id JOIN client ON forum_reply.client_id = client.client_id WHERE forum_reply.forum_id = ?'
    const [avatar] = await db.query(sql, [post_id])
    const [replyData] = await db.query(replyDataSql, [post_id])
    avatar.forEach((row) => {
      const publishTime = new Date(row.forum_create_time)
      const taiwanTime = publishTime.toLocaleString({
        timeZone: 'Asia/Taipei',
        hour12: false,
      })
      row.forum_create_time = taiwanTime
        .replace(' 上午', ' ')
        .replace(' 下午', ' ')
    })

    const data = res.locals.jwtData
    res.json({ rows: avatar, data, replyData })
  } catch (error) {
    res.json(error)
  }
})
// 搜索文章
forum.post('/reply/message', async (req, res) => {
  try {
    const postId = req.body
    const sql =
      'SELECT * FROM forum_message as f JOIN client as c ON f.client_id = c.client_id WHERE forum_id=? '
    const data = await db.query(sql, [postId])
    res.json(data)
  } catch (error) {
    res.json(error)
  }
})
// 文章內新增
forum.post('/reply/post', authenticate, async (req, res) => {
  try {
    const { title, content, question, forum_id } = req.body.data
    console.log(title)
    const avatar = req.user.avatar
    const cid = req.user.client_id

    const sql =
      'INSERT INTO forum_reply(forum_content, forum_id, client_id, forum_category_id, avatar) VALUES (?,?,?,?,?)'
    const [result] = await db.query(sql, [
      content,
      forum_id,
      cid,
      question,
      avatar,
    ])
    res.json(result)
  } catch (error) {
    res.json(error)
  }
})
// 文章內新增留言
forum.post('/reply/message2', authenticate, async (req, res) => {
  try {
    const [data] = req.body
    const data2 = req.user.client_id
    const sql = `INSERT INTO forum_message (id,client_id,forum_id,forum_content) VALUES (?,?,?,?)
    `
    const result = await db.query(sql, [
      parseInt(data.id),
      data2,
      parseInt(data.post_id),
      data.content,
    ])
    console.log(data.post_id)
    // const resSql =
    // 'SELECT * FROM forum_message WHERE forum_id = ? AND forum_id IN (SELECT forum_id FROM forum_reply)'
    const resSql =
      'SELECT * FROM forum_message as f JOIN client as c ON f.client_id = c.client_id WHERE forum_id=?'
    const [successRes] = await db.query(resSql, [data.post_id])
    console.log(successRes)
    res.status(200).json(successRes)
  } catch (error) {
    console.error(error)
    res.status(500).send('error')
  }
})
//

//圖片上傳
forum.post('/try-upload', upload.single('avatar'), (req, res) => {
  console.log(req.file.filename)
  try {
    console.log('1', req.file.filename)
    const data = {
      errno: 0,
      data: {
        url: `http://localhost:3002/img/${req.file.filename}`,
      },
    }
    res.json(data)
  } catch (error) {
    res.json(error)
  }
})
forum.get('/select/post', async (req, res) => {
  const itemsPerPage = 6
  const pageIndex = parseInt(req.query.page) || 1
  try {
    // 查询总文章数量
    const totalCountQuery =
      "SELECT COUNT(*) as totalCount FROM forum WHERE client_id != 'NULL'"
    const [[totalCountResult]] = await db.query(totalCountQuery)
    const totalCount = totalCountResult.totalCount
    const offset = (pageIndex - 1) * itemsPerPage

    // 构建 SQL 查询语句
    const sql = `
    SELECT * FROM forum f
    JOIN forum_category c ON f.forum_category_id = c.forum_category_id ORDER BY f.forum_id DESC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `

    const [rows] = await db.query(sql)
    rows.forEach((row) => {
      const publishTime = new Date(row.forum_create_time)
      const taiwanTime = publishTime.toLocaleString('en-US', {
        timeZone: 'Asia/Taipei',
        hour12: false,
      })
      row.forum_create_time = taiwanTime
        .replace('AM')
        .replace('PM')
        .replace(',', '')
    })
    res.json({ rows, totalCount })
  } catch (error) {
    console.log(error.message)
    res.send('error')
  }
})

// // 問題
forum.get('/select/question', async (req, res) => {
  try {
    const sql = 'SELECT * FROM forum_question '
    const [data] = await db.query(sql)
    res.json(data)
  } catch (error) {
    res.json(error)
  }
})
forum.get('/reply', async (req, res) => {
  try {
    const sql =
      'SELECT * FROM forum JOIN forum_reply ON forum.forum_id = forum_reply.forum_id WHERE forum.forum_id = forum_reply.forum_id'
    const [res2] = await db.query(sql)

    res.json(res2)
  } catch (error) {
    res.json(error)
  }
})

// 使用 ES6 的方式導出 router
// // 設置靜態路由

// // 新增
forum.post('/api/insertData', authenticate, async (req, res) => {
  try {
    const { title, content, question } = req.body

    const categorySql =
      'SELECT forum_category_id FROM forum_category WHERE forum_category_id = ?'
    const [data] = await db.query(categorySql, question)
    const categoryId = data[0].forum_category_id

    const clientId = req.user.client_id
    const sql =
      'INSERT INTO forum (forum_title,forum_content,client_id,forum_category_id	) VALUES (?,?,?,?)'
    const values = [title, content, clientId, categoryId]
    console.log('values', values)
    const [result] = await db.query(sql, values)
    if (result.affectedRows > 0) {
      res.json('pass')
    } else {
      res.json('error')
    }
  } catch (error) {
    console.log(error)
  }
})
// 新增留言
// // 分類
forum.get('/select/category', async (req, res) => {
  try {
    const sql = 'SELECT * FROM forum_category'
    const [rows] = await db.query(sql)
    res.json({ rows })
  } catch (error) {
    res.json(error)
  }
})
//取得編輯資料
forum.post('/getEdit', authenticate, async (req, res) => {
  try {
    const [successData] = req.body
    let sql = ''
    if (successData[1].id) {
      sql = 'SELECT * FROM forum WHERE forum_id = ?'
      const [data] = await db.query(sql, [successData[0].pid])
      console.log(data)
      const cid = data[0].forum_category_id
      const sqlC =
        'SELECT forum_Cname FROM forum_category WHERE forum_category_id = ?'
      const [result] = await db.query(sqlC, cid)
      const newData = { ...data[0], forum_Cname: result[0].forum_Cname }
      // console.log(newData)
      res.json(newData)
    } else {
      sql = 'SELECT * FROM forum_reply WHERE forum_reply.forum_reply_id = ?'
      const [data] = await db.query(sql, [successData[1].rid])
      const cid = data[0].forum_category_id
      const sqlC =
        'SELECT forum_Cname FROM forum_category WHERE forum_category_id = ?'
      const [result] = await db.query(sqlC, cid)
      const newData = { ...data[0], forum_Cname: result[0].forum_Cname }
      // console.log(newData)
      res.json(newData)
    }
  } catch (error) {
    res.json(error)
  }
})
//修改編輯後資料
forum.put('/putEdit', authenticate, async (req, res) => {
  try {
    const { title, content, question, forum_id, status } = req.body
    const categorySql =
      'UPDATE forum SET forum_title=? , forum_content=? , forum_category_id=?  WHERE forum_id = ?'
    const [result] = await db.query(categorySql, [
      title,
      content,
      question,
      forum_id,
    ])
    console.log(result)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
})
forum.put('/putReplyEdit', authenticate, async (req, res) => {
  try {
    const { content, question, forum_reply_id } = req.body.data
    const categorySql =
      'UPDATE forum_reply SET forum_content=? , forum_category_id=?  WHERE forum_reply_id = ?'
    const [result] = await db.query(categorySql, [
      content,
      question,
      req.body.forum_reply_id,
    ])
    console.log(result)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
})
//刪除文章
forum.delete('/delete/post', async (req, res) => {
  try {
    const startTransaction = 'START TRANSACTION;'
    const deleteForum = 'DELETE FROM forum WHERE forum_id = ?;'
    const deleteForumReply = 'DELETE FROM forum_reply WHERE forum_id = ?;'
    const deleteForumMessage = 'DELETE FROM forum_message WHERE forum_id = ?;'
    const commit = 'COMMIT;'
    await db.query(startTransaction)
    await db.query(deleteForum, [req.query.id])
    await db.query(deleteForumReply, [req.query.id])
    await db.query(deleteForumMessage, [req.query.id])
    await db.query(commit)
    console.log('Transaction successful')
    res.json('success')
  } catch (error) {
    await db.query('ROLLBACK;')
    console.error('Transaction failed:', error)
  }
})
// 搜尋
forum.post('/select/search', async (req, res) => {
  try {
    const [data] = req.body
    const sql = `SELECT * from forum f where f.forum_title LIKE ? OR f.forum_content LIKE ?`
    await db.query(sql, [`%${data}%`, `%${data}%`]).then((results) => {
      const [result] = results
      res.json(result)
    })
  } catch (error) {
    res.status(404).error
  }
})
forum.put('/post/like', async (req, res) => {
  try {
    const [pid] = req.body
    const sql =
      'UPDATE forum f SET f.forum_views = forum_views+1 WHERE f.forum_id = ?'
    const [data] = await db.query(sql, pid)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
forum.put('/post/dislike', async (req, res) => {
  try {
    const [pid] = req.body
    const sql =
      'UPDATE forum f SET f.forum_views = forum_views-1 WHERE f.forum_id = ?'
    const data = await db.query(sql, pid)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
})
forum.use(express.static('public'))

export default forum
