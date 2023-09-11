import express from 'express'
import bodyParser from 'body-parser'
import db from '../../modules/database.js'

const router = express.Router()

// 使用bodyParser解析POST請求的資料
router.use(bodyParser.json())

// 簽到API
router.post('/:client_id', async (req, res) => {
  const client_id = req.params.client_id

  try {
    // 檢查這個用戶是否已經在今天簽到
    const [results] = await db.query(
      'SELECT * FROM daily WHERE client_id = ? AND date = CURDATE()',
      [client_id],
    )

    if (results.length === 0) {
      await db.query(
        'INSERT INTO daily (client_id, date, is_sign) VALUES (?, CURDATE(), true)',
        [client_id],
      )
      res.json({ message: '簽到成功!' })
    } else {
      res.json({ message: '您今天已經簽到了。' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Database error: ' + err.message)
  }
})

router.get('/:client_id', async (req, res) => {
  const client_id = req.params.client_id

  try {
    const [results] = await db.query(
      'SELECT date FROM daily WHERE client_id = ? AND is_sign = true',
      [client_id],
    )

    const signedDates = results.map((result) => result.date)
    res.json({ signedDates })
  } catch (err) {
    console.error(err)
    res.status(500).send('Database error: ' + err.message)
  }
})

router.put('/:client_id', async (req, res) => {
  const client_id = req.params.client_id
  const { client_point } = req.body

  try {
    await db.query('UPDATE client SET client_point = ? WHERE client_id = ?', [
      client_point,
      client_id,
    ])

    res.json({ message: 'success' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Database error: ' + err.message)
  }
})

export default router
