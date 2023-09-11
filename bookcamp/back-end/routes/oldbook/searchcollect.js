import express from "express"; //使用express
import db from "../../modules/database.js"; //連線資料庫
import authenticate from "../../middlewares/jwt.js";

//建立路由器
const searchcollect = express.Router();

//可以找到會員的所有收藏 
//本來寫好的會員收藏有新書和舊書 但現在只需要新書 不用舊書了:)
searchcollect.get("/", authenticate, async (req, res) => {
  const clientId = req.user.client_id;
  try {
    // 會員的資料
    const clientAll = `SELECT * FROM client WHERE client_id=?`;
    const [client] = await db.query(clientAll, [clientId]);


    const collectBookData = `
        SELECT b.* 
        FROM collect_book AS cb
        JOIN book AS b ON cb.book_id = b.book_id
        WHERE cb.client_id=?
    `;
    const [collectBook] = await db.query(collectBookData, [clientId]);


    // 本來type是判定新書二手書 但type改成書籍語言的分類 那也不用判定了
    //只需要定是哪種語言的書 :)
    const genreAll = "SELECT * FROM book_genre";
    const [genre] = await db.query(genreAll);
    res.json({ client, collectBook, genre });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 首次載入判斷
searchcollect.get("/collect", authenticate, async (req, res) => {
  const cid = req.user.client_id;
  try {
    // 先判斷是否為登入狀態
    if (cid != '' && cid != undefined) {
      const collectsql = `SELECT cb.book_id 
      FROM collect_book cb
      JOIN book b ON cb.book_id = b.book_id
      WHERE cb.client_id=?`
      const [collectID] = await db.query(collectsql, [cid])

      res.json(collectID);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 做新增和刪除
searchcollect.post("/love", authenticate, async (req, res) => {
  const cid = req.user.client_id;
  let list = req.body.click;

  try {

    const lovesql = `SELECT * FROM collect_book WHERE client_id=? AND book_id=?`
    let [x] = await db.query(lovesql, [cid, list]);

    if (x.length < 1) {
      const insertsql = `INSERT INTO collect_book (client_id,book_id) VALUES (?,?)`;
      await db.query(insertsql, [cid, list]);
    } else {
      const deletesql = `DELETE FROM collect_book WHERE client_id=? AND book_id=?`
      await db.query(deletesql,[cid, list])
    }

    // 打印
    const collectsql = `SELECT cb.book_id 
      FROM collect_book cb
      JOIN book b ON cb.book_id = b.book_id
      WHERE cb.client_id=?`
    const [collectID] = await db.query(collectsql, [cid])

    res.json({collectID,x})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default searchcollect;
