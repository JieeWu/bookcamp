import React from 'react'
import styles from './footer.module.css'

const FooterDonate = () => {
  return (
    <>
      <div className={styles.footerDonate}>
        <div>
          <i className='fa-brands fa-cc-apple-pay'></i>
        </div>
        <div>
          <i className='fa-brands fa-google'></i>
        </div>
        <div>
          <i className='fa-brands fa-line'></i>
        </div>
        <div>
          <i className='fa-brands fa-cc-visa'></i>
        </div>
      </div>
    </>
  )
}

export default FooterDonate
