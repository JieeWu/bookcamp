import express from "express";
import db from "../../modules/database.js";
import authenticate from "../../middlewares/jwt.js";

//建立路由器
const router = express.Router();

router.get("/:client_id", authenticate, async (req, res) => {
  try {
    const clientId = parseInt(req.params.client_id) || 0;
    //會員資料的每筆資料
    const clientData = `SELECT * FROM client WHERE client_id=?`;
    const [client] = await db.query(clientData, [clientId]);

    res.json({ client });
  } catch (err) {
    res.json(err);
  }
});

export default router;
