import React from 'react'
import styles from './seller-ad.module.css'

export default function AdAddText() {
  return (
    <>
      <div className='my-4 text-white'>
        <div className='row'>
          {/* 標題輸入 */}
          <div className='col-12 col-md-7'>
            <div className={styles.textLayout}>
              <label className={styles.illustrateTitle} htmlFor='ad-title'>
                標題
              </label>
              <input
                className='input-type w-100 py-2'
                id='ad-title'
                type='text'
              />
            </div>
          </div>
          <div className='col col-md-5'>
            <div className={styles.textLayout}>
              <span className='my-auto text-nowrap'>
                <i className='fa-solid fa-asterisk me-2'></i>
                廣告連結將導向賣家個人商場
              </span>
            </div>
          </div>
          <div className='col-12 col-md-7'>
            <div className={`${styles.textLayout} mt-3`}>
              <label className={styles.illustrateTitle} htmlFor='ad-s-time'>
                開始時間
              </label>
              <input
                className='input-type w-100 py-2'
                id='ad-s-time'
                type='date'
              />
            </div>
          </div>
          <div className='col-12 col-md-5'>
            <div className={`${styles.textLayout} mt-3`}>
              <label className={styles.illustrateTitle} htmlFor=''>
                結束時間
              </label>
              <input
                className='input-type w-100 py-2'
                type='date'
                disabled='true'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
