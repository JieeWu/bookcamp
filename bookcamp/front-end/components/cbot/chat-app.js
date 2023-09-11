import React, { useState } from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
// import styles from '@/styles/chat-app.module.css'
import ActionProvider from './chatbot/ActionProvider'
import MessageParser from './chatbot/MessageParser'
import config from './chatbot/config'
import Botbutton from './chatbot/botbutton'
import { useRouter } from 'next/router'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Swal from 'sweetalert2'
function ChatApp() {
  const { authJWT } = useAuthJWT() // 取得jwt的會員認證狀態
  const router = useRouter()
  const [showBot, toggleBot] = useState(false)

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages))
  }

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'))
    return messages
  }
  const validator = (input) => {
    if (input.trim().length > 0) return true
    return false
  }

  const handleAlert = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '請先登入',
      confirmButtonText: '前往',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }

  return (
    <div className='App'>
      {showBot && (
        <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
          {/* 聊天機器人的主要組件配置 */}
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            messageParser={MessageParser}
            saveMessages={saveMessages}
            validator={validator}
          />
        </div>
     
      )}
      {/*觸發聊天機器人顯示或隱藏的按鈕  */}
      <button
        className='customerservice'
        onClick={() => {
    if (authJWT.isAuth !== false) {
      toggleBot(prev => !prev);
    } else {
      handleAlert();
    }
  }}
      ></button>
    </div>
  )
}

export default ChatApp
