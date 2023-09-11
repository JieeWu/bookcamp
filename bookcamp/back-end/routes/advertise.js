import express from "express";
const router = express.Router();
import db from "../modules/database.js";

function output(status = true, msg = "") {
  return {
    success: status,
    message: msg,
  };
}

// 賣家當前廣告
router.post("/ad_list", async (req, res) => {
  // {
  //   const client_id = 33;
  // }
  const { client_id } = req.body;
  // console.log(req.body);

  try {
    const sql =
      "SELECT a.*, ai.ad_img_url, DATE_FORMAT(a.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(a.endTime, '%Y-%m-%d') AS endTime FROM `advertise` AS a JOIN `advertise_img` AS ai ON a.ad_title = ai.ad_title WHERE a.client_id = ? AND ai.ad_img_url LIKE '%800x300%' AND a.endTime >= CURDATE()";
    const [datas] = await db.query(sql, [client_id]);

    let response = output(true, "success");
    console.log([datas]);

    response.data = datas;
    res.json(response);
  } catch (err) {
    console.log(err);
    let response = output(false, err.message);
    res.json(response);
  }
});

// 廣告切換狀態回傳資料庫
router.post("/status_change", async (req, res) => {
  // {
  //     client_id: 33,
  //     ad_status: 1 or 0,
  //     ad_id: 4
  // }
  try {
    const { client_id, ad_status, ad_id } = req.body;
    const sql =
      "UPDATE `advertise` SET `ad_status`=? WHERE client_id=? and ad_id=?";
    const [datas] = await db.query(sql, [ad_status, client_id, ad_id]);
    let response = output(true, "success");
    res.json(response);
  } catch (err) {
    console.log(err);
    let response = output(false, err.message);
    res.json(response);
  }
});

// 賣家廣告紀錄
router.post("/ad_record", async (req, res) => {
  // {
  //     "client_id":33;
  // }
  const { client_id } = req.body;
  console.log(req.body);
  try {
    const sql =
      "SELECT a.*, ai.ad_img_url, DATE_FORMAT(a.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(a.endTime, '%Y-%m-%d') AS endTime FROM `advertise` AS a JOIN `advertise_img` AS ai ON a.ad_title = ai.ad_title WHERE a.client_id = ? AND a.expired_status = 0 AND ai.ad_img_url LIKE '%800x300%' ORDER BY a.startTime ASC";
    const [datas] = await db.query(sql, [client_id]);
    // console.log([datas]);
    let response = output(true, "success");
    response.data = datas;
    res.json(response);
  } catch (err) {
    console.log(err);
    let response = output(false, err.message);
    res.json(response);
  }
});

// 刊登廣告 (圖片要存到指定資料表)
// router.post("/record/update", async (req, res) => {
// {
//     "coupon_record_id":24,
//     "order_id":5
// }
//   try {
//     const { coupon_record_id, order_id } = req.body;
//     const sql =
//       "UPDATE `coupon_record` SET `use_time`=now(),`use_status_id`=2,`order_id`=? WHERE coupon_record_id=?";
//     const [datas] = await db.query(sql, [order_id, coupon_record_id]);
//     let response = output(true, "success");
//     res.json(response);
//   } catch (err) {
//     console.log(err);
//     let response = output(false, err.message);
//     res.json(response);
//   }
// });

// 傳出指定尺寸(以名稱 px*px 為基準)廣告
router.get("/ad_size", async (req, res) => {
  try {

    // 隨機抓一本書
    const booksql = `SELECT book_id FROM book
ORDER BY RAND()
LIMIT 1;`
    const [[book]] = await db.query(booksql);

    // 隨機抓價格最低的五本書之一
    const lowpricesql = `SELECT book_id
    FROM (
        SELECT book_id
        FROM book
        ORDER BY book_price ASC
        LIMIT 5
    ) AS lowest_priced_books
    ORDER BY RAND()
    LIMIT 1;`
    const [[lowprice]] = await db.query(lowpricesql);




    // 輪播廣告
    const sql = `
      SELECT A.ad_id, A.book_id, A.client_id, AI.ad_img_url, B.b_genre_id, A.ad_class
      FROM \`advertise\` AS A
      LEFT JOIN \`advertise_img\` AS AI ON A.ad_title = AI.ad_title
      LEFT JOIN \`book\` AS B ON A.book_id = B.book_id
      WHERE A.ad_status = 1`;
    const [datas] = await db.query(sql);
    const processedData = [];
    const idMap = new Map();

    datas.forEach((item) => {
      const { ad_id, book_id, ad_img_url } = item;

      if (!idMap.has(book_id)) {
        idMap.set(book_id, processedData.length);
        processedData.push({
          ad_id: ad_id, // 將 ad_id 放入處理過的資料
          book_id: book_id,
          client_id: item.client_id,
          b_genre_id: item.b_genre_id,
          ad_class: item.ad_class,
          ad_img_urls: [ad_img_url],
        });
      } else {
        const index = idMap.get(book_id);
        processedData[index].ad_img_urls.push(ad_img_url);
      }
    });
    let response = output(true, "success");
    const adData = { ...response, data: processedData }
    res.json({ adData, book,lowprice });
  } catch (err) {
    console.log(err);
    let response = output(false, err.message);
    res.json(response);
  }
});

export default router;
