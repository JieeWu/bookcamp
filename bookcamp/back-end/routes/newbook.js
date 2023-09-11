import express from "express"; //使用Express框架
import db from "../modules/database.js"; //取用連線

const newbookRouter = express.Router() //初始化路由器


newbookRouter.get('/',async (req, res)=>{  //接受路由
  try{
     //查詢新書的所有資料,並將結果放進newbook李
      const newbookAll = `SELECT * FROM book `
      const [newbooks] = await db.query(newbookAll)

      
      res.json({newbooks,})
      
  }catch(error){ //錯誤顯示
      res.json(error)
  }
})


export default newbookRouter;
