import express  from "express";
import db from "../../modules/database.js";
import dayjs from "dayjs";




//這個是賣家的商場 不過已經沒有用了:)
//建立路由器
const oldmanageRouter = express.Router()

oldmanageRouter.get('/my-store',async (req, res)=>{
 
    try{
        //二手書資料
        const oldbookAll = 'SELECT * FROM book '
    const [oldbook] = await db.query(oldbookAll)
        //上下架
        const bookstatusAll = "SELECT * FROM book_status"
        const [bookstatus] =await db.query(bookstatusAll)
        
       
        oldbook.forEach((i)=>{
            i.sherlf_date=dayjs(i.sherlf_date).format("YYYY-MM-DD");
        })

        
        res.json({oldbook,bookstatus})
        
    }catch(err){
        res.json(err)
    }
})

export default oldmanageRouter;
