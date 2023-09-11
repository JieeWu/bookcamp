// import express from "express";
// import bcrypt from "bcrypt";
// import db from "../../modules/database.js";

// const router = express.Router();

// // 處理註冊請求
// router.post("/", async (req, res) => {
//   const {
//     client_name,
//     email,
//     passwd,
//     gender,
//     birthday,
//     phone,
//     client_address,
//     avatar,
//   } = req.body;

//   // 在這裡可以加入一些表單驗證邏輯，例如確保帳號、密碼等符合要求
//   // 檢查是否已經存在相同帳號
//   const sql = "SELECT * FROM client WHERE email = ?";
//   try {
//     const [rows] = await db.query(sql, [email]);
//     if (rows.length > 0) {
//       return res.status(409).json({ error: "帳號已存在" });
//     }
//   } catch (err) {
//     console.error("ERROR:", err);
//     return res.status(500).json({ error: "伺服器錯誤" });
//   }

//   // 密碼加密
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(passwd, saltRounds);


//   // 插入資料到資料庫中
//   const insertSql =
//     "INSERT INTO client (client_name, email, passwd, gender, birthday, phone, client_address) VALUES (?, ?, ?, ?, ?, ?, ?)";
//   try {
//     await db.query(insertSql, [
//       client_name,
//       email,
//       hashedPassword,
//       gender,
//       birthday,
//       phone,
//       client_address,
//     ]);
//     return res.status(201).json({ message: "註冊成功" });
//   } catch (err) {
//     console.error("ERROR:", err);
//     return res.status(500).json({ error: "伺服器錯誤" });
//   }
// });

// export default router;
