import React from 'react'
import Link from 'next/link'

export default function OldbookSide() {
  return (
    <>
      <aside className='management-block'>
        {/* 會員資訊 */}
        <div className='member-information'>
          <figure className='round-avatar'>
            <img
              src='/img/test/1000_F_543133978_1yU08gMOtkUPq1zcepCEoc4d4dBcYdyL.png'
              width='100%'
              alt=''
            />
          </figure>
          <div className='d-flex flex-wrap align-items-center ms-2'>
            <div className='fw-bold me-2'>coco</div>
            <span className='fw-bold font-s'>歡迎回到賣家中心</span>
          </div>
        </div>
        {/* 功能管理區 */}
        <div className='member-options' id='accordion'>
          <button
            className='member-main-btn pixel-purple c-bg-purple'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse'
            aria-expanded='false'
            aria-controls='collapse'
          >
            訂單管理
            <i className='fa-solid fa-caret-down'></i>
          </button>
          <div
            className='collapse w-100'
            id='collapse'
            data-bs-parent='#accordion'
          >
            <div className='card card-body member-details'>
              <ul>
                <li>
                  <Link href='#/'>我的訂單</Link>
                </li>
              </ul>
            </div>
          </div>
          <button
            className='member-main-btn pixel-purple c-bg-purple'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse1'
            aria-expanded='false'
            aria-controls='collapse1'
          >
            商品管理
            <i className='fa-solid fa-caret-down'></i>
          </button>
          <div
            className='collapse w-100'
            id='collapse1'
            data-bs-parent='#accordion'
          >
            <div className='card card-body member-details'>
              <ul>
                <li>
                  <Link href='/member/seller/Mycommodity'>管理我的商品</Link>
                </li>
                
                <li>
                  <Link href='/member/seller/add_product'>新增商品</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <button
            className='member-main-btn pixel-purple c-bg-purple'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse2'
            aria-expanded='false'
            aria-controls='collapse2'
          >
            優惠券
            <i className='fa-solid fa-caret-down'></i>
          </button>
          <div
            className='collapse w-100'
            id='collapse2'
            data-bs-parent='#accordion'
          >
            <div className='card card-body member-details'>
              <ul>
                <li>
                  <Link href='/member/coupon/coupon'>我的優惠券</Link>
                </li>
                <li>
                  <Link href='/member/coupon/coupon-record'>優惠券紀錄</Link>
                </li>
              </ul>
            </div>
          </div>
          <button
            className='member-main-btn pixel-purple c-bg-purple'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse3'
            aria-expanded='false'
            aria-controls='collapse3'
          >
            賣家中心
            <i className='fa-solid fa-caret-down'></i>
          </button>
          <div
            className='collapse w-100'
            id='collapse3'
            data-bs-parent='#accordion'
          >
            <div className='card card-body member-details'>
              <ul>
                <li>
                  <Link href='/member/seller/ad'>我的廣告</Link>
                </li>
                <li>
                  <Link href='/member/seller/ad-record'>廣告紀錄</Link>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        <div className='footer mt-auto'>
          {/* 登出按鍵 */}
          <button
            className='pixel-border-yellow m-bg-yellow w-100 fw-bold py-1'
            type='button'
          >
            登出
          </button>
        </div>
      </aside>
    </>
  )
}
