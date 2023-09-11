import { useState } from 'react'
import styles from '@/components/cart/css/cart-coupon.module.css'
import CouponAll from '@/components/member/coupon/coupon-all'

export default function CartCoupon({setCartCoupon, amount}) {

  return (
    <>
      <div className={`col-12 col-lg-6 pe-0 pe-lg-2`}>
        <div className={`${styles.couponBg} pixel-border-yellow`}>
          {/* 優惠券頂部 */}
          <div className={styles.couponHeader}>
            <h5 className='fw-bold pixel-font-chinese'>
              <i className='fa-solid fa-tag me-2'></i>選擇優惠券
            </h5>
            <div className={styles.couponInput}>
              <i className='fa-solid fa-pen'></i>
              <input
                type='text'
                className={styles.inputBox}
                placeholder='優惠卷輸入'
              />
            </div>
          </div>
          {/* 優惠券區塊 */}
          <div className={styles.couponBody}>
            {/* 領取區塊切換 */}
            <CouponAll setCartCoupon={setCartCoupon} amount={amount}/>

          </div>
        </div>
      </div>
    </>
  )
}
