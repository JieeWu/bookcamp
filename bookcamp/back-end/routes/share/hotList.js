import express from "express"; //使用Express框架
import db from "../../modules/database.js"; //取用連線

const router = express.Router();

// 活動商品區 Read
router.get("/", async (req, res) => {
    try {
        const hotsql = `SELECT b.book_id, b.b_title, b.book_price,b.book_img_id,b.blurb, COUNT(*) AS total_count FROM order_detail od
        JOIN book b ON od.book_id = b.book_id
        GROUP BY od.book_id
        ORDER BY total_count DESC
        LIMIT 10`;
        const [hot] = await db.query(hotsql);
        res.json({hot});
    } catch (error) {
        res.status(404);
    }
});



export default router;
