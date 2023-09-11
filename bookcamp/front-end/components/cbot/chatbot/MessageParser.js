
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;

  }
  

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes("你")) {
        this.actionProvider.greet();
        return;
    }
    
    const shippingRegex = /運費/;
    if (shippingRegex.test(lowerCaseMessage)) {
        this.actionProvider.shippingCost();
        return;
    }

    const fRegex = /付款|付費/;
    if (fRegex.test(lowerCaseMessage)) {
        this.actionProvider.f();
        return;
    }

    // const  a = /推薦/;
    // if (a.test(lowerCaseMessage)) {
    //     this.actionProvider.b();
    //     return;
    // }
    
    const bRegex = /退貨/;
    if (bRegex.test(lowerCaseMessage)) {
        this.actionProvider.b();
        return;
    }

    const eRegex = /售後/;
    if (eRegex.test(lowerCaseMessage)) {
        this.actionProvider.e();
        return;
    }


    const cRegex = /運送時間|送達/;
    if (cRegex.test(lowerCaseMessage)) {
        this.actionProvider.c();
        return;
    }

    const gRegex = /大哥/;
    if (gRegex.test(lowerCaseMessage)) {
        this.actionProvider.g();
        return;
    }








    return this.actionProvider.handleOptions({ withAvatar: true });
}

}
export default MessageParser;