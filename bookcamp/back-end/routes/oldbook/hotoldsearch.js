import express from 'express'
import db from '../../modules/database.js'
import dayjs from 'dayjs'

const hotodsearch = express.Router()

//這個是熱門搜尋 已經做好了:)
// hotodsearch.get('/', async (req, res) => {
//   try {
//     const term = req.query.term

//     const [data] = await db.query(`SELECT * FROM book WHERE b_title LIKE ?`, [
//       `%${term}%`,
//     ])
//     res.json(data);
//   } catch (err) {
//     console.error(err)
//   }
// })


hotodsearch.get('/', async (req, res) => {
    try {
      const perPage = 24;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const offset = (page - 1) * perPage;
  
      const term = req.query.term;
      const searchValue = `%${term}%`;
  
      // 查詢書籍
      const query = `SELECT * FROM book WHERE b_title LIKE ? LIMIT ?, ?`;
      const [oldbook] = await db.query(query, [searchValue, offset, perPage]);
  
      // 查詢總數
      const totalQuery = `SELECT COUNT(*) as total FROM book WHERE b_title LIKE ?`;
      const [totalData] = await db.query(totalQuery, [searchValue]);
      const total = totalData[0].total;
  
      res.json({
        oldbook,
        total,
        perPage,
        page,
        totalPages: Math.ceil(total / perPage)
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  





export default hotodsearch
