import express from 'express' //使用Express框架
import db from '../modules/database.js' //取用連線
import dayjs from 'dayjs' //取用日期
import authenticate from '../middlewares/jwt.js'

const router = express.Router()

// cart 購物車 Read
router.get('/check', authenticate, async (req, res) => {
  try {
    //抓到會員ID
    let cid = req.user.client_id
    //抓到需要的會員資料
    const usersql = `SELECT client_id,client_point,client_name,phone,client_address FROM client WHERE client_id = ${cid}`
    const [user] = await db.query(usersql)

    //抓到需要的優惠卷資料
    const couponsql = `SELECT coupon_id,coupon_name,coupon_code,discount,discount_type,discount_display FROM coupon`
    const [coupon] = await db.query(couponsql)

    // 抓到需要的產品資料
    const newsql = `SELECT b.b_title, b.blurb,b.book_img_id,b.book_quantity,bg.b_genre_name,c.* 
FROM book b
JOIN cart c ON c.book_id = b.book_id
JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
WHERE c.client_id = ${cid} `
    const [cart] = await db.query(newsql)

    res.json({ cart, user, coupon })
  } catch (error) {
    res.status(404)
  }
})

// cart 購物車 Update
router.put('/check', authenticate, async (req, res) => {
  try {
    //接收前端更新的參數
    const cartID = req.body.cart_id
    const NewCount = req.body.book_count
    //更新資料進資料表
    const sql = `UPDATE cart SET book_count = ${NewCount} WHERE cart_id = ${cartID}`
    await db.query(sql)

    //為了刷新物品狀態，重抓一次資料傳出去
    //抓到會員ID
    let cid = req.user.client_id
    //新產品資料
    const sentsql = `SELECT c.book_id, b.b_title, b.blurb,b.book_img_id,bg.b_genre_name,c.* 
  FROM book b
  JOIN cart c ON c.book_id = b.book_id
  JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
 WHERE c.client_id = ${cid} `
    const [count] = await db.query(sentsql)

    res.status(200).json({ count })
  } catch (error) {
    res.status(404)
  }
})

// cart 購物車 delete
router.delete('/check', authenticate, async (req, res) => {
  try {
    const cartid = req.query.id
    const sql = `DELETE FROM cart WHERE cart_id=${cartid}`
    await db.query(sql)

    //為了刷新物品狀態，重抓一次資料傳出去
    //抓到會員ID
    let cid = req.user.client_id
    //新產品資料
    const sentsql = `SELECT c.book_id, b.b_title, b.blurb,b.book_img_id,bg.b_genre_name,c.* 
  FROM book b
  JOIN cart c ON c.book_id = b.book_id
  JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
  WHERE c.client_id = ${cid} `
    const [cart] = await db.query(sentsql)

    res.json({ cart })
  } catch (error) {
    res.status(404)
  }
})

// 填寫資料  Read
router.get('/checkout', authenticate, async (req, res) => {
  try {
    //抓到會員ID
    let cid = req.user.client_id
    let bookpay, bookreceipt, bookdelivery
    // 付款
    const paysql = `SELECT * FROM pay`
    ;[bookpay] = await db.query(paysql)
    // 發票
    const receiptsql = `SELECT * FROM receipt`
    ;[bookreceipt] = await db.query(receiptsql)
    // 運送
    const deliverysql = `SELECT * FROM delivery`
    ;[bookdelivery] = await db.query(deliverysql)

    res.json({ bookpay, bookreceipt, bookdelivery })
  } catch (error) {
    console.log(error)
  }
})

// 訂單完成  Read
router.post('/finish', authenticate, async (req, res) => {
  try {
    // 共用資料
    let userid = req.user.client_id

    // 傳送的會員資料
    let userdata = req.user

    /* 完成訂單後對資料庫做的事情 */
    // 需要的資料

    // 1. 會員點數有使用就扣 (要怎麼送他點數? 未完成)
    const point = req.body.point
    const usepoint = req.body.usePoint
    const newPoint = point - usepoint
    if (usepoint !== 0 && usepoint !== 'NaN' && usepoint !== 'undefined') {
      const pointsql = `UPDATE client SET client_point = ? WHERE client_id = ?`
      await db.query(pointsql, [newPoint, userid])
    }

    // 2. 新書庫存數 (如果新書庫存變為負值，要寄送Mail通知 未完成)
    // const book = req.body.book //所有新書 (陣列)
    // for (let b of book) {
    //   const new_Quantity = parseInt(b.book_quantity) - parseInt(b.book_count)
    //   const book_quantity_sql = `UPDATE book SET book_quantity = ? WHERE book_id = ?`
    //   await db.query(book_quantity_sql, [new_Quantity, b.book_id])
    // }

    // 3. 優惠卷庫存數
    const couponID = parseInt(req.body.coupon) //是優惠卷ID
    if (couponID == null) {
      const coupon_update_sql = `UPDATE coupon SET coupon_quantity = coupon_quantity - 1 WHERE coupon_id = ?`
      await db.query(coupon_update_sql, [couponID])
    }

    /* 畫面顯示的東西 */
    const pid = req.body.pay
    const rid = req.body.receipt
    const did = req.body.delivery
    const cid = req.body.coupon

    // 訂單資料
    const ordersql = `SELECT order_id, consignee, consignee_phone, consignee_address, total, delivery_address,delivery_fee, other
    FROM \`order\`
    WHERE order_id = (SELECT MAX(order_id) FROM \`order\`);`
    const [bookorder] = await db.query(ordersql)

    //訂單明細
    const booksql = `SELECT DISTINCT bd.book_id, b.b_title, b.book_img_id, bg.b_genre_name, bd.book_count, bd.book_price
    FROM book b
    JOIN order_detail bd ON bd.book_id = b.book_id
    JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
    WHERE bd.order_id = (SELECT MAX(order_id) FROM \`order\`)`
    const [bookdetails] = await db.query(booksql)

    // 把book_id改成cart_id
    const bookdetail = bookdetails.map((item) => {
      const { book_id, ...otherProps } = item
      return { cart_id: book_id, ...otherProps }
    })

    // 計算小計
    const amount = bookdetails.reduce((acc, item) => {
      const booktotal = item.book_count * item.book_price
      return acc + booktotal
    }, 0)

    // 付款
    const paysql = `SELECT pay_name FROM pay WHERE pay_id = ${pid}`
    const [bookpay] = await db.query(paysql)
    // 發票
    const receiptsql = `SELECT receipt_name FROM receipt WHERE receipt_id = ${rid}`
    const [bookreceipt] = await db.query(receiptsql)
    // 運送
    const deliverysql = `SELECT delivery_name FROM delivery WHERE delivery_id = ${did}`
    const [bookdelivery] = await db.query(deliverysql)
    // 優惠卷
    const couponsql = `SELECT C.discount_display,C.discount_type,CR.coupon_record_id FROM coupon AS C LEFT JOIN coupon_record AS CR ON C.coupon_id = CR.coupon_id WHERE CR.coupon_id = ${cid} AND CR.client_id = ${userid}`
    const [bookcoupon] = await db.query(couponsql)

    res.json({
      userdata,
      bookorder,
      bookpay,
      bookreceipt,
      bookdelivery,
      bookcoupon,
      point,
      usepoint,
      bookdetail,
      amount,
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
