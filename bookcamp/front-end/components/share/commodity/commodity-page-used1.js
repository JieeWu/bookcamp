import React from 'react'
import styles from './commodity-page.module.css'
import Link from 'next/link'
export default function CommodityPageUsed1({ rwd }) {
  return (
    <>
      <div className={`${rwd} p-2`}>
        <div className={`${styles.usedbookCard} boder-pixel bg-white`}>
          <Link href='/oldbook?query=搖曳露營△(5)'>
            <img src='http://localhost:3002/public/img/oldbookimgs/17.jpg'  />
          </Link>
          <div className='m-auto p-3'>
            <div className={`${styles.SaleBlock} m-bg-yellow w-100 p-2 font-s`}>
              銷售量 :<span>87</span>本
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
