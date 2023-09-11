import React from 'react'
import styles from './seller-ad.module.css'

export default function AdAddImg() {
  return (
    <>
      <div className={`${styles.uploadImgBlock} d-bg-purple`}>
        <div className={`${styles.illustrateTitle} m-3`}>圖片</div>
        <div className={`${styles.uploadImgBox} row`}>
          <div className='row col-9 col-lg-10'>
            <label className='col-12'>
              <div className={styles.uploadBox}>
                <input className='d-none' type='file' />
                <i className='fa-solid fa-circle-plus font-xl'></i>
                <span className='mt-2 text-break'>最大尺寸1200px*300px</span>
              </div>
            </label>
            <label className='col-8 mt-3'>
              <div className={styles.uploadBox}>
                <input className='d-none' type='file' />
                <i className='fa-solid fa-circle-plus font-xl'></i>
                <span className='mt-2 text-break'>最大尺寸800px*300px</span>
              </div>
            </label>
            <label className='col-4 mt-3'>
              <div className={styles.uploadBox}>
                <input className='d-none' type='file' />
                <i className='fa-solid fa-circle-plus font-xl'></i>
                <span className='mt-2 text-break'>最大尺寸300px*300px</span>
              </div>
            </label>
          </div>
          <label className='col-3 col-lg-2'>
            <div className={styles.uploadBox}>
              <input className='d-none' type='file' />
              <i className='fa-solid fa-circle-plus font-xl'></i>
              <span className='mt-2 text-break'>最大尺寸200px*600px</span>
            </div>
          </label>
        </div>
      </div>
    </>
  )
}
