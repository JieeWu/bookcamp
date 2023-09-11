import express from 'express'
import db from '../../modules/database.js'

const router = express.Router()

//亂抓5本
router.get("/", async (req, res)=>{
    try {
        const book = 'SELECT * FROM book ORDER BY RAND() LIMIT 5';
        const [bookAll] = await db.query(book)
        res.json(bookAll)
    }catch(err){
console.log(err);
    }

})

export default router;