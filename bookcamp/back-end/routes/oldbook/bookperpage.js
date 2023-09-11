import express from 'express';
import db from '../../modules/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const perPage = 24;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = (page - 1) * perPage;

    // 算總數
    const totalQuery = 'SELECT COUNT(*) as total FROM book';
    const [rows] = await db.query(totalQuery);
    const total = rows[0].total
    const totalPages = Math.ceil(Number(total) / perPage);
    console.log(123,rows,total);

    // 拿到分頁內容
    //先過濾下架的書
    const bookQuery = `SELECT * FROM book WHERE book_status_id <> 2 LIMIT ${offset}, ${perPage}`;
    const [books] = await db.query(bookQuery);

    const output = {
      data: books,
      page: page,
      totalPages: totalPages
    }
    res.json(output);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('伺服器內部錯誤');
  }
});

export default router;
