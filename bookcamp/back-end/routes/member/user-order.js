import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線
import authenticate from '../../middlewares/jwt.js'
import dayjs from 'dayjs' //取用日期

const router = express.Router()

// 訂單 - Read
router.get('/', authenticate, async (req, res) => {
  try {
    const cid = req.user.client_id

    // 訂單
    const ordersql = `SELECT * FROM \`order\` WHERE client_id = ${cid} ORDER BY order_id DESC;`
    const [order] = await db.query(ordersql)

    order.forEach((i) => {
      i.order_create_date = dayjs(i.order_create_date).format('YYYY-MM-DD')
    })

    // 付款
    const paysql = `SELECT * FROM pay`
    const [pay] = await db.query(paysql)
    // 狀態
    const statussql = `SELECT * FROM order_status`
    const [status] = await db.query(statussql)
    // 優惠卷
    const couponsql = `SELECT * FROM coupon`
    const [coupon] = await db.query(couponsql)

    res.json({ order, pay, status, coupon })
  } catch (error) {
    console.log(error)
  }
})

// 訂單明細 - Read
router.get('/:order_id', async (req, res) => {
  try {
    const oid = req.params.order_id

    // 訂單明細
    const detailsql = `SELECT b.b_title,b.book_img_id,bg.b_genre_name,de.*
        FROM book b
        JOIN order_detail de ON de.book_id = b.book_id
        JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
        WHERE order_id = ${oid}`
    const [detail] = await db.query(detailsql)

    // 訂單
    const ordersql = `SELECT * FROM \`order\` WHERE order_id = ${oid};`
    const [order] = await db.query(ordersql)
    // 發票
    const receiptsql = `SELECT * FROM receipt`
    const [receipt] = await db.query(receiptsql)
    // 運送
    const deliverysql = `SELECT * FROM delivery`
    const [delivery] = await db.query(deliverysql)

    res.json({ detail, order, receipt, delivery })
  } catch (error) {
    console.log(error)
  }
})

// 訂單明細-評論 Read
router.get('/comment/:id', async (req, res) => {
  try {
    const pid = req.params.id
    // 訂單明細
    const detailsql = `SELECT b.b_title,b.book_img_id,bg.b_genre_name,de.*
        FROM book b
        JOIN order_detail de ON de.book_id = b.book_id
        JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
        WHERE order_detail_id = ${pid}`
    const [detail] = await db.query(detailsql)

    // 檢查資料
    const checksql = `SELECT book_star,book_assess FROM order_detail WHERE order_detail_id=?`
    const [checkStar] = await db.query(checksql, [pid])

    res.json({ detail, checkStar })
  } catch (error) {
    console.log(error)
  }
})

// 訂單明細-評論 update
router.put('/comment/:id', async (req, res) => {
  try {
    const oid = req.params.id
    const star = req.body.rating
    const comment = req.body.comment

    if (comment) {
      const sql =
        'UPDATE `order_detail` SET book_star=? , book_assess=? WHERE order_detail_id = ?'
      await db.query(sql, [star, comment, oid])
    } else {
      const sql =
        'UPDATE `order_detail` SET book_star=? WHERE order_detail_id = ?'
      await db.query(sql, [star, oid])
    }
    res.json({})
  } catch (error) {
    console.log(error)
  }
})

export default router
