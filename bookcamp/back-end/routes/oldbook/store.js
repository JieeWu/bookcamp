import express  from "express";
import db from "../../modules/database.js";
import dayjs from "dayjs";

//建立路由器
const storeRouter = express.Router()

//這是個賣家的商城 現在 完全沒用了 :) 全部都白寫了 ************** 
//
storeRouter.get('/:client_id',async (req, res)=>{
    try{
        const obookid = parseInt(req.params.client_id) || 0;
        //會員資料的每筆資料
        const clientAll = `SELECT * FROM client WHERE client_id=?`
        const [client] = await db.query(clientAll, [obookid])
        //二手書資料
        const oldbookAll =`SELECT * FROM old_book WHERE client_id=?`
        const [oldbook] =await db.query(oldbookAll,[obookid])
        
        client.forEach((i)=>{
            i.join_date=dayjs(i.join_date).format("YYYY-MM-DD");
        })
        
        res.json({client,oldbook,oldbookCount: oldbook.length})
        
    }catch(err){
        res.json(err)
    }
})

export default storeRouter;



