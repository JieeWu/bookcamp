import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import RenderDatabaseContent from './inner'
import { useAuthJWT } from '../../hooks/use-auth-jwt'
import styles from './post-page.module.css'
import Swal from 'sweetalert2'

export default function ForumPostContent(props) {
  const messageAreaRef = useRef(null)

  const avatarUrl = 'http://18.177.136.227:3002/img/member/'
  const { authJWT, setAuthJWT } = useAuthJWT()
  const router = useRouter()
  const [inputContent, setInputContent] = useState('')
  const [hidden, setHidden] = useState('false')
  const [message, setMessage] = useState('')
  const [data, setData] = useState({
    id: 0,
    post_id: 0,
    content: '',
  })
  // Get inpurt context & post_id
  const getMessage = (e) => {
    setInputContent(e.target.value)
    setData({
      id: e.target.id,
      post_id: router.query.post_id,
      content: e.target.value,
    })
  }
  // 留言區 新增留言
  const submitMessage = async () => {
    try {
      if (data.content != '') {
        await axios
          .post('http://18.177.136.227:3002/forum/reply/message2', [data], {
            withCredentials: true,
          })
          .then((res) => {
            const data = res.data
            console.log()
            data.forEach((item) => {
              const publishTime = new Date(item.publish_time)
              const localPublishTime = publishTime.toLocaleString()
              item.publish_time = localPublishTime

              if (item.publish_time.includes('下午')) {
                const forumCreateTime = item.publish_time.replace('下午', '')
                const parsedTime = new Date(forumCreateTime)
                // 将小时加上 12
                parsedTime.setHours(parsedTime.getHours() + 12)
                console.log(parsedTime)
                item.publish_time = parsedTime.toLocaleString()
              }
            })

            setMessage(data)
            setInputContent('')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        Swal.fire({
          title: '請輸入訊息',
          icon: 'error',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const changePostReply = async (e) => {
    try {
      setHidden(!hidden)
      const postId = router.query.post_id
      await axios
        .post('http://18.177.136.227:3002/forum/reply/message', [postId])
        .then((res) => {
          const [data] = res.data
          data.forEach((item) => {
            const publishTime = new Date(item.publish_time)
            const localPublishTime = publishTime.toLocaleString()
            item.publish_time = localPublishTime

            // 替换 "下午"
            const forumCreateTime = localPublishTime.replace('下午', '')

            // 根据小时调整时间
            const hour = publishTime.getHours()
            if (hour >= 12) {
              const adjustedHour = hour === 12 ? hour : hour - 12
              item.forum_create_time =
                forumCreateTime.replace(
                  hour.toString(),
                  adjustedHour.toString(),
                ) + ' PM'
            } else {
              item.forum_create_time = forumCreateTime + ' AM'
            }
          })

          setMessage(data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
    }
  }
  useEffect(() => {
    scrollToBottom() // 確保在新增訊息後捲動到最底部
  }, [message])
  return (
    <>
      {/* 文章標題 */}
      <div className={`${styles.postHeader} mt-4 br-bg-purple`}>
        <div className={`d-flex ${styles.postHeaderTitle}`}>
          <h5 className='fw-bold'>
            <i className='fa-regular fa-comments me-2'></i>
            {/* {props.data[0].forum_Cname} */}
          </h5>
          <span className={`px-4 `}>{props.data[0].forum_title}</span>
        </div>
        <div className={`ms-auto ${styles.postHeaderViews}`}>
          <div className={`${styles.articleLike} c-bg-purple me-3`}>
            {props.data[0].forum_views}
            <i className='fa-solid fa-heart me-2'></i>
          </div>
          <div className={`${styles.articleLike} c-bg-purple me-3`}>
            {props.data[0].forum_replies}
            <i className='fa-solid fa-heart-crack me-2'></i>
          </div>
        </div>
      </div>
      {/* 文章內容 */}
      <div className={styles.textContent}>
        <div className={styles.textArea}>
          <p style={{ textAlign: 'left' }}>
            {props.data.length > 0 && props.data[0].forum_content != '' ? (
              <RenderDatabaseContent
                htmlContent={props.data[props.id].forum_content}
              />
            ) : (
              '123'
            )}
          </p>
        </div>
        {/* 彈出留言區塊 */}
        <div
          className={`${styles.messageBlock} ${
            hidden ? styles.messageBlockClose : styles.messageBlockOpen
          }`}
        >
          <button onClick={changePostReply}>
            {hidden ? (
              <div className={styles.openbtn}>
                <i className='fa-solid fa-caret-left'></i>
                留<br />言<i className='fa-solid fa-caret-left'></i>
              </div>
            ) : (
              <div className={styles.openbtn}>
                <i className='fa-solid fa-caret-right'></i>
                文<br />章<i className='fa-solid fa-caret-right'></i>
              </div>
            )}
          </button>
          <div className='d-flex flex-column w-100 me-4'>
            <div
              className='pt-3 px-3 overflow-auto w-100 h-100'
              ref={messageAreaRef}
            >
              {message.length > 0 && message != '' ? (
                message.map((v, i) => {
                  console.log(v)
                  return (
                    <>
                      <div key={i}>
                        {v.id === props.id + 1 ? (
                          <>
                            <div
                              className={`${styles.userMessageBlock} pixel-border-purple p-2`}
                            >
                              <div
                                className={`${styles.landlordAvatar} rounded-circle border border-white border-2`}
                              >
                                <img
                                  src={avatarUrl + `${message[i].avatar}`}
                                ></img>
                              </div>
                              <div className='ms-3'>
                                <div className='d-flex mb-1'>
                                  #{v.client_id}
                                  <sapn className='px-2 w-100'>
                                    {v.client_name}
                                  </sapn>
                                </div>
                                <div
                                  className='font-sm text-br-purple'
                                  style={{ textAlign: 'left' }}
                                >
                                  <span>{v.publish_time}</span>
                                </div>
                              </div>
                              <p className=''>{v.forum_content}</p>
                            </div>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    </>
                  )
                })
              ) : (
                <div className='d-flex justify-content-center align-items-center w-100 h-100 text-white-50'>
                  尚未有留言內容<i className='fa-regular fa-comment ms-2'></i>
                </div>
              )}
            </div>
            {/* 留言輸入區塊 */}
            <div className={`${styles.messageInputBlock}`}>
              <div
                className={`${styles.landlordAvatar} rounded-circle border border-white border-2`}
              >
                <img src={avatarUrl + `${authJWT.userData.avatar}`}></img>
              </div>
              {/* 留言輸入的地方 */}
              <input
                className='m-3 px-3'
                id={props.id + 1}
                value={inputContent}
                onChange={getMessage}
                placeholder='趕緊輸入文字留言！！！'
              />
              <button
                className='main-btn pixel-border-yellow'
                onClick={submitMessage}
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
