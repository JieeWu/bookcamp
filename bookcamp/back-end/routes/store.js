import express  from "express";
import db from "../modules/database.js";

//建立路由器
const storeRouter = express.Router()

storeRouter.get('/:client_id',async (req, res)=>{
    try{
        const obookid = parseInt(req.params.client_id) || 0;
        //會員資料的每筆資料
        const clientAll = `SELECT * FROM client WHERE client_id=?`
        const [client] = await db.query(clientAll, [obookid])
        //二手書資料
        const oldbookAll =`SELECT * FROM old_book WHERE client_id=?`
        const [oldbook] =await db.query(oldbookAll,[obookid])
        
        res.json({client,oldbook,oldbookCount: oldbook.length})
        
    }catch(err){
        res.json(err)
    }
})

export default storeRouter;



