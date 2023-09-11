import express from "express";
import db from "../modules/database.js";

//建立路由
const obgenerRouter = express.Router();

obgenerRouter.get("/:b_genre_id", async (req, res) => {
  try {
    const obookid = parseInt(req.params.b_genre_id) || 0;
    //分類的資料
    const genreAll = `SELECT * FROM  book_genre WHERE b_genre_id=?`;
    const [genre] = await db.query(genreAll, [obookid]);
    //二手書的資料
    const oldbookAll = `SELECT * FROM old_book WHERE 
    b_genre_id=?`;
    const [oldbook] = await db.query(oldbookAll, [obookid]);
    res.json({genre, oldbook });
    
  } catch (err) {
    res.json(err);
  }
});
export default obgenerRouter;