import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線

const router = express.Router()

// 英文書 Read
router.get('/', async (req, res) => {
  try {
    const TWsql = `SELECT *
        FROM book
        WHERE b_language_id = 1
        ORDER BY RAND()
        LIMIT 8;`
    const [TWbook] = await db.query(TWsql)

    res.json({ TWbook })
  } catch (error) {
    res.status(404)
  }
})
router.get('/bookCategory', async (req, res) => {
  try {
    const sql = 'SELECT * FROM book_genre;'
    const [data] = await db.query(sql)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
router.post('/bookCategory', async (req, res) => {
  try{
  const [cid] = req.body
  const sql = `SELECT b.*,bg.b_genre_name FROM book b JOIN book_genre bg ON b.b_genre_id = bg.b_genre_id WHERE b.b_genre_id = ? LIMIT 8`
  const data = await db.query(sql, [cid])
  res.json(data)} catch (error) {
    console.log(error)
  }
})

export default router
