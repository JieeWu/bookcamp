import React from 'react'
import styles from './front-title.module.css'

export default function FrontTitle({ title, icon }) {
  return (
    <>
      <div className={styles.titleTheme}>
        <div className='w-100 d-flex align-items-end justify-content-end'>
          <div className={`${styles.sBlock} me-3`}></div>
          <div className={`${styles.decorateRhythm} row`}>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
          </div>
          {/* <div className={styles.sLine}></div> */}
        </div>
        <h3 className='text-nowrap mx-2 mx-md-4 fw-bold'>
          <i className={icon}></i>
          {title}
        </h3>
        <div className='w-100 d-flex align-items-end'>
          {/* <div className={styles.sLine}></div> */}
          <div className={`${styles.decorateRhythm} row`}>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
            <span className='col'></span>
          </div>
          <div className={`${styles.sBlock} ms-3`}></div>
        </div>
      </div>
    </>
  )
}
