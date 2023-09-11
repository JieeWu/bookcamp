import express from 'express' //使用Express框架
import db from '../../modules/database.js' //取用連線
import hmacSHA256 from 'crypto-js/hmac-sha256.js' //linepay加密
import Base64 from 'crypto-js/enc-base64.js' //linepay加密
import axios from 'axios'
import { v4 } from 'uuid'

const router = express.Router()

const {
  LINEPAY_CHANNEL_ID,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_VERSION,
  LINEPAY_SITE,
  LINEPAY_RETURN_HOST,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
} = process.env

/* ---------------- linepay ---------------- */

// 伺服器對LINEPAY伺服器-請求連結linpay付款頁面。
router.post('/', async (req, res) => {
  try {
    // 接收前端資料
    const order = req.body
    const newbook = req.body.book

    // 訂單要得欄位
    let point,
      user,
      phone,
      address,
      total,
      cid,
      coupon,
      delivery,
      pay,
      receipt,
      fee,
      amount,
      other,
      address711,
      vehicle

    user = order.consignee
    phone = order.consigneePhone
    address = order.consigneeAddress
    total = order.total
    point = order.usePoint
    cid = order.id
    coupon = order.coupon
    delivery = parseInt(order.delivery)
    pay = parseInt(order.pay)
    receipt = parseInt(order.receipt)
    fee = parseInt(order.fee)
    vehicle = order.vehicle
    other = order.other
    address711 = order.address711

    // 訂單要得欄位

    // 我的訂單要的
    let myorder = newbook.map((v) => ({
      cartid: v.cart_id,
      id: v.book_id,
      name: v.b_title,
      quantity: v.book_count,
      price: v.book_price,
    }))

    console.log('產品資訊',myorder);

    // 先確認優惠卷
    if (coupon != null) {
      const discountsql = `SELECT discount From coupon WHERE coupon_id = ?`
      const [[{ discount }]] = await db.query(discountsql, [coupon])
      parseFloat(discount)

      //看是哪個折扣
      if (discount > 1) {
        newbook.push({
          b_title: '折扣',
          book_count: 1,
          book_price: -discount,
        })
      } else if (discount < 1) {
        newbook.forEach((v) => {
          v.book_price = Math.floor(v.book_price * discount)
        })
      }
    }
    // 把點數加入
    if (point != 0) {
      newbook.push({
        b_title: '點數',
        book_count: 1,
        book_price: -point,
      })
    }
    // 把運費加入
    if (fee != 0) {
      newbook.push({
        b_title: '運費',
        book_count: 1,
        book_price: fee,
      })
    }
    // 重算小計
    amount = newbook.reduce((acc, v) => {
      return acc + v.book_count * v.book_price
    }, 0)


    // 設定linepay要的格式
    let products = newbook.map((v) => ({
      name: v.b_title,
      quantity: v.book_count,
      price: v.book_price,
    }))
    console.log('產品',products);

    // 資料
    const sendOrder = {
      amount: total,
      currency: 'TWD',
      orderId: v4(),
      packages: [
        {
          id: order.id.toString(),
          amount: amount,
          name: '書營',
          products: products,
        },
      ],
      redirectUrls: {
        confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
        cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
      },
    }

    // 設定linepay要的格式

    //發送請求的網址
    const uri = '/payments/request'
    const headers = newSignature(uri, sendOrder)
    // 主要要給linepay接收的{ 資料 和 簽章號 }
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`

    const linePayRes = await axios.post(url, sendOrder, { headers })

    console.log('有跑這嗎', linePayRes.data)

    // 如果請求成功，將會員導向此頁面
    if (linePayRes?.data?.returnCode === '0000') {
      let paymentCode = sendOrder.orderId

      // 更新購物車加入訂單碼
      const cartsql = `UPDATE cart SET paymentCode = ? WHERE cart_id = ?`
      for (let c of myorder) {
        const { cartid } = c
        await db.query(cartsql, [paymentCode, cartid])
      }

      //發送請求的網址
      const uri = '/payments/request'
      const headers = newSignature(uri, sendOrder)
      // 主要要給linepay接收的{ 資料 和 簽章號 }
      const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`
      const linePayRes = await axios.post(url, sendOrder, { headers })

      // 如果請求成功，將會員導向此頁面
      if (linePayRes?.data?.returnCode === '0000') {
      // 新增訂單
      const ordersql = `INSERT INTO \`order\` (consignee,consignee_phone,consignee_address,total,client_id,coupon_id,delivery_id,pay_id,receipt_id,delivery_fee,other,delivery_address,receipt_vehicle,paymentCode) VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      const test = await db.query(ordersql, [
        user,
        phone,
        address,
        total,
        cid,
        coupon,
        delivery,
        pay,
        receipt,
        fee,
        other,
        address711,
        vehicle,
        paymentCode,
      ])
        // 新增明細
        const sql = `SELECT order_id FROM \`order\` ORDER BY order_id DESC LIMIT 1`
        let [orderIDLast] = await db.query(sql)
        const detailsql = `INSERT INTO order_detail 
        (book_count,book_price,book_id,order_id) VALUES
        (?,?,?,?)`
        for (let p of myorder) {
          const oid = orderIDLast[0].order_id
          const { id, quantity, price } = p
          await db.query(detailsql, [quantity, price, id, oid])
        }

        const html = linePayRes?.data?.info.paymentUrl.web
        res.json(html)
      } else {
        console.log('壞掉拉')
        res.status(400).send({ message: '訂單不存在' })
      }
    }
  } catch (error) {
    console.log(error)
  }
})

