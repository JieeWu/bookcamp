import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './post-page.module.css'
import { useAuthJWT } from '../../hooks/use-auth-jwt'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function ForumReplyButton(props) {
  const SelectRef = useRef(null)
  const router = useRouter()
  const pid = router.query.post_id
  const { authJWT, setAuthJWT } = useAuthJWT()
  // 移過去 開關 START
  const handleMouseOver = () => {
    if (SelectRef.current) {
      SelectRef.current.style.display = 'block'
    }
  }

  const handleMouseOut = () => {
    if (SelectRef.current) {
      SelectRef.current.style.display = 'none'
    }
  }
  console.log(router.query)
  // END
  //文章刪除
  const deletePost = async () => {
    try {
      await axios
        .delete('http://18.177.136.227:3002/forum/delete/post', {
          params: { id: router.query.post_id },
        })
        .then((res) => {
          if (res.data === 'success') {
            Swal.fire({
              icon: 'success',
              title: '刪除了一則文章！',
              timer: 1500,
            }).then((result) => {
              if (result.isConfirmed) {
                router.push('/forum') //
              }
            })
          }
        })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className={styles.messageOperateBlock}>
        <div className={styles.likeBtn}>
          <button className='pixel-border-yellow' onClick={props.like}>
            <i className='fa-solid fa-heart font-l'></i>
          </button>
          <button className='pixel-border-yellow' onClick={props.dislike}>
            <i className='fa-solid fa-heart-crack font-l'></i>
          </button>
        </div>
        <Link
          href={`/forum/post/${pid}?status=add`}
          className={`${styles.replyBtn} pixel-border-yellow`}
        >
          <span className='text-black'>
            我要回覆<i className='fa-solid fa-comment-dots ms-2'></i>
          </span>
          <span className='text-black'>
            立即回覆<i className='fa-solid fa-comment-dots ms-2'></i>
          </span>
        </Link>
        <div
          className={`${styles.moreFunctionBtn} pixel-border-yellow`}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
        >
          更多選項
          <i className='fa-solid fa-ellipsis-vertical ms-3'></i>
          <div className={styles.customSelect}>
            <div className={styles.selectOptions} ref={SelectRef}>
              <div className='button-area'>
                {props.id === authJWT.userData.client_id ? (
                  <Link href={`#`} onClick={deletePost}>
                    <span className='btn button-style mb-3'>刪除文章</span>
                  </Link>
                ) : (
                  ''
                )}
                {props.id === authJWT.userData.client_id ? (
                  <Link
                    href={
                      props.postStatus === 0
                        ? `/forum/post/${pid}?id=${props.status}&status=edit`
                        : `/forum/post/${pid}?rid=${props.status}&status=edit`
                    }
                  >
                    <span className='btn button-style mb-3'>編輯文章</span>
                  </Link>
                ) : (
                  ''
                )}

                <Link href={`/forum`}>
                  <span className='btn button-style mb-3'>收藏文章</span>
                </Link>
                {/* <Link href={`/forum`}>
                  <span className='btn button-style mb-3'>收藏文章</span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .button-style {
            color: black;
            width: 120px;
            background: var(--main-yellow);
            box-shadow:
              0 3px 0 #ffa81d,
              3px 0 0 #ffa81d,
              0 -3px 0 var(--main-yellow),
              -3px 0 0 var(--main-yellow),
              0 -6px 0 var(--black),
              0 6px 0 var(--black),
              -6px 0 0 var(--black),
              6px 0 0 var(--black),
              0 0 0 3px var(--black);
          }

          .button-style:hover {
            background-color: var(--main-orange);
          }

          span {
            color: white;
          }

          .button-area {
            width: 100px;
            min-height: 100%;
          }
          .custom-select {
            position: relative;
            display: inline-block;
          }

          .custom-select .select-options {
            display: none;
            position: absolute;
            top: -250px;
            right: -15px;
            z-index: 9999;
          }

          .forum-reply {
            height: 90px;
            background: orange;
            box-shadow:
              0 5px 0 0 #ab5c00,
              0 -5px 0 0 orange,
              5px 0px 0 0 #ab5c00,
              -5px 0px 0 0 orange,
              0 0 0 5px yellow,
              0 0 0 10px black; /* 添加陰影效果到父 div */
            position: relative; /* 添加 position 屬性 */
            display: grid;
            grid-template-columns: 0.5fr 0.5fr 2.5fr 0.5fr;
            flex-wrap: wrap;
          }
          .forum-reply-button {
            margin-left: 20px;
            margin-right: 30px;
            height: 50px;
            background: yellow;
            box-shadow:
              10px 0 0 0 yellow,
              -10px 0 0 0 yellow,
              0px 10px 0 0 yellow,
              0px -10px 0 0 yellow,
              0 0 0 5px yellow,
              0 0 0 10px black,
              15px 0 0 0px black,
              15px 5px 0 0px black,
              15px -5px 0 0px black,
              -15px -5px 0 0px black,
              -15px 5px 0 0px black,
              -5px 15px 0 0px black,
              5px 15px 0 0px black,
              5px -15px 0 0px black,
              -5px -15px 0 0px black;
          }
          .button4 {
            max-width: 400px;
            margin-left: 50px;
            margin-right: 50px;
            margin-top: 10px;
            height: 40px;
            background: #9b6cff;
            /* #6b4cb3*/
            box-shadow:
              10px -10px 0 0 #9b6cff,
              0px -10px 0 0 #9b6cff,
              0px -15px 0 0 black,
              -5px -10px 0 0 black,
              15px 0px 0 0 #6b4cb3,
              15px -10px 0 0 #6b4cb3,
              20px -10px 0 0 black,
              15px -15px 0 0 black,
              0px 5px 0 0 #6b4cb3,
              -5px 5px 0 0 black,
              15px 5px 0 0 #6b4cb3,
              20px 5px 0 0 black,
              0px 10px 0 0 black,
              15px 10px 0 0 black;
          }
        `}
      </style>
    </>
  )
}
