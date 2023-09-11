import React from 'react'
import styles from './front-page-uesdbook.module.css'
import FrontTitle from '@/components/share/front-title'
import CommodityPageUsed from '@/components/share/commodity/commodity-page-used'
import CommodityPageUsed1 from '@/components/share/commodity/commodity-page-used1'
import CommodityPageUsed3 from '@/components/share/commodity/commodity-page-used3'
import CommodityPageUsed2 from '@/components/share/commodity/commodity-page-used2'
import Link from 'next/link'
export default function FrontUesdBook() {
  const pageSpacing = {
    marginTop: '20vh',
  }

  return (
    <>
      <div
        className='row flex-column flex-xxl-row align-items-center'
        style={pageSpacing}
      >
        <div className='col-12 col-md-10 col-xxl-3 order-2 order-xxl-1 px-0'>
          <div className={`${styles.usedCommodityBlock} flex-xxl-wrap`}>
            <CommodityPageUsed rwd='col-6 col-md-3 col-xxl-6' />
            <CommodityPageUsed1 rwd='col-6 col-md-3 col-xxl-6' />
            <CommodityPageUsed3 rwd='col-6 col-md-3 col-xxl-6' />
            <CommodityPageUsed2 rwd='col-6 col-md-3 col-xxl-6' />
          </div>
        </div>
        <div
          className={`${styles.usedMainBlock} col-12 col-md-10 col-xxl-6 order-1 order-xxl-2`}
        >
          <div className='col-12 col-md-9 mb-5'>
            {/* 頁面標題 */}
            <FrontTitle
              title='二手書交易平台'
              icon='fa-solid fa-book-open me-2'
            />
          </div>
          <div className={`${styles.usedbookBlock} row w-100 m-0`}>
            <div className='col-12 col-md-7 order-2 order-md-1'>
              <div className={`${styles.usedText} h-100 p-2 p-md-5`}>
                <div className='mt-3 mt-xxl-5'>
                  <h5 className='fw-bold'>閱讀傳承 ， 共享書香時光</h5>
                  <p className='mt-3 mt-xxl-4'>
                    提供方便快捷的交易環境，讓用戶可以買賣二手書籍，尋找稀有書籍，以及與其他書迷交流分享閱讀體驗。
                  </p>
                </div>
                <button className='bg-black boder-pixel w-100 mx-auto'>
                  前往瀏覽
                </button>
              </div>
            </div>
            <div
              className={`${styles.usedImg} col-12 col-md-5 order-1 order-md-2`}
            ></div>
          </div>
        </div>
        <div className='col-10 col-xxl-3 order-3 d-none d-md-block px-0'>
          <div className={`${styles.usedCommodityBlock} flex-xxl-wrap`}>
            <CommodityPageUsed rwd='col-6 col-md-3 col-xxl-6' />
            <CommodityPageUsed rwd='col-6 col-md-3 col-xxl-6' />
            <CommodityPageUsed rwd='col-6 col-md-3 col-xxl-6' />
            <CommodityPageUsed rwd='col-6 col-md-3 col-xxl-6' />
          </div>
        </div>
      </div>
    </>
  )
}
