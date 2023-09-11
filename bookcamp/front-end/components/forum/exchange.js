import React from 'react'
import styles from '@/components/forum/forum.module.css'

export default function Exchange() {
  return (
    <>
      <div className={styles.discussionBoardTitle}>
        <div className='plus-shape'></div>
        <h4 className='ps-3 text-nowrap'>
          討論交流版
          <i className='fa-brands fa-discourse ms-2'></i>
        </h4>
        <div className='plus-shape'></div>
      </div>
      <style jsx>
        {`
          .test {
            height: 92px;
            background:
              linear-gradient(-45deg, transparent 15px, rgba(50, 26, 102, 1) 0)
                right,
              linear-gradient(135deg, transparent 15px, rgba(50, 26, 102, 1) 0)
                left;
            background-size: 51% 100%;
            background-repeat: no-repeat;
            filter: drop-shadow(0px 8px 0 rgba(184, 108, 244, 1))
              drop-shadow(0px -4px 0 rgba(184, 108, 244, 1))
              drop-shadow(8px 0px 0 rgba(184, 108, 244, 1))
              drop-shadow(-4px 0px 0 rgba(184, 108, 244, 1))
              drop-shadow(8px 8px 0 rgba(114, 204, 255, 1));
          }
        `}
      </style>
    </>
  )
}
