import React from 'react'
import { createChatBotMessage } from 'react-chatbot-kit'
import Botbutton from './botbutton'
import LinkComponent from './cbota'
import CouponComponent from './cbotb'

const config = {
  initialMessages: [
    createChatBotMessage('你好，我是書營人，需要我幫你解決什麼問題嗎？', {
      widget: 'botButtonOptions',
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: 'rgb(221, 214, 214)',
    },
    chatButton: {
      backgroundColor: '#376B7E',
    },
  },
  widgets: [
    {
      widgetName: 'botButtonOptions',
      widgetFunc: (props) => <Botbutton {...props} />,
    },
    {
      widgetName: 'LinkComponent',
      widgetFunc: (props) => <LinkComponent {...props} />,
    },
    {
      widgetName: 'CouponComponent',
      widgetFunc: (props) => <CouponComponent {...props} />,
    },
  ],
}

export default config
