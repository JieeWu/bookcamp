import React from 'react'
import styles from './commodity-page.module.css'
import Link from 'next/link'
Link
export default function CommodityPageUsed({ rwd }) {
  return (
    <>
      <div className={`${rwd} p-2`}>
        <div className={`${styles.usedbookCard} boder-pixel bg-white`}>
          <Link href="/oldbook?query=女性能量療法：永保青春健康的自助寶典">
            <img src='http://localhost:3002/public/img/oldbookimgs/43.webp' />
          </Link>
          <div className='m-auto p-3'>
            <div className={`${styles.SaleBlock} m-bg-yellow w-100 p-2 font-s`}>
        
              銷售量 :<span>99</span>本
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
