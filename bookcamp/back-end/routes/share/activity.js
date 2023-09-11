import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線

const router = express.Router()

// 活動商品區 Read
router.get('/', async (req, res) => {
  try {
    const activitysql = `SELECT * FROM book ORDER BY RAND() LIMIT 12;`
    const [activity] = await db.query(activitysql)

    res.json({ activity })
  } catch (error) {
    res.status(404)
  }
})

router.post('/', async (req, res) => {
  // 抓到選擇的btn 
  const data = req.body.data;
  try {
    if (data == '1') {
      const activitysql = `SELECT *
      FROM book
      WHERE MONTH(sherlf_date) = MONTH(CURRENT_DATE())
      ORDER BY sherlf_date DESC
      LIMIT 12`;
      const [activity] = await db.query(activitysql)
      res.json({ activity })
    } else if (data == '2') {
      const activitysql = `SELECT *
      FROM book
      WHERE YEARWEEK(sherlf_date) = YEARWEEK(CURRENT_DATE())
      ORDER BY sherlf_date DESC
      LIMIT 12;`
      const [activity] = await db.query(activitysql)
      res.json({ activity })
    } else if (data == '3'){
      const activitysql = `SELECT *
      FROM book
      WHERE DATE(sherlf_date) = CURRENT_DATE()
      ORDER BY sherlf_date DESC
      LIMIT 12;`
      const [activity] = await db.query(activitysql)
      res.json({ activity })
    } else if (data == '限時搶購' || data == '倒數' || data == '5') {
      const activitysql = `SELECT * FROM book GROUP BY book_price ASC LIMIT 12;`
      const [activity] = await db.query(activitysql)
      res.json({ activity })
    } else if (data == '熱門推薦' || data == '好書都在' || data == '6') {
      const activitysql = `SELECT * FROM book GROUP BY book_price DESC LIMIT 12;`
      const [activity] = await db.query(activitysql)
      res.json({ activity })
    } else {
      const activitysql = `SELECT * FROM book ORDER BY RAND() LIMIT 12;`
      const [activity] = await db.query(activitysql)
      res.json({ activity })
    }
  } catch (error) {
    res.status(404)
  }
})

export default router
