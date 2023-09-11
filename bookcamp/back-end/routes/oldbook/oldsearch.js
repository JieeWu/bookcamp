import express from "express";
import db from "../../modules/database.js";
import dayjs from "dayjs";

const odsearch = express.Router();

// 這個是管理書裡面的搜尋。已經不用會員了，所以權限已經被移除。
odsearch.get("/", async (req, res) => {
    try{
        const term = req.query.term;
        const [data] = await db.query(
            `SELECT * FROM book WHERE  b_title LIKE ?`,
            [`%${term}%`]
        );
        
        data.forEach((i) => {
            i.sherlf_date = dayjs(i.sherlf_date).format("YYYY-MM-DD");
        });

        data.forEach((i) => {
            i.revise_date = dayjs(i.revise_date).format("YYYY-MM-DD");
        });
        
        res.json(data);
    
    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default odsearch;
