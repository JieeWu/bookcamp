import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import styles from '@/components/cart/css/cart-item.module.css'

export default function UserOrderPage({ item, status, pay, receipt, delivery, coupon }) {

  return (
    <>
      <div className={`${styles.cart_item_body} ${styles.orderWidth} row text-center d-flex align-items-center`}>
        <div className='col'>{item.order_id}</div>
        <div className='col'>{item.order_create_date}</div>
        <div className='col'>{item.total}</div>
        <div className='col'>{item != '' && pay.length > 0 ? pay[item?.pay_id -1]?.pay_name : ''}</div>
        <div className='col'>  {item != '' && status.length > 0  ? status[item?.order_status_id -1]?.order_status_name : ''}</div>
        <div className='col'><Link href={`/member/order/${item.order_id}`} className='btn-jump-page'>查看明細</Link></div>
      </div>

    </>
  )
}
