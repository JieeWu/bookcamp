import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線

const router = express.Router()


// 產品頁面用
// router.get('/', async (req, res) => {
//     try {
//       const activitysql = `SELECT * FROM book ORDER BY sherlf_date DESC  ;`
//       const [activity] = await db.query(activitysql)
  
//       res.json({ activity })
//     } catch (error) {
//       res.status(404)
//     }
//   });

  router.get('/', async (req, res) => {
    try {
      const sortOrder = req.query.sortOrder || 'DESC'; 
      const page = parseInt(req.query.page, 10) || 1; // 從查詢字符串獲取頁面或默認為 1
      const itemsPerPage = 24; // 一頁數量
  
      if (!['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
        return res.status(400).json({ message: '無效的排序参数' });
      }
  
      const offset = (page - 1) * itemsPerPage; // Calculating offset for pagination
  
      const booksQuery = `SELECT * FROM book WHERE book_status_id <> 2 ORDER BY sherlf_date ${sortOrder} LIMIT ? OFFSET ?;`;
      const [activity] = await db.query(booksQuery, [itemsPerPage, offset]);
  
      // 總數
      const totalBooksQuery = `SELECT COUNT(*) as totalBooks FROM book`;
      const [totalResult] = await db.query(totalBooksQuery);
      const totalBooks = totalResult[0].totalBooks;
      const totalPages = Math.ceil(totalBooks / itemsPerPage); // 算分頁
  
      res.json({ activity, totalPages, currentPage: page });
  
    } catch (error) {
      res.status(500).json({ message: '錯誤' });
    }
  });
  
  



export default router
