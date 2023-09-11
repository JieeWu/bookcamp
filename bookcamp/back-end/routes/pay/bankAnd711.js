import express from "express"; //使用Express框架
import db from "../../modules/database.js"; //取用連線


const router = express.Router();


router.post("/bank", async (req, res) => {
    try {
        // 接收前端資料
        const order = req.body;
        const book = req.body.book;

        // 訂單要得欄位
        let cost, user, phone, address, total, cid, coupon, delivery, pay, receipt, fee, other, address711,vehicle;
        user = order.consignee;
        phone = order.consigneePhone;
        address = order.consigneeAddress;
        total = order.total;
        fee = order.fee;
        cost = order.cost;
        cid = order.id;
        coupon = order.coupon;
        delivery = parseInt(order.delivery);
        pay = parseInt(order.pay);
        receipt = parseInt(order.receipt);
        fee = parseInt(order.fee);
        address711 = order.address711;
        vehicle = order.vehicle;
        other = order.other;

        // 設定訂單要的格式
        const myorder = book.map((v) => (
            {
                cartid: v.cart_id,
                id: v.book_id,
                name: v.b_title,
                quantity: v.book_count,
                price: v.book_price,
            }
        ))


        // 新增訂單
        const ordersql = `INSERT INTO \`order\` (consignee,consignee_phone,consignee_address,total,client_id,coupon_id,delivery_id,pay_id,receipt_id,delivery_fee,delivery_address,receipt_vehicle,other) VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const test = await db.query(ordersql, [user, phone, address, total, cid, coupon, delivery, pay, receipt, fee, address711,vehicle, other]);

        console.log(test);
        // 新增明細
        const sql = `SELECT order_id FROM \`order\` ORDER BY order_id DESC LIMIT 1`;
        let [orderIDLast] = await db.query(sql);
        const detailsql = `INSERT INTO order_detail 
           (book_count,book_price,book_id,order_id) VALUES
           (?,?,?,?)`;
        for (let p of myorder) {
            const oid = orderIDLast[0].order_id;
            const { id, quantity, price } = p;
            await db.query(detailsql, [quantity, price, id, oid]);
        }
        // 刪除購物車的資料
        const cartsql = `DELETE FROM cart WHERE cart_id = ?`;
        for (let c of myorder) {
            const { cartid } = c;
            await db.query(cartsql, [cartid]);
        }
        const url = 'http://localhost:3000/cart/finish';
        res.json(url);

    } catch (error) {
        console.log(error);
    }
})


router.post("/seven711", async (req, res) => {
    try {
        // 接收前端資料
        const order = req.body;
        const book = req.body.book;

        // 訂單要得欄位
        let cost, user, phone, address, total, cid, coupon, delivery, pay, receipt, fee, address711, vehicle,other;
        user = order.consignee;
        phone = order.consigneePhone;
        address = order.consigneeAddress;
        total = order.total;
        fee = order.fee;
        cost = order.cost;
        cid = order.id;
        coupon = order.coupon;
        delivery = parseInt(order.delivery);
        pay = parseInt(order.pay);
        receipt = parseInt(order.receipt);
        fee = parseInt(order.fee);
        address711 = order.address711;
        vehicle = order.vehicle;
        other = order.other;

        // 設定訂單要的格式
        const myorder = book.map((v) => (
            {
                cartid: v.cart_id,
                id: v.book_id,
                name: v.b_title,
                quantity: v.book_count,
                price: v.book_price,
            }
        ))


        // 新增訂單
        const ordersql = `INSERT INTO \`order\` (consignee,consignee_phone,consignee_address,total,client_id,coupon_id,delivery_id,pay_id,receipt_id,delivery_fee,delivery_address,receipt_vehicle,other) VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const test = await db.query(ordersql, [user, phone, address, total, cid, coupon, delivery, pay, receipt, fee, address711,vehicle, other]);
        // 新增明細
        const sql = `SELECT order_id FROM \`order\` ORDER BY order_id DESC LIMIT 1`;
        let [orderIDLast] = await db.query(sql);
        const detailsql = `INSERT INTO order_detail 
    (book_count,book_price,book_id,order_id) VALUES
    (?,?,?,?)`;
        for (let p of myorder) {
            const oid = orderIDLast[0].order_id;
            const { id, quantity, price } = p;
            await db.query(detailsql, [quantity, price, id, oid]);
        }

        // 刪除購物車的資料
        const cartsql = `DELETE FROM cart WHERE cart_id = ?`;
        for (let c of myorder) {
            const { cartid } = c;
            await db.query(cartsql, [cartid]);
        }
        const url = 'http://localhost:3000/cart/finish';
        res.json(url);

    } catch (error) {
        console.log(error);
    }
})

export default router;