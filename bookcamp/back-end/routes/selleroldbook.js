// import express from "express";
// import db from "../modules/database.js";

// const selleroldbookRouter = express.Router();
//新增表單 用不到了
// selleroldbookRouter.post("/", (req, res) => {
//   const q = 
//     "INSERT INTO old_book(`old_book_title`, `old_book_price`, `old_book_author`, `old_book_count`, `book_language`, `old_book_blurb`, `book_status_id`, `sherlf_date`, `revise_date`, `b_genre_id`,`b_type_id`,`old_book_img_id`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
  
//   const values = [
//     req.body.old_book_title,
//     req.body.old_book_price,
//     req.body.old_book_author,
//     req.body.old_book_count,
//     req.body.book_language,
//     req.body.old_book_blurb,
//     req.body.book_status_id,
//     req.body.sherlf_date,
//     req.body.revise_date,
//     req.body.b_genre_id,
//     req.body.b_type_id,
//     req.body.old_book_img_id,
//   ];
  
//   db.query(q, values, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// export default selleroldbookRouter;

