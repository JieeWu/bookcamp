# 書營-bookcamp 滑至最下頁面展示
此專案我所負責的部份為 "討論區" <br>
主要功能：基本CRUD、RWD 及透過 ngrok & socket.io 實作線上即時聊天 <br>

# 執行專案
Windows用戶：npm i <br>
Mac用戶: sudo npm i <br>
資料夾 front.end & back.end 皆要做此動作 <br>
npm run dev --啟動伺服器 <br>
# 建立.env檔
#database
DB_PORT= #資料庫port (預設為:3306 若有更改則必須填入) <br>
DB_HOST= #資料庫ip (本地為:localhost || 127.0.0.1) <br>
DB_USER= #資料庫帳號 <br>
DB_PASS= #資料庫密碼 <br>
DB_NAME= #資料庫名稱 <br>

#瀏覽器設定
WEB_PORT=3002  #此為後端的port 調整需與前端的3002一同更改 <br>

#金鑰
JWT_SECRET= #任意輸入即可 <br>
OTP_SECRET= #同上

#SMTP
SMTP_TO_EMAIL= <br>
SMTP_TO_PASSWORD=

#LINE LOGIN  
LINE_LOGIN_CHANNEL_ID= <br>
LINE_LOGIN_CHANNEL_SECRET= <br>
LINE_LOGIN_CALLBACK_URL=

#串接linepay 請查看linepay官方文件
LINEPAY_CHANNEL_ID= <br>
LINEPAY_CHANNEL_SECRET_KEY= <br>
LINEPAY_VERSION= <br>
LINEPAY_SITE=


#串接linepay 本地端參數
LINEPAY_RETURN_HOST= <br>
LINEPAY_RETURN_CONFIRM_URL= <br>
LINEPAY_RETURN_CANCEL_URL= <br>

#串接藍星 請查看newebpay官方文件
BLUEPAY_MerchantID= <br>
BLUEPAY_HashKey= <br>
BLUEPAY_HashIV= <br>
BLUEPAY_ReturnURL= <br>
BLUEPAY_NotifyURL= <br>
BLUEPAY_ClientBackURL=
# 頁面展示

1---討論區首頁
![截圖 2023-09-11 下午6 13 27](https://github.com/JieeWu/bookcamp/assets/45639267/39d527d0-ca0e-4458-ba3e-361d6e371581)
![截圖 2023-09-11 下午6 13 38](https://github.com/JieeWu/bookcamp/assets/45639267/fe749367-f15d-4030-a7dc-c6d1bc4c7c9a)

2---文章頁面
![截圖 2023-09-11 下午6 15 10](https://github.com/JieeWu/bookcamp/assets/45639267/c357cb05-c989-4b5b-b610-3dd569b338ba)
![截圖 2023-09-11 下午6 15 10](https://github.com/JieeWu/bookcamp/assets/45639267/89f918be-6365-4a63-a394-64ceb7d7846c)

3---發佈文章
<img width="1470" alt="image" src="https://github.com/JieeWu/bookcamp/assets/45639267/30dc087e-af9b-493f-8412-c6cbe6c1d6f7">
----編輯文章
<img width="1470" alt="image" src="https://github.com/JieeWu/bookcamp/assets/45639267/940aed52-d05e-41ee-a34e-19ae193aa5c1">
