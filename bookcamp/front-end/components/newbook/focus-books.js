import React from 'react'
import FrontTitle from '@/components/share/front-title'
import styles from '@/components/newbook/focus-books.module.css'
import Link from 'next/link'

export default function FocusBooks() {
  return (
    <>
      <div className='newbook-top'>
        <FrontTitle icon='fa-solid fa-expand me-2' title='焦點書籍' />
        <div className='row px-3'>
          <div className='col-4'>
            <div className='position-relative'>
              <div className={styles.focusBook}>
              <img src="http://localhost:3002/public/img/oldbookimgs/jo12m8jE.png" />
              </div>
              <div className={styles.imgSpace}></div>
              <div className={`${styles.goBtnPosition} more-btn`}>
              <Link href='/newbook/459'>
                <button className='fw-bold'>
                  前往了解<i className='fa-solid fa-arrow-right-long ms-2'></i>
                </button>
                </Link>
              </div>
              
              <div className={styles.focusContent}>
                <h5 className='fw-bold mb-2'>React 學習手冊 第二版</h5>
                <span>
                本書將傳授您如何快速高效的React應用。
                </span>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='position-relative'>
              <div className={styles.focusBook}>
                <img src='http://localhost:3002/public/img/oldbookimgs/31.png' />
              </div>
              <div className={styles.imgSpace}></div>
              <div className={`${styles.goBtnPosition} more-btn`}>
              <Link href='/newbook/106' >
                <button className='fw-bold'>
                  前往了解<i className='fa-solid fa-arrow-right-long ms-2'></i>
                </button>
                </Link>
              </div>
              <div className={styles.focusContent}>
                <h5 className='fw-bold mb-2'>原子習慣</h5>
                <span>
                每天都進步1%一年後你會進步37倍每天都退步1%一年後你會弱化到趨近於0你的一點小改變..
                </span>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='position-relative'>
              <div className={styles.focusBook}>
                <img src="http://localhost:3002/public/img/oldbookimgs/getI141mage.png" />
              </div>
              <div className={styles.imgSpace}></div>
              <div className={`${styles.goBtnPosition} more-btn`}>
              <Link href='/newbook/460'>
                <button className='fw-bold'>
                  前往了解<i className='fa-solid fa-arrow-right-long ms-2'></i>
                </button>
                </Link>
              </div>
              <div className={styles.focusContent}>
                <h5 className='fw-bold mb-2'>網頁應用程序設計：使用Node和Express(第二版)</h5>
                <span>             
                Express在穩健的框架和完全不使用框架之間取得巧妙的平衡，讓你可以自由地選擇架構。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