// Confirm API 用戶確認付款後，對linepay請款動作。
router.get('/confirm', async (req, res) => {
  try {
    // paymentcode
    const orderId = req.query.orderId
    const transactionId = req.query.transactionId
    const totalsql = `SELECT \`total\` FROM \`order\` WHERE paymentCode = ?`
    const [total] = await db.query(totalsql, [orderId])
    const amount = total[0].total
    // linePay格式
    const uri = `/payments/${transactionId}/confirm`
    const resOrder = {
      amount: amount,
      currency: 'TWD',
    }
    const headers = newSignature(uri, resOrder)
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`
    await axios.post(url, resOrder, { headers })

    // 刪除購物車的資料
    const cartsql = `DELETE FROM cart WHERE paymentCode = ?`
    await db.query(cartsql, [orderId])

    // 訂單狀態改為完成
    const ordersql = `UPDATE \`order\` SET order_status_id = ? WHERE paymentCode = ?`
    await db.query(ordersql, [2, orderId])

    res.redirect('http://localhost:3000/cart/finish')
  } catch (error) {
    console.log(error)
  }
})

// Cancel API 未完成後導向。
router.get('/cancel', async (req, res) => {
  try {
    const orderId = req.query.orderId
    // 訂單狀態改為完成
    const ordersql = `UPDATE \`order\` SET order_status_id = ? WHERE paymentCode = ?`
    await db.query(ordersql, [3, orderId])

    res.redirect('http://localhost:3000/cart/cancel')
  } catch (error) {
    console.log(error)
  }
})

//linepay使用的簽章 (重複運用)
function newSignature(uri, sendOrder) {
  //訂單號
  const nonce = v4()
  //LINEPAY要求的格式
  const mykey = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
    sendOrder,
  )}${nonce}`
  // 簽章號
  const newkey = hmacSHA256(mykey, `${LINEPAY_CHANNEL_SECRET_KEY}`)
  const signature = Base64.stringify(newkey)
  // 需求的headers
  const headers = {
    'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
    'Content-Type': 'application/json',
    'X-LINE-Authorization-Nonce': nonce,
    'X-LINE-Authorization': signature,
  }
  return headers
}

export default router
