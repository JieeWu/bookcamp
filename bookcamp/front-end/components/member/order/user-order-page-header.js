import React from 'react'
import styles from '@/components/cart/css/cart-item.module.css'

export default function UserOrderPageHeader() {
  return (
    <>
      <div
        className={`${styles.offset} row text-white text-center d-bg-purple p-3`}
      >
        <div className='col'>訂單編號</div>
        <div className='col'>訂單日期</div>
        <div className='col'>消費金額</div>
        <div className='col'>付款方式</div>
        <div className='col'>訂單狀態</div>
        <div className='col'></div>
      </div>
    </>
  )
}
