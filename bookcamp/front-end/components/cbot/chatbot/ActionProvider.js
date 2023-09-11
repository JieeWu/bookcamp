import Link from "next/link";
import styles from './bot.module.css';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc,createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  
  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "噢，看來我的電路有點混亂了。你能否用更清晰的方式再說一遍或輸入一遍呢？畢竟我在這裡就是為了幫助你！",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options
      }
    );

    this.updateChatbotState(message);
  };

  
  greet() {
    const greetingMessage = this.createChatBotMessage("你好")
    this.updateChatbotState(greetingMessage)
  }
  //運費
  shippingCost() {
    const shippingMessage = this.createChatBotMessage("我們書營運費是60元")
    this.updateChatbotState(shippingMessage);
}
//退貨
b() {
  const bMessage = this.createChatBotMessage("您想要退貨，請提供聯繫電話客服人員。")
  this.updateChatbotState(bMessage)
}
//運送時間
c() {
  const cMessage = this.createChatBotMessage("一般的運送時間為3-5個工作天。")
  this.updateChatbotState(cMessage)
}
//售後服務
e() {
  const eMessage = this.createChatBotMessage("如果您有任何產品問題，請聯繫我們的客服。")
  this.updateChatbotState(eMessage)
}
//付款方式
f() {
  const fMessage = this.createChatBotMessage("我們接受信用卡、轉帳和Linepay付款。")
  this.updateChatbotState(fMessage)
}

g() {
  const gMessage = this.createChatBotMessage(
    <>
      <img src="http://localhost:3002/public/img/10.jpg" alt="Description" style={{ width: '170px', height: '100px' }} />
    </>
  );
  this.updateChatbotState(gMessage);
}


handleBookCamp() {
  const message = this.createChatBotMessage("書營是我們的特色活動，提供讀者一個沉浸在書籍世界中的經驗。");
  this.updateChatbotState(message);
}

handleDate() {
  const message = this.createChatBotMessage("一般的運送時間為3-5個工作天");
  this.updateChatbotState(message);
}



handleBook() {
  const message = this.createChatBotMessage(
    "如果您確定要刪除所有收藏請點選以下的'刪除所有收藏'",
    { widget: "LinkComponent" }
  );
  this.updateChatbotState(message);
}


handleCouponUse() {
  const messageContent = (
    <>
    
    你可以<Link href="/member/coupon/coupon" target="_blank" rel="noopener noreferrer" className={styles.adall}>點擊查看優惠卷</Link>查看您的優惠卷
    </>
  );
  
  const message = this.createChatBotMessage(messageContent, { widget: "CouponComponent" });
  
  this.updateChatbotState(message);
}






  
updateChatbotState(message) {
  this.setState(prevState => ({
    ...prevState,
    messages: [...prevState.messages, message]
  }));
}
}


export default ActionProvider