import express from "express"; //使用express
import db from "../../modules/database.js"; //連線資料庫
import dayjs from "dayjs"
import authenticate from "../../middlewares/jwt.js";
//建立路由器
const oldbookRouter = express.Router()

//這個是新書的資料
//讀取書資料
oldbookRouter.get('/',  async (req, res) => {
  try {
    //二手書
    const oldbookAll = 'SELECT * FROM book '
    const [oldbook] = await db.query(oldbookAll)
    //會員
    const clientAll = "SELECT * FROM  client"
    const [client] = await db.query(clientAll)
    //使用多久可以改成出版商
    const usagedurationAll ="SELECT * FROM  usage_duration"
    const [usageduration] =await db.query(usagedurationAll)
    //分類
    const bookgenreAll = "SELECT * FROM book_genre "
    const [bookgenre] = await db.query(bookgenreAll)
    //上下架
    const bookstatusAll = "SELECT * FROM book_status"
    const [bookstatus] =await db.query(bookstatusAll)
    //書的語言分類
    const booktypeAll ="SELECT * FROM book_type"
    const [booktype]  =await db.query(booktypeAll)

    
    //把時間格式給改掉
    oldbook.forEach((i)=>{
      i.sherlf_date = dayjs(i.sherlf_date).format("YYYY-MM-DD"),
      i.revise_date = dayjs(i.revise_date).format("YYYY-MM-DD")
    })
    res.json({oldbook,client,usageduration,bookgenre,bookstatus,booktype})
    //res.json()只接受一個參數 要多個需要({})
  } catch (err) {
    res.json(err)
  }
})
oldbookRouter.get("/:book_id", async (req, res) => {
  //從URL中取得old_book_id，並嘗試將它轉換成整數 parseInt是解析一個字串並返回數字
  const obookid = parseInt(req.params.book_id) || 0;
  //防止sql注入攻擊
    //從old_book表中根據old_book_id選取資料。?是佔位符，它會被[obookid]替換。
  const sql = `SELECT * FROM book WHERE book_id=?`;

  //使用參數化查詢執行SQL查詢，並等待其完成。查詢結果存放在obData中。
  const [obData] = await db.query(sql, [obookid]);

  //根據client_id從client表中選取資料。這個資料也沒用了
  const obclient = `SELECT * FROM client WHERE client_id=?`;

  //作為參數執行上面定義的SQL查詢，查詢結果存放在obseller中 找出對應的會員資料
  const [obseller] = await db.query(obclient, [obData[0].client_id]);

  //查詢使用語言的資料 
  const usage = `SELECT * FROM book_language  WHERE b_language_id=? `

  //存放在usagename中  找出對應的使用多久
  const[usagename] = await db.query(usage,[obData[0].b_language_id])

  //查詢分類的資料
  const genre = `SELECT * FROM book_genre WHERE b_genre_id=?`

  //存放在[obgenre]中 找出對應的分類
  const [obgenre] = await db.query(genre,[obData[0].b_genre_id])

  //找是二手書還是新書
  const typeAll = `SELECT * FROM book_type WHERE b_type_id=?`
  //存放資料
  const [booktype] = await db.query(typeAll,[obData[0].b_type_id])
  res.json({obData, obseller,usagename,obgenre,booktype});

});



export default oldbookRouter;
