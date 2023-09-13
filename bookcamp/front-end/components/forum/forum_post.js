import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './forum.module.css'
import { useAuthJWT } from '../../hooks/use-auth-jwt'
import Swal from 'sweetalert2'
export default function ForumPost(props) {
  const router = useRouter()
  const pid = router.query.page
  const { authJWT } = useAuthJWT()
  const collect = async (e) => {
    const client_id = authJWT.userData.client_id
    const post_id = e.target.id

    const data = axios
      .post('http://3.113.3.149:3002/forum/collect', [
        { client_id: client_id, post_id: post_id },
      ])
      .then((res) => {
        const [result] = res.data
        if (result.insertId === 0) {
          Swal.fire({
            title: '取消收藏',
            text: '真的不在收藏我一下嗎！',
            icon: 'error',
            dangerMode: true,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://3.113.3.149:3002/forum/select/post',
          {
            headers: { 'Content-Type': 'application/json' },
            params: { page: pid ? pid : '' },
          },
        )
        props.setTotalCount(response.data.totalCount)
        const data = response.data
        // 抓取出來的時間
        const targetDate = ''
        // 比對與原先資料 符合相同日期的資料
        const filterData = data.rows.filter((item) => {
          const publishDate = item.forum_create_time
          return publishDate === targetDate
        })
        // 重新渲染
        if (targetDate != '') {
          props.setPost(filterData)
        } else {
          props.setPost(data.rows)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [pid])
  console.log(props.post)
  return (
    <div style={{ minHeight: '600px' }}>
      {props.post.length !== 0 ? (
        props.post.map((v, i) => (
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
              {/* <div className='limit-text'>
                <span className=''>{v.forum_content}</span>
              </div> */}
            </Link>
            <div className={styles.alPopularity}>
              <i className='fa-sharp fa-solid fa-thumbs-up me-2 '></i>
              {v.forum_views === null ? 0 : v.forum_views}
            </div>
            <div className={styles.alTime}>
              <i className='fa-solid fa-clock me-2'></i>
              {v.forum_create_time}
            </div>

            {/* 收藏標記 */}
            <button className={styles.alCollect}>
              <i
                className={`fa-solid fa-book-bookmark font-l ${styles.collect}`}
                id={v.forum_id}
                onClick={collect}
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
        <img src='http://3.113.3.149:3002/public/img/ad/200x600_ad_2.jpg' />
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
            color: white;
          }
        `}
      </style>
    </div>
  )
}
