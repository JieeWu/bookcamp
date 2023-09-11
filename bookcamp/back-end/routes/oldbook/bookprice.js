import express from 'express'
import db from '../../modules/database.js'

const router = express.Router()

// //++
// router.get("/few", async (req, res) => {
//   try {
//     const book = `SELECT * FROM book ORDER BY book_price ASC;`;
//     const [bookAll] = await db.query(book);
//     res.json({bookAll});
//   } catch (error) {
//     res.status(500).json({ message: "錯誤" });
//   }
// });

// //--
// router.get("/many", async (req, res) => {
//     try {
//       const book = `SELECT * FROM book ORDER BY book_price DESC;`;
//       const [bookAll] = await db.query(book);
//       res.json({bookAll});
//     } catch (error) {
//       res.status(500).json({ message: "錯誤" });
//     }
//   });

// router.get('/books', async (req, res) => {
//   try {
//     const sortOrder = req.query.sortOrder || 'ASC'

//     if (!['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
//       return res.status(400).json({ message: '無效的排序参数' })
//     }

//     const book = `SELECT * FROM book ORDER BY book_price ${sortOrder};`
//     const [bookAll] = await db.query(book)
//     res.json({ bookAll })
//   } catch (error) {
//     res.status(500).json({ message: '錯誤' })
//   }
// })

router.get('/books', async (req, res) => {
  try {
    const sortOrder = req.query.sortOrder || 'ASC';
    const page = parseInt(req.query.page, 10) || 1; // 從查詢字符串獲取頁面或默認為 1
    const itemsPerPage = 24; // 每頁書籍數量

    if (!['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
      return res.status(400).json({ message: '無效的排序参数' });
    }

    const offset = (page - 1) * itemsPerPage; // 計算分頁偏移量

    const booksQuery = `SELECT * FROM book ORDER BY book_price ${sortOrder} LIMIT ? OFFSET ?;`;
    const [books] = await db.query(booksQuery, [itemsPerPage, offset]);

    // 獲取書總數
    const totalBooksQuery = `SELECT COUNT(*) as totalBooks FROM book`;
    const [totalResult] = await db.query(totalBooksQuery);
    const totalBooks = totalResult[0].totalBooks;
    const totalPages = Math.ceil(totalBooks / itemsPerPage); // 計算總頁數

    res.json({ books, totalPages, currentPage: page });

  } catch (error) {
    res.status(500).json({ message: '錯誤' });
  }
});







router.get('/newdate', async (req, res) =>{
  try{
    const date = `SELECT * FROM book ORDER BY sherlf_date DESC`;
    const [dateAll] = await db.query(date)
    res.json({dateAll})
  }catch(err){
    console.log(err);
  }
})

export default router
