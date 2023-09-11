/* 引入「可配置.env檔案」啟動 */
import 'dotenv/config.js'

/* 引入插件 */
import express from 'express' //使用express框架
import cors from 'cors' //跨領域
import path from 'path' //修正 __dirname for esm
import cookieParser from 'cookie-parser' //解析cookie
import authenticate from './middlewares/jwt.js'
import upload from './modules/upload-img.js'
import { Server } from 'socket.io'
import http from 'http'
import session from 'express-session' // line login need
import sessionFileStore from 'session-file-store' // 使用檔案的session store，存在sessions資料夾
import fs from 'fs'
// 修正 __dirname for esm
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.WEB_PORT || 3002
const FileStore = sessionFileStore(session)
// 讓console.log可以呈現檔案與行號
import { extendLog } from './utils/tool.js'
extendLog() // 執行全域套用

import 'colors' // 讓console.log可以呈現顏色

/* 主要 */
const app = express()
const httpServer = http.createServer(app) // 使用你的 express 应用实例 'app'
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://newbookcamp.ngrok.app/',
    ], // 允许来自这个域的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
  },
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('message', (data) => {
    console.log(
      'Received message:',
      data.userId,
      ':',
      data.message,
      ':',
      data.avatar,
    )
    io.emit('message', data) // 广播消息给所有连接的客户端
  })
  socket.on('sendImage', (imageData) => {
    try {
      // 直接將圖片數據發送到前端
      io.emit('receiveImage', imageData);
    } catch (error) {
      console.error('Error sending image:', error);
    }
  });

  socket.on('chat', (message) => {
    io.emit('message', message)
  })
})
/* 跨領域 */
const corsOptions = {
  credentials: true,
  origin: function (origin, cb) {
    // console.log({ origin });
    cb(null, true)
  },
}
app.use(cors(corsOptions))

// fileStore的選項
const fileStoreOptions = {}
// Line Login need
app.use(
  session({
    store: new FileStore(fileStoreOptions), // 使用檔案記錄session
    name: 'SESSION_ID', // cookie名稱，儲存在瀏覽器裡
    secret: '67f71af4602195de2450faeb6f8856c0', // 安全字串，應用一個高安全字串
    cookie: {
      maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session保存30天
      // httpOnly: false,
      // sameSite: 'none',
    },
    resave: false,
    saveUninitialized: false,
  }),
)

/* 首頁 */
import activityRouter from './routes/share/activity.js' //活動專區
import hotListRouter from './routes/share/hotList.js' //熱銷榜
import ENRouter from './routes/share/ENlanguage.js' //英文書
import TWRouter from './routes/share/TWlanguage.js' //中文書

/* 購物車引入檔 */
import orderRouter from './routes/order.js'
import cartRouter from './routes/cart.js'
import payRouter from './routes/pay/linepay.js'
import blueRouter from './routes/pay/BluePay.js'
import bankRouter from './routes/pay/bankAnd711.js'
import addCartRouter from './routes/share/addcart.js'
import userOrderRouter from './routes/member/user-order.js'
import deliveryRouter from './routes/cart/delivery.js'

/* 其他人引入檔 */
import couponRouter from './routes/coupon.js'
import advertiseRouter from './routes/advertise.js'
import forumRouter from './routes/forum/forum.js'
import oldbookRouter from './routes/oldbook/oldbook.js'
import storeRouter from './routes/oldbook/store.js'
import selleroldbookRouter from './routes/oldbook/selleroldbook.js'
import oldbookimg from './routes/oldbook/oldbookimg.js'
import obgenerRouter from './routes/oldbook/obgenre.js'
import odsearchRouter from './routes/oldbook/oldsearch.js'
import hotodsearchRouter from './routes/oldbook/hotoldsearch.js'
import searchcollectRouter from './routes/oldbook/searchcollect.js'
import collectRouter from './routes/oldbook/oldcollect.js'
import bookperpageRouter from './routes/oldbook/bookperpage.js'
import bookpushRouter from './routes/oldbook/bookpush.js'
import bookpriceRouter from './routes/oldbook/bookprice.js'
import bookcommentRouter from './routes/oldbook/bookComment.js'
import activity1Router from './routes/share/activity1.js'

