import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線
import authenticate from '../../middlewares/jwt.js'

const router = express.Router()

// cart 加購畫面 Read
router.get('/', async (req, res) => {
  try {
    // 隨機抓十筆書
    const bookForCartModalsql = `SELECT * FROM book ORDER BY RAND() LIMIT 12`
    const [bookadd1] = await db.query(bookForCartModalsql)

    res.json({ bookadd1 })
  } catch (error) {
    res.status(404)
  }
})

// cart 加入購物車 Insert
router.post('/add', authenticate, async (req, res) => {
  try {
    //抓到會員編號
    let cid = req.user.client_id
    //抓到點擊的資料
    const bid = req.body.book_id
    const bprice = req.body.book_price

    //先抓購物車裡面的資料出來進行比對
    const defaultCartsql = `SELECT * FROM cart WHERE client_id = ? AND book_id = ?`
    const [defaultCart] = await db.query(defaultCartsql, [cid, bid])

    if (defaultCart.length > 0) {
      //如果比對資料有一樣
      const updateSql = `UPDATE cart SET book_count = book_count + 1 WHERE client_id = ? AND book_id = ?`
      await db.query(updateSql, [cid, bid])
    } else {
      //如果比對資料沒有一樣的，就新加入資料表Cart
      const cartsql = `INSERT INTO cart (client_id, book_id, book_price, book_count) VALUES (?,?,?,?);`
      await db.query(cartsql, [cid, bid, bprice, 1])
    }
    /* 傳送回去 */
    const newsql = `SELECT b.b_title, b.blurb,b.book_img_id,b.book_quantity,bg.b_genre_name,c.* 
FROM book b
JOIN cart c ON c.book_id = b.book_id
JOIN book_genre bg ON bg.b_genre_id = b.b_genre_id
WHERE c.client_id = ${cid} `
    const [newcart] = await db.query(newsql)
    res.json({ newcart })
  } catch (error) {
    res.status(404)
  }
})

export default router
