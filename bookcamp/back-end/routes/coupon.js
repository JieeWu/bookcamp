import express from 'express'
const router = express.Router()
import db from '../modules/database.js'
import authenticate from '../middlewares/jwt.js'
function output(status = true, msg = '') {
  return {
    success: status,
    message: msg,
  }
}

async function createCouponRecord(client_id, coupon_id) {
  try {
    const sql =
      'INSERT INTO `coupon_record`(pickup_time, use_status_id, coupon_id, client_id) VALUES (now(),1,?,?)'
    const [datas] = await db.query(sql, [coupon_id, client_id])
    const update_sql =
      'UPDATE `coupon` SET `coupon_quantity` = CASE WHEN `coupon_quantity` IS NOT NULL THEN `coupon_quantity` - 1 ELSE `coupon_quantity` END WHERE coupon_id = ?'
    const [update_datas] = await db.query(update_sql, [coupon_id])
    let response = output(true, 'success')
    return response
  } catch (err) {
    console.log(err)
    // let response = output(false, err.message);
    // return response;
    let response = out(false, err.message)
    res.json(response)
  }
}

async function checkCouponRecord(client_id) {
  try {
    const currentTime = new Date()
    // const currentTime = "2022-08-13 00:00:00";
    const sql =
      'SELECT CR.*, C.end_time FROM `coupon_record` CR LEFT JOIN `coupon` C ON C.coupon_id = CR.coupon_id WHERE CR.client_id = ? AND CR.use_status_id = 1 AND C.end_time < ?;'
    const [datas] = await db.query(sql, [client_id, currentTime])
    if (datas.length > 0) {
      const coupon_update_list = datas.map((data) => data.coupon_record_id)
      const update_sql =
        'UPDATE `coupon_record` SET `use_status_id` = 2 WHERE coupon_record_id IN (?)'
      const [update_datas] = await db.query(update_sql, [coupon_update_list])
    }
    let response = output(true, 'success')
    return response
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    return response
  }
}

