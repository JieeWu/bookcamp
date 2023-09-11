import React from 'react'
import Link from 'next/link'
import styles from './forum.module.css'
export default function forumPostHeader() {
  return (
    <>
      <div className={styles.postBtnOutLine}>
        <div className={styles.postDecorateS}></div>
        <div className={styles.postDecorate}></div>
        <Link
          className={`col-9 ${styles.postBtnBlock}`}
          href={'/forum/post/post?status=add'}
        >
          <span className={styles.postBtn}>
            <i className='fa-solid fa-angles-right'></i>
            <sapn className='mx-3'>點我發文！</sapn>
            <i className='fa-solid fa-angles-left'></i>
          </span>
          <span>立刻馬上 !</span>
        </Link>
        <div className={styles.postDecorate}></div>
        <div className={styles.postDecorateS}></div>
      </div>

      <style jsx>{`
        .test {
          position: absolute;
          left: 0%;
          top: -70%;
        }
        .test2-text {
          height: 100%;
          display: flex;
          align-items: center; /* 垂直置中 */
          justify-content: center; /* 水平置中 */
        }
        .test2 {
          position: relative;
          height: 74px;
          background-color: var(--main-darkpurple);
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
      `}</style>
    </>
  )
}
