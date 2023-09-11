import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線
import dayjs from 'dayjs'
const router = express.Router()

router.get('/:book_id', async (req, res) => {
  try {
    const id = req.params.book_id

    //抓到需要的會員資料
    const commentsql = `SELECT od.book_id,od.book_assess,od.book_star,o.order_create_date,c.client_name FROM order_detail od
        JOIN book b on b.book_id = od.book_id
        JOIN \`order\` o on o.order_id = od.order_id
        JOIN client c on c.client_id = o.client_id
        WHERE od.book_id = ?`
    const [comment] = await db.query(commentsql, [id])

    // 訂單創建日期改格式
    comment.forEach((i) => {
      i.order_create_date = dayjs(i.order_create_date).format('YYYY-MM-DD')
    })

    res.json({ comment })
  } catch (error) {
    console.log(error)
  }
})
export default router
