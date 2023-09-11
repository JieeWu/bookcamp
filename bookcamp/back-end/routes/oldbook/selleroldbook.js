import express from "express";
import db from "../../modules/database.js";
import dayjs from "dayjs";

const selleroldbookRouter = express.Router();

//新增
selleroldbookRouter.post("/", (req, res) => {
  const q =
    "INSERT INTO book(`b_title`, `book_price`,`author`, `book_quantity`, `b_language_id`, `blurb`, `book_status_id`, `sherlf_date`, `revise_date`, `b_genre_id`,`b_type_id`,`book_img_id`,`isbn`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
  const values = [
    req.body.b_title,
    req.body.book_price,
    req.body.author,
    req.body.book_quantity,
    req.body.b_language_id,
    req.body.blurb,
    req.body.book_status_id,
    req.body.sherlf_date,
    req.body.revise_date,
    req.body.b_genre_id,
    req.body.b_type_id,
    req.body.book_img_id,
    req.body.isbn
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
  });
  return res.json('成功');
});

//更新
selleroldbookRouter.put("/:book_id", (req, res) => {
  const oldbookId = req.params.book_id;
  const oldbook =
    "UPDATE book SET `b_title`=?, `book_price`=?, `author`=?, `book_quantity`=?, `b_language_id`=?, `blurb`=?, `revise_date`=?, `b_genre_id`=?, `b_type_id`=?, `book_img_id`=?,`isbn`=?,`book_status_id`=? WHERE `book_id`=? ;";

  const values = [
    req.body.b_title,
    req.body.book_price,
    req.body.author,
    req.body.book_quantity,
    req.body.b_language_id,
    req.body.blurb,
    req.body.revise_date,
    req.body.b_genre_id,
    req.body.b_type_id,
    req.body.book_img_id,
    req.body.isbn,
    req.body.book_status_id,
    oldbookId,
  ];

  console.log(values);

  db.query(oldbook, values, (err, data) => {
    if (err) return res.json(err);
  });
  return res.json("更新成功");
});

selleroldbookRouter.get("/:book_id", async (req, res) => {
  const oldbookId = req.params.book_id;

  const checkOwnershipQuery = "SELECT * FROM book WHERE `book_id`=?";

  try {
      const [data] = await db.query(checkOwnershipQuery, [oldbookId]); 

      if (data.length === 0) {
          // 如果沒有找到任何記錄，則返回錯誤消息
          return res.status(404).send("找不到此商品");
      }

      data.forEach((i)=>{
        i.sherlf_date=dayjs(i.sherlf_date).format("YYYY-MM-DD")
      })
      data.forEach((i)=>{
        i.revise_date=dayjs(i.revise_date).format("YYYY-MM-DD")
      })

      return res.json(data[0]);
      //[0]將會傳回物件 不是陣列
  } catch (err) {
      return res.json(err);
  }
});
//刪除
selleroldbookRouter.delete("/:book_id", async (req, res) => {
  const oldbookId = req.params.book_id;

  const deleteQuery = "DELETE FROM book WHERE `book_id`=?";

  try {
    const [data] = await db.query(deleteQuery, [oldbookId]);

    if (data.affectedRows === 0) {
      // 
      return res.status(404).send("找不到要刪除的商品");
    }

    return res.json("刪除成功");
  } catch (err) {
    return res.json(err);
  }
});



export default selleroldbookRouter;
