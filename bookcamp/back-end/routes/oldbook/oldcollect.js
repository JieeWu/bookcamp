import express from "express"; //使用express
import db from "../../modules/database.js";
import authenticate from "../../middlewares/jwt.js";

//建立路由器
const collectRouter = express.Router();

//加入收藏
collectRouter.post("/oldcollect", authenticate, (req, res) => {
  const clientId = req.user.client_id;

  const q =
    "INSERT INTO collect_book(`book_id`,`client_id`) VALUES(?,?)";
  const values = [req.body.book_id, clientId];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    //return res.json(data);
    console.log('123');
    // return res.json({ message: "已收藏" });
  });
  return res.json({ message: "已收藏" });

});

// 取消收藏舊書
collectRouter.delete("/oldcollect", authenticate, (req, res) => {
  const clientId = req.user.client_id;
  const oldBookId = req.body.book_id;

  const q =
    "DELETE FROM collect_book WHERE book_id = ? AND client_id = ?";

  db.query(q, [oldBookId, clientId], (err, data) => {
    if (err) return res.json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "收藏的書籍未找到" });
    }
  //  return res.json({ message: "已取消收藏" });
  });

  return res.json({ message: "已取消收藏" });
});

//取消所有收藏

collectRouter.delete("/Alloldcollect", authenticate, (req, res) => {
  const clientId = req.user.client_id;
 
//取消所有收藏
  const q = "DELETE FROM collect_book WHERE client_id = ?";

  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "沒有找到收藏的書籍" });
    }
  });
  return res.json({ message: "已取消所有收藏" });
});;


export default collectRouter;