/* 會員引入檔 */
import usersRouter from './routes/member/users.js'
import authJwtRouter from './routes/member/auth-jwt.js'
import googleLoginRouter from './routes/member/google-login.js'
import emailRouter from './routes/member/email.js'
import resetPasswordRouter from './routes/member/reset-password.js'
import loadAvatarRouter from './routes/member/avatar.js'
import signRouter from './routes/member/sign.js'
import oldmanageRouter from './routes/oldbook/oldmanage.js'
import lineLogin from './routes/member/line-login.js'

/* middleware */
app.use(express.urlencoded({ extended: false })) //解析URL
app.use(express.json()) //解析JSON
app.use(cookieParser()) //解析cookie

/* ------------------------------------------ */

//首頁
// app.get("/", (req, res) => {
//   res.locals.title = "HOME - " + res.locals.title;
//   res.render("home");
// });

// Use是接受所有http的方法

// home 首頁
app.use('/share/activity', activityRouter)
app.use('/share/hotList', hotListRouter)
app.use('/share/TWlanguage', TWRouter)
app.use('/share/ENlanguage', ENRouter)

// client api 會員
app.use('/member/users', usersRouter) // 會員CRUD部分
app.use('/member/auth-jwt', authJwtRouter) // 登入登出的驗證
app.use('/member/google-login', googleLoginRouter) // google登入
app.use('/member/email', emailRouter) // 寄送驗證信otp
app.use('/member/reset-password', resetPasswordRouter) // 重設密碼
app.use('/member/avatar', loadAvatarRouter)
app.use('/member/sign', signRouter) // 每日簽到
app.use('/member/line-login', lineLogin) // line登入

// cart api 購物車
app.use('/order', orderRouter) //後台訂單
app.use('/cart', cartRouter)
app.use('/pay/linepay', payRouter)
app.use('/pay/bankAnd711', bankRouter)
app.use('/pay/bluepay', blueRouter)
app.use('/share/addcart', addCartRouter)
app.use('/member/user-order', userOrderRouter)
app.use('/oldbook/bookComment', bookcommentRouter)
app.use('/delivery', deliveryRouter)

// oldbook seller api 二手書 賣家
app.use('/oldbook', oldbookRouter)
app.use('/store', storeRouter)
app.use('/selleroldbook', selleroldbookRouter)
app.use('/oldbookupload', oldbookimg)
app.use('/obgenre', obgenerRouter)
app.use('/oldmanageRouter', oldmanageRouter)
app.use('/search', odsearchRouter)
app.use('/hotsearch', hotodsearchRouter)
app.use('/searchcollect', searchcollectRouter)
app.use('/collect', collectRouter)
app.use('/perpage', bookperpageRouter)
app.use('/bookpush', bookpushRouter)
app.use('/price', bookpriceRouter)
app.use('/bookdate', activity1Router)

app.use('/public', express.static('public')) //可以讀後端圖片

// coupon api 優惠卷
app.use('/coupon', couponRouter)
// 廣告  advertise api
app.use('/advertise', advertiseRouter)
// forum api 留言板
app.use('/forum', forumRouter)

// 靜態資料夾
app.use(express.static('public')) //為了丟圖片
app.use('/public', express.static('public')) //可以讀後端圖片

/* ------------------------------------------ */

/* 網頁狀態顯示 */
app.use((req, res) => {
  res.type('text/html').status(404).send(`<h1>404-無法顯示網頁</h1>`)
})
app.get('/', (req, res) => {
  res.json(111)
})

/* 伺服器登入 */
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`express server 啟動 ${port}`.bgMagenta)
})
