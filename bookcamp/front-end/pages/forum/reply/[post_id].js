import React, { useState, useEffect, useContext, useRef } from 'react'
import Header from '@/components/forum/header'
import Navbar from '@/components/forum/navbar'
import ForumBreadcrumb from '@/components/forum/forum-breadcrumb'
import AvatarData from '@/components/forum/avatar-data'
import ForumReplytContent from '@/components/forum/forum-reply-content'
import ForumReplyButton from '@/components/forum/forum-reply-button'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '@/components/forum/post-page.module.css'
import Link from 'next/link'
import Swal from 'sweetalert2'
export default function Reply() {
  const [data, setData] = useState('')
  const [avatar, setAvatar] = useState('')
  const router = useRouter()
  const messageAreaRef = useRef(null)
  const [chat, setChat] = useState([])
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
    }
  }
  // ref={messageAreaRef}
  const like = async () => {
    await axios
      .put('http://3.113.3.149:3002/forum/post/like', [router.query.post_id])
      .then((res) => {
        if (res.data.changedRows) {
          Swal.fire({
            title: '按讚',
            text: '謝謝您的喜歡',
            icon: 'success',
            timer: 1000,
            dangerMode: true,
          })
        }
      })
  }
  const dislike = async () => {
    await axios.put('http://3.113.3.149:3002/forum/post/dislike', [
      router.query.post_id,
    ])
  }

  useEffect(() => {
    scrollToBottom() // 確保在新增訊息後捲動到最底部
  }, [chat])
  useEffect(() => {
    const getAvatar = async () => {
      try {
        const { post_id, status } = router.query

        if (!post_id) {
          return ''
        }
        const result = await axios.get(
          `http://3.113.3.149:3002/forum/post/${post_id}?status=${status}`,
        )

        // console.log(result);
        const [firstData] = result.data.rows
        const newData = [firstData, ...result.data.replyData]
        // token
        setAvatar(result.data.data)
        //原發佈者
        setData(newData)
      } catch (error) {
        console.log(error)
      }
    }
    getAvatar()
  }, [router.query])

  return (
    <>
      <div className=''>
        <div className='container'>
          <ForumBreadcrumb />
          <div className='row'>
            <div className=''>
              {data.length > 0 && data != ''
                ? data.map((v, i) => {
                    console.log(v)
                    return (
                      <>
                        <div key={i}>
                          <AvatarData
                            id={i}
                            postId={data[i].id}
                            data={data}
                            avatar={avatar}
                          />
                          <div className='d-flex'>
                            <div className='col-xxl-10 col-lg-12 col-md-12 col-sm-12 col-12'>
                              <div className='pe-3'>
                                <ForumReplytContent id={i} data={data} />
                                <ForumReplyButton
                                  like={like}
                                  dislike={dislike}
                                  id={v.client_id}
                                  status={
                                    v.forum_reply_id
                                      ? v.forum_reply_id
                                      : v.forum_id
                                  }
                                  postStatus={i}
                                />
                              </div>
                            </div>
                            <div className='col-xxl-2'>
                              <div className={styles.postPageAd}>
                                {/* <img src='http://3.113.3.149:3002/public/img/ad/200x600_ad_3.jpg' /> */}
                                <img src='/img/all-ad/200x600_ad_5.jpg' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                : ''}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
