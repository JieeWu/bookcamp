import React from 'react'
import styles from './commodity-page.module.css'
import Link from 'next/link'
Link
export default function CommodityPageUsed({ rwd }) {
  return (
    <>
      <div className={`${rwd} p-2`}>
        <div className={`${styles.usedbookCard} boder-pixel bg-white`}>
          <Link href="/oldbook?query=Python刷題鍛鍊班">
            <img src='http://3.113.3.149:3002/public/img/oldbookimgs/22.webp' />
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
