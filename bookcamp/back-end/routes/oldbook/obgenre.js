import express from "express";
import db from "../../modules/database.js";

//建立路由
const obgenerRouter = express.Router();

//這個是找到分類的所有資料 也就是側邊的地方
obgenerRouter.get("/:b_genre_id", async (req, res) => {
  try {
    const obookid = parseInt(req.params.b_genre_id) || 0;

    // 分頁相關參數
    const perPage = 24; // 每頁顯示的書籍數量
    const page = req.query.page ? parseInt(req.query.page) : 1; // 從查詢參數中獲取頁碼
    const offset = (page - 1) * perPage;

    // 分類的資料
    const genreAll = `SELECT * FROM book_genre WHERE b_genre_id=?`;
    const [genre] = await db.query(genreAll, [obookid]);

    // 獲取特定分類下的書籍，並進行分頁
    const oldbookAll = `SELECT * FROM book WHERE b_genre_id=? LIMIT ${offset}, ${perPage}`;
    const [oldbook] = await db.query(oldbookAll, [obookid]);

    // 查詢特定分類下的總書籍數量，用於計算總頁數
    const countQuery = `SELECT COUNT(*) as total FROM book WHERE b_genre_id=?`;
    const [countResult] = await db.query(countQuery, [obookid]);
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / perPage);

    res.json({
      genre,
      oldbook,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (err) {
    res.json(err);
  }
});


obgenerRouter.get("/language/:book_language", async (req, res) => {
  try {
    const itemsPerPage = 24; // 每頁顯示的項目數量
    const obookid = parseInt(req.params.book_language) || 0;
    const currentPage = parseInt(req.query.page) || 1; // 從查詢參數中獲取當前頁數，預設為第1頁

    // 語言的資料
    const languageAll = `SELECT * FROM book_language WHERE b_language_id=?`;
    const [language] = await db.query(languageAll, [obookid]);

    // 新書的總數量
    const oldbookCountQuery = `SELECT COUNT(*) as count FROM book WHERE b_language_id=?`;
    const [countResult] = await db.query(oldbookCountQuery, [obookid]);
    const totalCount = countResult[0].count;

    // 計算總頁數
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // 計算查詢的偏移量
    const offset = (currentPage - 1) * itemsPerPage;

    // 新書的資料，分頁查詢
    const oldbookAll = `SELECT * FROM book WHERE b_language_id=? LIMIT ?, ?`;
    const [oldbook] = await db.query(oldbookAll, [obookid, offset, itemsPerPage]);

    res.json({
      language,
      oldbook,
      currentPage,
      totalPages,
    });
  } catch (err) {
    console.log(err);
  }
});


export default obgenerRouter;