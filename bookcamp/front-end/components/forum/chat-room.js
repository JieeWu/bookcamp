import React, { useState, useEffect, useRef } from 'react'
import styles from './chat-room.module.css'
import io from 'socket.io-client'
import { useAuthJWT } from '../../hooks/use-auth-jwt'
import Swal from 'sweetalert2'
export default function chatRoom() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [user, setUser] = useState('')
  const [image, setImage] = useState(null)
  const messageAreaRef = useRef(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [receivedImage, setReceivedImage] = useState(null)
  const [isProcess, setIsProcess] = useState(false)
  const [imageId, setImageId] = useState('')
  const avatarUrl = 'http://localhost:3002/img/member/'
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
  useEffect(() => {
    scrollToBottom() // 確保在新增訊息後捲動到最底部
  }, [chat])
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji)
    setShowEmojis(false)
  }
  useEffect(() => {
    const newSocket = io.connect('http://localhost:3002')
    setSocket(newSocket)
    newSocket.on('receiveImage', (receivedImage) => {
      setChat((prevChat) => [
        ...prevChat,
        {
          type: 'image',
          data: receivedImage,
        },
      ])
    })

    newSocket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, { type: 'text', data: message }])
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
      socket.on('receiveImage', (imageData) => {
        try {
        } catch (error) {
          console.error('Error setting receivedImage:', error)
        }
      })
    }
  }, [socket])
  const sendMessage = () => {
    if (socket) {
      if (authJWT.userData.client_id === undefined) {
        Swal.fire({
          icon: 'error',
          title: '登入即可開始聊天～',
        })
      } else if (message == '') {
        Swal.fire({
          icon: 'error',
          title: '請輸入文字',
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      } else {
        const data = {
          userId: authJWT.userData.client_id,
          message: message,
          avatar: authJWT.userData.avatar,
        }

        socket.emit('message', data)
        setMessage('')
      }

      // setImage(null)
    }
  }
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const imageData = event.target.result
        const data = {
          imageData: imageData,
          userId: authJWT.userData.client_id,
          avatar: authJWT.userData.avatar,
        }
        socket.emit('sendImage', data)
      }

      reader.readAsDataURL(selectedFile)
    }
  }
  return (
    <>
      <div className={`${styles.chatRoomArea} d-flex flex-column h-100 ps-2`}>
        <div className='truncatedCorner-d-purple position-relative h-100'>
          <div className={styles.subjectLine}>
            <h6>
              <i className='fa-solid fa-face-laugh-wink me-2'></i>
              大家一起來聊天！！！
            </h6>
          </div>

          <div
            className={styles.messageArea}
            id='messageArea'
            ref={messageAreaRef}
          >
            {chat.map((data, index) => {
              {
                return (
                  <>
                    {data.data.userId === authJWT.userData.client_id &&
                    data.type === 'text' ? (
                      <div className={styles.replyBox2} key={index}>
                        <div className='pixel-box--light--chatRoom p-2 text-wrap me-3'>
                          <span>{data.data.message} </span>
                        </div>

                        <figure className='round-avatar'>
                          <img
                            src={avatarUrl + `${authJWT.userData.avatar}`}
                            width='100%'
                            alt=''
                          />
                        </figure>
                      </div>
                    ) : data.data.userId === authJWT.userData.client_id &&
                      data.type === 'image' ? (
                      <div className={styles.replyBox2} key={index}>
                        {data.data.imageData && (
                          <div className={styles.previewImage}>
                            <img src={data.data.imageData} alt='接收到的圖片' />
                          </div>
                        )}
                        <figure className='round-avatar'>
                          <img
                            src={avatarUrl + `${authJWT.userData.avatar}`}
                            width='100%'
                            alt=''
                          />
                        </figure>
                      </div>
                    ) : data.data.userId !== authJWT.userData.client_id &&
                      data.type === 'text' ? (
                      <div className={styles.replyBox}>
                        <figure className='round-avatar'>
                          <img
                            src={avatarUrl + `${data.data.avatar}`}
                            width='100%'
                            alt=''
                          />
                        </figure>
                        <div className='pixel-box--light p-2 text-wrap ms-3'>
                          {data.data.message}{' '}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.replyBox} key={index}>
                        <figure className='round-avatar'>
                          <img
                            src={avatarUrl + `${data.data.avatar}`}
                            width='100%'
                            alt=''
                          />
                        </figure>
                        {data.data.imageData && (
                          <div className={styles.previewImage}>
                            <img src={data.data.imageData} alt='接收到的圖片' />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )
              }
            })}
          </div>
        </div>
        <div className={`${styles.messageInputBox} my-3`}>
          <div className='d-flex'>
            <button
              className={`${styles.mesSBtn} pixel-border-br-purple`}
              type='button'
              onClick={() => {
                setShowEmojis(!showEmojis)
              }}
            >
              <i className='fa-solid fa-face-laugh-wink font-m'></i>
            </button>
            {authJWT.userData.client_id !== 0
              ? showEmojis && (
                  <div className='emoji-picker'>
                    {emojis.map((emoji, index) => (
                      <span
                        key={index}
                        onClick={() => handleEmojiClick(emoji)}
                        className='emoji'
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )
              : ''}

            <button
              className={`${styles.mesSBtn} pixel-border-br-purple ms-3`}
              type='button'
            >
              <label
                htmlFor='imageInput'
                className={`${styles.mesSBtn} pixel-border-br-purple`}
              >
                <i className='fa-solid fa-image font-m'></i>
              </label>
              <input
                type='file'
                id='imageInput'
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </button>
          </div>
          <input
            className={`${styles.mesInput} w-100 mx-3`}
            type='text'
            id=''
            placeholder={
              authJWT.userData.client_id !== 0
                ? '輸入內容'
                : '想聊天嗎？登入即可輸入訊息！！！'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            readOnly={authJWT.userData.client_id !== 0 ? null : true}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                if (!Swal.isVisible()) {
                  setIsProcess(true)
                  sendMessage()
                }
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setIsProcess(false)
              }
            }}
          />

          <button
            className={`${styles.mesLBtn} pixel-border-br-purple`}
            type='button'
            onClick={sendMessage}
          >
            <label className='d-flex' htmlFor='contentInput'>
              <span className='d-none d-md-block'>發送</span>
            </label>
            <i
              className='fa-solid fa-paper-plane ms-md-2'
              id='contentInput'
            ></i>
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .emoji-picker {
            position: absolute;
            bottom: 40px; /* 調整這個值以控制距離表情按鈕的距離 */
            left: 0;
            max-width: 200px;
            max-height: 100px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 8px;
            display: flex;
            flex-wrap: wrap;
            z-index: 888;
            overflow: auto;
          }

          .emoji {
            font-size: 20px;
            margin: 5px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
