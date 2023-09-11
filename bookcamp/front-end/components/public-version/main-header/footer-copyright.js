import React from 'react'
import styles from './footer.module.css'

export default function FooterCopyright() {
  return (
    <>
      <div className={styles.trademark}>
        <span>
          <i className='fa-regular fa-copyright me-2'></i>2023書營購物網
          版權沒有 翻印必究
        </span>
      </div>
    </>
  )
}
