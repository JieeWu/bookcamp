import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useAuthJWT } from '../../hooks/use-auth-jwt'
import Link from 'next/link'
import styles from './front-page-message.module.css'
import FrontTitle from '@/components/share/front-title'
import ChatRoom from '../forum/chat-room'
export default function FrontPageMessage(props) {
  const pageSpacing = {
    marginBlock: '10vh',
  }
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [user, setUser] = useState('')
  const [image, setImage] = useState(null)
  const messageAreaRef = useRef(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const emojis = [
    '😀',
    '😂',
    '😊',
    '🥰',
    '😎',
    '🤩',
    '😊',
    '🤔',
    '😄',
    '😃',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😇',
    '😉',
    '😍',
    '🥰',
    '😋',
    '😎',
    '😌',
    '😏',
    '🙃',
    '😐',
    '😑',
    '😶',
    '😒',
    '🙄',
    '😬',
    '🤐',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🥴',
    '🥺',
    '😢',
    '😥',
    '😰',
    '😭',
    '😓',
    '😪',
    '😴',
    '🙄',
    '🤷‍♂️',
    '🤷‍♀️',
    '🤦‍♂️',
    '🤦‍♀️',
    '🙆‍♂️',
    '🙆‍♀️',
    '🙅‍♂️',
    '🙅‍♀️',
    '🙋‍♂️',
    '🙋‍♀️',
    '🤯',
    '😥',
    '🤬',
    '😈',
    '👿',
    '💀',
    '☠️',
    '💩',
    '🤡',
    '👻',
    '👽',
    '👾',
    '🤖',
    '🎃',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '🤲',
    '👐',
    '🙌',
    '👏',
    '🤝',
    '👍',
    '👎',
    '👊',
    '✊',
    '🤛',
    '🤜',
    '🤞',
    '✌️',
    '🤟',
    '🤘',
    '👌',
    '👈',
    '👉',
    '👆',
    '👇',
    '☝️',
    '✋',
    '🤚',
    '🖐',
    '🖖',
    '🤏',
    '✍️',
    '👋',
    '👏',
    '🙏',
    '💪',
    '🦵',
    '🦶',
    '👂',
    '👃',
    '👣',
    '👀',
    '👁️‍🗨️',
    '🧠',
    '🦷',
    '🗣',
    '👅',
    '👄',
    '💋',
    '🌍',
    '🌎',
    '🌏',
    '🌐',
    '🌑',
    '🌒',
    '🌓',
    '🌔',
    '🌕',
    '🌖',
    '🌗',
    '🌘',
    '🌙',
    '🌚',
    '🌛',
    '🌜',
    '🌝',
    '🌞',
    '🌟',
    '⭐️',
    '🌠',
    '🌤️',
    '⛅️',
    '🌥️',
    '☁️',
    '🌦️',
    '🌧️',
    '⛈️',
    '🌩️',
    '🌨️',
    '❄️',
    '☃️',
    '⛄️',
    '🌬️',
    '💨',
    '🌪️',
    '🌫️',
    '🌈',
    '☔️',
    '💧',
    '💦',
    '☂️',
    '🌊',
  ]
  const { authJWT, setAuthJWT } = useAuthJWT()
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
    }
  }
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji)
    setShowEmojis(false)
  }
  useEffect(() => {
    const newSocket = io.connect('http://localhost:3002')
    setSocket(newSocket)

    newSocket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, message])
    })

    return () => {
      newSocket.close()
    }
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        console.log('Received:', message)
      })
    }
  }, [socket])
  useEffect(() => {
    scrollToBottom() // 確保在新增訊息後捲動到最底部
  }, [chat])
  const sendMessage = () => {
    if (socket) {
      const data = {
        userId: authJWT.userData.client_id,
        message: message,
      }
      socket.emit('message', data)
      setMessage('')
    }
  }
  return (
    <div className='row' style={pageSpacing} id={props.id}>
      <div className='d-none d-md-block header-height'></div>
      <div className='col'>
        {/* 頁面標題 */}
        <FrontTitle title='互動交流' icon='fa-solid fa-comment-dots me-2' />
        <div className={`${styles.messageBlock} row m-bg-purple`}>
          <div className='d-none d-xxl-flex justify-content-center col-2 py-4'>
            <Link className={styles.messageAd} href='/forum'>
              <img src='/img/all-ad/200x600_ad_7.jpg' />
            </Link>
          </div>
          <div
            className={`${styles.messageMainBlock} col-12 col-xl-10 col-xxl-8`}
          >
            <div className='col-12 col-md-8 order-2 order-md-1'>
              <ChatRoom />
            </div>
            <div className='col-12 col-md-4 order-1 order-md-2 px-md-3 text-white'>
              <h5 className='d-none d-md-block neon-border py-4 mb-3 mx-auto pixel-font-chinese'>
                <i
                  className={`${styles.arow} fa-solid fa-caret-right me-2 me-lg-4 font-l`}
                ></i>
                <i className='fa-solid fa-fire me-3 text-orange'></i>
                熱門分類
                <i className='fa-solid fa-fire ms-3 text-orange'></i>
                <i
                  className={`${styles.arow} ${styles.reverse} fa-solid fa-caret-left ms-2 ms-lg-4 font-l`}
                ></i>
              </h5>
              <div className={`${styles.bookClassBlock} ps-xl-2 my-md-0`}>
                <div className={`${styles.hotTopics} pb-0 pb-md-4 pb-xxl-0`}>
                  <div className='col col-md-6 p-1'>
                    <button
                      className={`${styles.classSubjectBtn} ${styles.classSubjectBtnPixel} m-2`}
                      type='button'
                    >
                      <span className='pixel-font-chinese me-2 me-md-0'>
                        中文書類
                      </span>
                      <div className='d-bg-purple rounded-pill px-2 py-1 font-s mt-md-2'>
                        <span className='d-none d-md-inline me-1'>回文數:</span>
                        <span>200</span>
                      </div>
                    </button>
                  </div>
                  <div className='col col-md-6 p-1'>
                    <button
                      className={`${styles.classSubjectBtn} ${styles.classSubjectBtnPixelRed} m-2`}
                      type='button'
                    >
                      <span className='pixel-font-chinese me-2 me-md-0'>
                        中文書類
                      </span>
                      <div className='d-bg-purple rounded-pill px-2 py-1 font-s mt-md-2'>
                        <span className='d-none d-md-inline me-1'>回文數:</span>
                        <span>200</span>
                      </div>
                    </button>
                  </div>
                  <div className='col col-md-6 p-1'>
                    <button
                      className={`${styles.classSubjectBtn} ${styles.classSubjectBtnPixelRed} m-2`}
                      type='button'
                    >
                      <span className='pixel-font-chinese me-2 me-md-0'>
                        中文書類
                      </span>
                      <div className='d-bg-purple rounded-pill px-2 py-1 font-s mt-md-2'>
                        <span className='d-none d-md-inline me-1'>回文數:</span>
                        <span>200</span>
                      </div>
                    </button>
                  </div>
                  <div className='col col-md-6 p-1'>
                    <button
                      className={`${styles.classSubjectBtn} ${styles.classSubjectBtnPixel} m-2`}
                      type='button'
                    >
                      <span className='pixel-font-chinese me-2 me-md-0'>
                        中文書類
                      </span>
                      <div className='d-bg-purple rounded-pill px-2 py-1 font-s mt-md-2'>
                        <span className='d-none d-md-inline me-1'>回文數:</span>
                        <span>200</span>
                      </div>
                    </button>
                  </div>
                  <div className='col col-md-6 p-1'>
                    <button
                      className={`${styles.classSubjectBtn} ${styles.classSubjectBtnPixel} m-2`}
                      type='button'
                    >
                      <span className='pixel-font-chinese me-2 me-md-0'>
                        中文書類
                      </span>
                      <div className='d-bg-purple rounded-pill px-2 py-1 font-s mt-md-2'>
                        <span className='d-none d-md-inline me-1'>回文數:</span>
                        <span>200</span>
                      </div>
                    </button>
                  </div>
                  <div className='col col-md-6 p-1'>
                    <button
                      className={`${styles.classSubjectBtn} ${styles.classSubjectBtnPixelRed} m-2`}
                      type='button'
                    >
                      <span className='pixel-font-chinese me-2 me-md-0'>
                        中文書類
                      </span>
                      <div className='d-bg-purple rounded-pill px-2 py-1 font-s mt-md-2'>
                        <span className='d-none d-md-inline me-1'>回文數:</span>
                        <span>200</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Link
              className={`${styles.phoneMessageAd} col-12 px-0 order-3 d-block d-xxl-none`}
              href='#'
            >
              <img src='/img/test/1200x300_ad_10.jpg' />
            </Link>
          </div>
          <div className='d-none d-xxl-flex justify-content-center col-2 py-4'>
            <Link className={styles.messageAd} href='#'>
              <img src='/img/test/200x600_ad_3.jpg' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
