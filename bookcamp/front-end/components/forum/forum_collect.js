import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './forum-collect.module.css'
import { useAuthJWT } from '../../hooks/use-auth-jwt'
import Swal from 'sweetalert2'
export default function ForumCollect(props) {
  const router = useRouter()
  const [collect, setCollect] = useState([])
  const { authJWT } = useAuthJWT()
  useEffect(() => {
    const getCollect = async () => {
      try {
        let url = ''
        {
          router.pathname === '/member/forum/forum-collect'
            ? (url = 'http://localhost:3002/forum/collect')
            : router.pathname === '/member/forum/forum-user-post'
            ? (url = 'http://localhost:3002/forum/user/Post')
            : ''
        }
        await axios
          .get(url, {
            withCredentials: true,
          })
          .then((res) => {
            console.log('回傳回來的資料',res.data);
            const formattedData = res.data.map((post) => {
              const dateObj = new Date(post.forum_create_time)
              const year = dateObj.getFullYear()
              const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
              const day = dateObj.getDate().toString().padStart(2, '0')
              const hours = dateObj.getHours().toString().padStart(2, '0')
              const minutes = dateObj.getMinutes().toString().padStart(2, '0')
              const seconds = dateObj.getSeconds().toString().padStart(2, '0')
              const formattedTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

              return {
                forum_id : post.forum_id,
                forum_title: post.forum_title,
                forum_content: post.forum_content,
                forum_create_time: formattedTime,
                forum_Cname: post.forum_Cname,
              }
            })
            setCollect(formattedData)
          })
      } catch (error) {
        console.error(error)
      }
    }
    getCollect()
  }, [collect])
  const collectLike = async (e) => {
    const client_id = authJWT.userData.client_id
    const post_id = e.target.id
 
    const data = await axios
      .post('http://localhost:3002/forum/collect', [
        { client_id: client_id, post_id: post_id },
      ])
      .then((res) => {
        console.log(res);
        const [result] = res.data
        if (result.insertId === 0) {
          Swal.fire({
            title: '取消收藏',
            text: '真的不在收藏我一下嗎！',
            icon: 'warning',
            dangerMode: true,
            timer: 1000,
          })
        } else {
          Swal.fire({
            title: '加入收藏',
            text: '在多收藏幾篇文章吧！！！',
            icon: 'success',
            dangerMode: true,
            timer: 1000,
          })
        }
      })
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:3002/forum/select/post',
  //         {
  //           headers: { 'Content-Type': 'application/json' },
  //           params: { page: pid ? pid : '' },
  //         },
  //       )
  //       props.setTotalCount(response.data.totalCount)
  //       const data = response.data
  //       // 抓取出來的時間
  //       const targetDate = ''
  //       // 比對與原先資料 符合相同日期的資料
  //       const filterData = data.rows.filter((item) => {
  //         const publishDate = item.forum_create_time
  //         return publishDate === targetDate
  //       })
  //       // 重新渲染
  //       if (targetDate != '') {
  //         console.log(111)
  //         props.setPost(filterData)
  //       } else {
  //         props.setPost(data.rows)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [pid])
  console.log('檢查',collect);
  return (
    <>
      {collect.length !== 0 ? (
        collect.map((v, i) => (
          <div key={i} className={styles.alProduct}>
            {/* 標題 */}
            <div className={styles.alTilteTblock}>
              <span>{v.forum_Cname}</span>
            </div>
            {/* 內文區塊 */}
            <Link
              className={styles.alText}
              href={`http://localhost:3000/forum/reply/${v.forum_id}`}
            >
              <span
                style={{
                  fontFamily: 'Microsoft JhengHei UI", Arial, sans-serif',
                }}
              >
                {v.forum_title}
              </span>
              <div className='limit-text'>
                {/* <span className=''>{v.forum_content}</span> */}
              </div>
            </Link>
            <div className={styles.alPopularity}>123</div>
            <div className={styles.alTime}>{v.forum_create_time}</div>

            {/* 收藏標記 */}
            <button className={styles.alCollect}>
              <i
                className={`fa-solid fa-book-bookmark font-l ${styles.collect}`}
                id={v.forum_id}
                onClick={collectLike}
              ></i>
            </button>
          </div>
        ))
      ) : (
        <>
          <div className={` ${styles.alEmptyDiv}`}>
            <div className='imgBoxSize'>
              <img src='/img/dead.png' className='w-100' />
            </div>
            <div className='my-2'>目前還尚未有人發文！！！</div>
            <Link href='/book' className='px-5 my-4'>
              快來當第一個發文者～～～
            </Link>
          </div>
        </>
      )}
      <div className={styles.alAd}>
        <img src='http://localhost:3002/public/img/ad/200x600_ad_2.jpg' />
      </div>
      <style jsx>
        {`
    .limit-text {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 控制行数 */
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .limit-text span,
    span:link,
    span:visited,
    span:hover,
    span:active,
    span {
      {/* text-decoration: underline; */}
      color: white;
    }
    .test {
      height: 74px;
      background:
        linear-gradient(-45deg, transparent 15px, rgba(50, 26, 102, 1) 0)
          right,
        linear-gradient(135deg, transparent 15px, rgba(50, 26, 102, 1) 0)
          left;
      background-size: 51% 100%;
      background-repeat: no-repeat;
      -webkit-filter: drop-shadow(0px 8px 0 rgba(184, 108, 244, 1))
        drop-shadow(0px -4px 0 rgba(184, 108, 244, 1))
        drop-shadow(8px 0px 0 rgba(184, 108, 244, 1))
        drop-shadow(-4px 0px 0 rgba(184, 108, 244, 1))
        drop-shadow(8px 8px 0 rgba(114, 204, 255, 1));
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .test2 {
      height: 74px;
      background: #9b6cff;
      box-shadow:
        0px 4px 0px 0px #9b6cff,
        -4px -4px 0px 0px #9b6cff,
        4px -4px 0px 0px #9b6cff,
        4px 0px 0px 0px #9b6cff,
        -4px 0px 0px 0px #9b6cff,
        0px -4px 0px 0px #9b6cff,
        -8px 0px 0px 0px #72ccff,
        8px 0px 0px 0px #72ccff,
        4px 8px 0px 0px #72ccff,
        8px 4px 0px 0px #72ccff,
        -8px 4px 0px 0px #72ccff,
        -4px 8px 0px 0px #72ccff;
    }
    .test2-text {
      height: 100%;
      display: flex;
      align-items: center; /* 垂直置中 */
      justify-content: center; /* 水平置中 */
      flex-direction: column; /* 將內容垂直排列 */
    }
    .test-text {
      height: 100%;
      color: white;
      display: flex;
      align-items: center; /* 垂直置中 */
      justify-content: center; /* 水平置中 */
    }

    .block-size {
      display: grid;
      grid-template-columns: 1fr 2.4fr 0.5fr;
      text-align: center;
    }
    .block-size2 {
      display: grid;
      grid-template-columns: 0.69fr 0.3fr 0.4fr;
      text-align: center;
    }
    .test-bg1 {
      width: 100px;
      height: 100px;
    }
    .test-bg2 {
      width: 600px;
      height: 100px;
    }
  `}
      </style>
    </>
  )
}