// 會員可領取的優惠券
router.post('/list', async (req, res) => {
  // {
  //     "client_id":33,
  // }
  try {
    const { client_id } = req.body
    const sql =
      "SELECT A.*, DATE_FORMAT(A.start_time, '%Y-%m-%d') start_time, DATE_FORMAT(A.end_time, '%Y-%m-%d') end_time FROM `coupon` A LEFT JOIN(SELECT *, count(*) receipt_count FROM `coupon_record` WHERE client_id = ? group by coupon_id) B ON A.coupon_id = B.coupon_id WHERE A.coupon_status = 1 AND A.coupon_type_id NOT IN (2,3,5) AND (A.coupon_per_limit IS NULL OR B.receipt_count IS NULL OR A.coupon_per_limit > B.receipt_count) AND A.coupon_id NOT IN (SELECT coupon_id FROM bookcamp.coupon_record WHERE client_id = ? AND use_status_id = 1 group by coupon_id);"
    const [datas] = await db.query(sql, [client_id, client_id])
    let response = output(true, 'success')
    response.data = datas
    res.json(response)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// 會員領取優惠券
router.post('/record/create', async (req, res) => {
  // {
  //     "client_id":3,
  //     "coupon_id":2
  // }
  try {
    const { client_id, coupon_id } = req.body
    const response = await createCouponRecord(client_id, coupon_id)
    res.json(response)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// 訂單送出後，更新優惠券紀錄
router.post('/record/update', async (req, res) => {
  // {
  //     "coupon_record_id":24,
  //     "order_id":5
  // }
  try {
    const { coupon_record_id, order_id } = req.body
    const sql =
      'UPDATE `coupon_record` SET `use_time`=now(),`use_status_id`=2,`order_id`=? WHERE coupon_record_id=?'
    const [datas] = await db.query(sql, [order_id, coupon_record_id])
    let response = output(true, 'success')
    res.json(response)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// 會員已領取的優惠券(未使用)
router.post('/received', async (req, res) => {
  // {
  //     "client_id":33
  // }
  try {
    const { client_id } = req.body
    const check_coupon_result = await checkCouponRecord(client_id)
    const sql = `
    SELECT CR.*, C.*,
      DATE_FORMAT(CR.pickup_time, '%Y-%m-%d') pickup_time,
      DATE_FORMAT(CR.use_time, '%Y-%m-%d') use_time,
      DATE_FORMAT(C.start_time, '%Y-%m-%d') start_time,
      DATE_FORMAT(C.end_time, '%Y-%m-%d') end_time,
      B.book_img_id, B.book_id, CG.b_genre_id
    FROM coupon_record CR
    LEFT JOIN coupon C ON C.coupon_id = CR.coupon_id
    LEFT JOIN coupon_genre CG ON CG.coupon_id = CR.coupon_id
    LEFT JOIN coupon_commodity CC ON CC.coupon_id = CR.coupon_id
    LEFT JOIN book B ON B.book_id = CC.book_id
    WHERE CR.client_id = ? AND CR.use_status_id = 1`
    const [datas] = await db.query(sql, [client_id])
    let response = output(true, 'success')
    response.data = datas
    res.json(response)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// 會員優惠券使用紀錄(已使用、已過期)
router.post('/history', async (req, res) => {
  // {
  //     "client_id":3
  // }
  try {
    const { client_id } = req.body
    const sql =
      "SELECT *, DATE_FORMAT(CR.pickup_time, '%Y-%m-%d') pickup_time, DATE_FORMAT(CR.use_time, '%Y-%m-%d') use_time, DATE_FORMAT(C.start_time, '%Y-%m-%d') start_time, DATE_FORMAT(C.end_time, '%Y-%m-%d') end_time, UST.status_type_name, O.*, OS.order_status_name, P.pay_name FROM `coupon_record` CR LEFT JOIN `coupon` C ON C.coupon_id = CR.coupon_id LEFT JOIN `use_status_type` UST ON UST.use_status_id = CR.use_status_id LEFT JOIN `order` O ON CR.order_id = O.order_id LEFT JOIN `order_status` OS ON O.order_status_id = OS.order_status_id LEFT JOIN `pay` P ON O.pay_id = P.pay_id WHERE CR.client_id = ? and CR.use_status_id in (2,3) order by CR.use_status_id asc"
    const [datas] = await db.query(sql, [client_id])
    let response = output(true, 'success')
    response.data = datas
    res.json(response)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// 代碼搜尋優惠券
router.post('/coupon_code/search', async (req, res) => {
  // {
  //     "coupon_code": "oneyear"
  // }
  try {
    const { coupon_code, type, client_id } = req.body
    const sql =
      type === true
        ? "SELECT A.*, DATE_FORMAT(A.start_time, '%Y-%m-%d') start_time, DATE_FORMAT(A.end_time, '%Y-%m-%d') end_time FROM `coupon` A WHERE A.coupon_code = ? AND A.coupon_status = 1 AND NOT EXISTS (SELECT 1 FROM `coupon_record` B WHERE B.coupon_id = A.coupon_id AND B.client_id = ?);"
        : "SELECT *, DATE_FORMAT(CR.pickup_time, '%Y-%m-%d') pickup_time, DATE_FORMAT(C.start_time, '%Y-%m-%d') start_time, DATE_FORMAT(C.end_time, '%Y-%m-%d') end_time FROM `coupon_record` CR LEFT JOIN `coupon` C ON C.coupon_id = CR.coupon_id WHERE CR.use_status_id = 1 and C.coupon_code = ? and CR.client_id = ?;"

    const [datas] = await db.query(sql, [coupon_code, client_id])
    let response = output(true, 'success')
    response.data = datas
    res.json(response)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// 派發註冊、生日券
router.post('/auto_distribution', async (req, res) => {
  // 註冊：
  // {
  //     "action": "register",
  //     "client_id": 33
  // }
  // 生日：
  // {
  //     "action": "birthday",
  //     "client_id": 33
  // }
  // VIP生日：
  // {
  //     "action": "vip_birthday",
  //     "client_id": 33
  // }
  try {
    const { action, client_id } = req.body
    if (action == 'register') {
      const response = await createCouponRecord(client_id, 1)
      res.json(response)
    } else if (action == 'birthday') {
      const response = await createCouponRecord(client_id, 2)
      res.json(response)
    } else if (action == 'vip_birthday') {
      const response = await createCouponRecord(client_id, 6)
      res.json(response)
    } else {
      let response = output(false, 'action error.')
      res.json(response)
    }
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

// coupon_per_limit :可領取次數
// use_type:使用類型 (平台通用:0, 指定書類:1, 指定商品:2)
// overlay:疊加使用 (不可: 0,可: 1)

// 未登入時的優惠券展示
router.post('/nologin-list', async (req, res) => {
  try {
    const sql =
      'SELECT A.coupon_name, A.discount, A.coupon_id FROM `coupon` A WHERE A.coupon_status = 1 AND A.coupon_type_id NOT IN (2, 3, 5) ORDER BY RAND() LIMIT 4;'
    const [datas] = await db.query(sql)
    let response = output(true, 'success')
    // response.data = datas
    res.json(datas)
  } catch (err) {
    console.log(err)
    let response = output(false, err.message)
    res.json(response)
  }
})

//取得首頁 好康優惠 優惠卷的資料

router.get('/frontCoupon', authenticate, async (req, res) => {
  // authenticate 主要是用來抓取cookie裡面存取的資料 及 驗證是否登入
  const cid = req.user.client_id
  const sql =
    // 'SELECT C.* FROM `coupon` C LEFT JOIN `coupon_record` CR WHERE A.coupon_status = 1 AND A.coupon_type_id NOT IN (2, 3, 5) ORDER BY RAND() LIMIT 4;'
    'SELECT C.*, CASE WHEN CR.client_id IS NOT NULL AND CR.use_status_id NOT IN (2, 3) THEN 1 ELSE 0 END AS is_owned FROM `coupon` C LEFT JOIN `coupon_record` CR ON C.coupon_id = CR.coupon_id AND CR.client_id = ? WHERE C.coupon_status = 1 AND C.coupon_type_id NOT IN (2, 3, 5) ORDER BY RAND() LIMIT 4;'
  const [data] = await db.query(sql, [cid])
  res.json(data)
  // console.log([data], 'data')
})

export default router
