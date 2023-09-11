import express from 'express' //使用Express框架
import querystring from 'querystring'
import db from '../../modules/database.js' //取用連線
import crypto from 'crypto'

const router = express.Router()

const {
  BLUEPAY_MerchantID,
  BLUEPAY_HashKey,
  BLUEPAY_HashIV,
  BLUEPAY_NotifyURL,
  BLUEPAY_ReturnURL,
  BLUEPAY_ClientBackURL,
} = process.env

let cartid;

// 整理好藍新要的資料格式
router.post('/', async (req, res) => {
  try {
    const total = req.body.total
    const product = req.body.book

    //日期轉換
    // 獲取 JavaScript 的時間戳（毫秒數）
    const orderiii = new Date().getTime()

    // 將毫秒數轉換成秒數
    const javascriptTimestampInSeconds = Math.floor(orderiii / 1000)

    // 藍新需求資料格式一
    const string = {
      MerchantID: `${BLUEPAY_MerchantID}`,
      TimeStamp: javascriptTimestampInSeconds,
      Version: '2.0',
      RespondType: 'String',
      LangType: ' zh-tw',
      MerchantOrderNo: orderiii, //商店訂單編號
      ItemDesc: 'book',
      Amt: total, //訂單金額
      CREDIT: 1,
      TradeLimit: 60,
      NotifyURL: `${BLUEPAY_NotifyURL}`,
      ReturnURL: `${BLUEPAY_ReturnURL}`, //交易完成導向畫面
      ClientBackURL: `${BLUEPAY_ClientBackURL}`,
    }

    const data = querystring.stringify(string) //轉成querystring字串
    const aes256cbcData = encryptData(data) //aes-256-cbc加密

    // const hexString = aes256cbcData.toString('hex');
    const hashs = `HashKey=${BLUEPAY_HashKey}&${aes256cbcData}&HashIV=${BLUEPAY_HashIV}`
    const sha256Hash = stringToBite(hashs) //sha256加密

    //發請求格式
    const post = {
      MerchantID: `${BLUEPAY_MerchantID}`,
      TradeInfo: aes256cbcData,
      TradeSha: sha256Hash,
      Version: '2.0',
      EncryptType: 0,
    }

    // 幫購物車商品加入訂單碼
    const cartsql = `UPDATE cart SET paymentCode = ? WHERE cart_id = ?`
    for (let c of product) {
      const { cart_id } = c
      await db.query(cartsql, [orderiii, cart_id])
    }

    res.json({ post })
  } catch (error) {
    console.log('錯在外面', error)
  }
})

// 進入付款畫面時，建立訂單。
router.post('/list', async (req, res) => {
  try {
    const order = req.body
    const newbook = req.body.book
    // 訂單要得欄位
    let cost,
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
      vehicle;

    user = order.consignee
    phone = order.consigneePhone
    address = order.consigneeAddress
    total = order.total
    fee = order.fee
    cost = order.cost
    cid = order.id
    coupon = order.coupon
    delivery = parseInt(order.delivery)
    pay = parseInt(order.pay)
    receipt = parseInt(order.receipt)
    fee = parseInt(order.fee)
    address711 = order.address711
    vehicle = order.vehicle;
    other = order.other
    cartid = newbook[0].cart_id

    // 設定訂單要的格式
    const myorder = newbook.map((v) => ({
      cartid: v.cart_id,
      id: v.book_id,
      name: v.b_title,
      quantity: v.book_count,
      price: v.book_price,
    }))

    // 抓取訂單碼
    const cartpaycodesql = `SELECT paymentCode FROM cart WHERE cart_id = ?`
    const [[cartpaycode]] = await db.query(cartpaycodesql, [cartid])
    const paymentCode = cartpaycode.paymentCode

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

    res.json({})
  } catch (error) {
    console.log('錯在外面', error)
  }
})

// 付款完成後，確認要導去哪 (等用外網域後再開來用)
router.post('/notify', async (req, res) => {
  try {
    let paymentCode = '';
    // 接收藍新回傳資料
    const Status = req.body.Status
    // 抓取訂單碼
    const cartpaycodesql = `SELECT paymentCode FROM cart WHERE cart_id = ?`
    const [[cartpaycode]] = await db.query(cartpaycodesql, [cartid])
    if (cartpaycode) {
      paymentCode = cartpaycode.paymentCode

      if (Status == 'SUCCESS') {
        // 訂單狀態改為完成
        const ordersql = `UPDATE \`order\` SET order_status_id = ? WHERE paymentCode = ?`
        await db.query(ordersql, [2, paymentCode])
        console.log('有改訂單');

        // 刪除購物車的資料
        const cartsql = `DELETE FROM cart WHERE paymentCode = ?`
        await db.query(cartsql, [paymentCode])
        console.log('有刪購物車')

        const url = 'https://a5a0-203-64-101-140.ngrok-free.app/cart/finish'
        res.redirect(url)
      } else {
        // 訂單狀態改為取消
        const ordersql = `UPDATE \`order\` SET order_status_id = ? WHERE paymentCode = ?`
        await db.query(ordersql, [3, paymentCode])
  
        const url = 'https://a5a0-203-64-101-140.ngrok-free.app/cart/crediCard'
        res.redirect(url)
      }
    }

  } catch (error) {
    console.log('錯在外面', error)
  }
})

// 加密AES
function encryptData(data) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    `${BLUEPAY_HashKey}`,
    `${BLUEPAY_HashIV}`,
  )
  let encrypted = cipher.update(data, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

// 加密SHA
function stringToBite(str) {
  const hash = crypto.createHash('sha256').update(str).digest('hex')
  return hash.toUpperCase()
}

export default router
