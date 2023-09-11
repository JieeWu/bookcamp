import React, { useEffect } from 'react'
import styles from './forum.module.css'
import Link from 'next/link'
export default function ForumPostHeader() {
  return (
    <>
      {/* <div className="background2 mt-3 mb-3">
        <div className="block-size">
          <div>書籍</div>
          <div>內容</div>
          <div>人氣</div>
          <div>回覆時間</div>
          <div>收藏</div>
          <div>
            <span>icon </span>
            <span>select</span>
          </div>
        </div>
      </div> */}
      <div className={styles.alHeader}>
        <div className={styles.alHeaderGrid}>書籍</div>
        <div className={`${styles.alHeaderGrid} text-start ps-5`}>內容</div>
        <div className={styles.alHeaderGrid}>人氣</div>
        <div className={styles.alHeaderGrid}>回覆時間</div>
        <div className={styles.alHeaderGrid}>收藏</div>
        <div className={styles.alHeaderGrid}>
          <Link href={'/member/forum/forum-collect'}>
            <button>
              <i className='fa-solid fa-book-bookmark'></i>
            </button>
          </Link>
        </div>
        <div className={`${styles.alHeaderGrid} w-100`}>
          <select
            defaultValue='1'
            className={`${styles.alSelect} d-none d-md-flex ms-0 ms-xl-auto out-time-pixel`}
            aria-label='Default select'
          >
            <option>請選擇</option>
            <option value='1'>最新時間</option>
            <option value='2'>最熱門</option>
          </select>
        </div>
      </div>
      <style jsx>
        {`
          /* 區塊大小 */
          .block-size {
            display: grid;
            grid-template-columns: 0.3fr 0.7fr 0.2fr 0.4fr 0.2fr 1fr;
            text-align: center;
          }
          .block-size div:not(:last-child) {
            border-right: 3px solid black;
            width: 100%;
            height: 50px; /* 設定固定高度 */
            display: flex;
            align-items: center; /* 垂直置中 */
            justify-content: center; /* 水平置中 */
          }
          /*背景圖片 */
          .background2 {
            margin-top: 5px;
            width: 100%;
            min-height: 40%;
            background: #f3d52e;
            box-shadow:
              7px 7px 0px 0px #ab9620,
              -7px 7px 0px 0px #ab9620;
          }
        `}
      </style>
    </>
  )
}
