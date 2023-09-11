import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, //不讓他加入太多連線數
  //主要是針對每個對資料庫的動作的限制上限
  queueLimit: 0, // 限制排隊的數量
});

export default db.promise(); //匯出
