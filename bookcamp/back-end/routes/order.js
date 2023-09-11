import express from "express"; //使用Express框架
import db from "../modules/database.js"; //取用連線
import dayjs from "dayjs"; //取用日期


const router = express.Router();

// order 訂單資料讀取 Read
router.get("/", async (req, res) => {
  //宣告所有order需要用的變數
  let bookorder,  bookpay, bookreceipt, bookdelivery, bookorderstatus, bookcoupon, bookclient;


  /* -----------------------------搜尋----------------------- */
  let search = req.query.search || '';

  let whereField = 'WHERE 1';  //全選的意思
  if (typeof (search) === 'object') {
    whereField += ` AND (\`total\` BETWEEN ${search[0]} AND ${search[1]}) ORDER BY \`total\` DESC`
  } else {
    whereField += ` AND (order_create_date LIKE '%${search}%')
      OR EXISTS
      (SELECT * FROM pay WHERE pay_name LIKE '%${search}%' AND pay_id = \`order\`.pay_id)
      OR EXISTS
      (SELECT * FROM delivery WHERE delivery_name LIKE '%${search}%' AND delivery_id = \`order\`.delivery_id)
      OR EXISTS
      (SELECT * FROM receipt WHERE receipt_name LIKE '%${search}%' AND receipt_id = \`order\`.receipt_id)
      OR EXISTS
      (SELECT * FROM order_status WHERE order_status_name LIKE '%${search}%' AND order_status_id = \`order\`.order_status_id)
      ORDER BY order_id DESC`;
  }


  /* -----------------------------分頁----------------------- */
  let pageOrder = {
    redirect: '',  //指向的網頁
    totalRows: 0, //總共幾筆資料
    perPage: 10, //每頁顯示的行數
    totalPage: 0, //總共的頁數
    page: 1, //目前所在的頁數
    newOrder: [],  //要塞那些資料 這是我的order資料表
  }

  //宣告所有page需要的變數
  let totalPage = 0;
  let page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = 10;
  const total_sql = `SELECT COUNT(1) totalRows FROM  \`order\` ${whereField} `;
  const [[{ totalRows }]] = await db.query(total_sql); //如果不解構多層,會又印出一個陣列
  if (totalRows) {
    totalPage = Math.ceil(totalRows / perPage);
    if (page > totalPage) {
      pageOrder.redirect = req.baseUrl + '?page=' + totalPage; //假如頁數大於總頁數只顯示總頁數數
      return res.json(pageOrder);
    }
  }


  /* -----------------------------訂單----------------------- */
  const ordersql = `SELECT * FROM  \`order\` ${whereField} LIMIT ${perPage * (page - 1)}, ${perPage}`;
  [bookorder] = await db.query(ordersql);

  // 在這裡加入我想要的新欄位
  let newOrder = bookorder.map((v) => {
    return {
      ...v,
      checkThisBox: false,
    }
  })

  // 訂單創建日期改格式
  newOrder.forEach((i) => {
    i.order_create_date = dayjs(i.order_create_date).format("YYYY-MM-DD");
  });




  pageOrder = { ...pageOrder, newOrder, totalRows, perPage, totalPage, page, search }  //把設定好的欄位加入分頁

  /* -----------------其他取資料------------------ */

  // 付款
  const paysql = `SELECT * FROM pay`;
  [bookpay] = await db.query(paysql);
  // 發票
  const receiptsql = `SELECT * FROM receipt`;
  [bookreceipt] = await db.query(receiptsql);
  // 運送
  const deliverysql = `SELECT * FROM delivery`;
  [bookdelivery] = await db.query(deliverysql);
  // 狀態
  const statussql = `SELECT * FROM order_status`;
  [bookorderstatus] = await db.query(statussql);
  // 優惠卷
  const couponsql = `SELECT * FROM coupon`;
  [bookcoupon] = await db.query(couponsql);
  // 會員
  const clientsql = `SELECT * FROM client`;
  [bookclient] = await db.query(clientsql);



  res.json({ pageOrder, bookpay, bookreceipt, bookdelivery, bookorderstatus, bookcoupon, bookclient });
});

// order 訂單狀態編輯 Update
router.put("/", async (req, res) => {
  let newState = req.body;
  const list = newState.filter((data) => {
    if (data.checkThisBox == true) {
      return data
    }
  })

  for (let i = 0; i < list.length; i++) {
    let oid = list[i].order_id
    let sid = list[i].order_status_id

    const ordersql = `UPDATE \`order\` SET order_status_id = ${sid} WHERE order_id = ${oid}`;
    await db.query(ordersql);
  }
  res.status(200).json({ newState });
});

// orderdetail 訂單明細讀取 Read
router.get("/:order_id", async (req, res) => {
  const oid = parseInt(req.params.order_id) || 0;
  let bookorder,  bookpay, bookreceipt, bookdelivery, bookorderstatus, bookcoupon, bookclient;

  const sql = `SELECT * FROM order_detail WHERE order_id=${oid}`;
  const [orderdetail] = await db.query(sql);



  /* -------- 抓取各需要的資料表 ------- */
  // 明細
  const ordersql = `SELECT * FROM \`order\` WHERE order_id=${oid}`;
  [bookorder] = await db.query(ordersql);
  // 付款
  const paysql = `SELECT * FROM pay`;
  [bookpay] = await db.query(paysql);
  // 發票
  const receiptsql = `SELECT * FROM receipt`;
  [bookreceipt] = await db.query(receiptsql);
  // 運送
  const deliverysql = `SELECT * FROM delivery`;
  [bookdelivery] = await db.query(deliverysql);
  // 狀態
  const statussql = `SELECT * FROM order_status`;
  [bookorderstatus] = await db.query(statussql);
  // 優惠卷
  const couponsql = `SELECT * FROM coupon`;
  [bookcoupon] = await db.query(couponsql);
  // 會員
  const clientsql = `SELECT * FROM client`;
  [bookclient] = await db.query(clientsql);
  // 產品
  const booksql = `SELECT b.book_id, b.b_title, img.book_img_url
  FROM book b
  JOIN order_detail o ON b.book_id = o.book_id
  JOIN (
      SELECT book_img_id, MIN(book_img_url) as book_img_url
      FROM book_img
      GROUP BY book_img_id
  ) img ON b.book_img_id = img.book_img_id
  WHERE o.order_id =${oid}`;
  const [book] = await db.query(booksql);

  // 訂單創建日期改格式
  bookorder.forEach((i) => {
    i.order_create_date = dayjs(i.order_create_date).format("YYYY-MM-DD");
  });

  res.json({ orderdetail, book, bookorder, bookpay, bookreceipt, bookdelivery, bookorderstatus, bookcoupon, bookclient })
})



export default router;
