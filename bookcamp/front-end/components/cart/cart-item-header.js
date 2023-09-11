import React from 'react'
import styles from './css/cart-item.module.css'
import { useRouter } from 'next/router';
export default function CartItemHeader({selectCheckAll}) {

  // 判定路由決定輸出
  const router = useRouter();
  const CartItemH = router.pathname;

  
  return (
    <>
      {CartItemH == '/cart'
        ?
        <div className={`cart pixel-font-chinese ${styles.cart_Header}`} >
          <div className='checkbox_HeaderGrid font-s'>
            <input
              type='checkbox'
              id='checkAll'
              onChange={selectCheckAll}
              hidden
            />
            <label htmlFor='checkAll'>
              全選
            </label>
          </div>
          <div className='bookImg_HeaderGrid'></div>
          <div className='bookName_HeaderGrid text-start'>書名</div>
          <div className='bookType_HeaderGrid'>類型</div>
          <div className='bookCount_HeaderGrid'>數量</div>
          <div className='bookPrice_HeaderGrid'>金額</div>
          <div className='ashcan_HeaderGrid'></div>
        </div>
        :
        <div className={`cart pixel-font-chinese ${styles.cart_Header}`}>
          <div className='bookImg_HeaderGrid '></div>
          <div className='bookName_HeaderGrid text-start'>書名</div>
          <div className='bookType_HeaderGrid'>類型</div>
          <div className='bookCount_HeaderGrid'>數量</div>
          <div className='bookPrice_HeaderGrid'>金額</div>
          <div className='ashcan_HeaderGrid'></div>
        </div>
      }
      <style jsx>
        {`
        @media screen and (max-width: 992px) {

      .bookType_HeaderGrid,
      .bookPrice_HeaderGrid,
      .bookImg_HeaderGrid,
      .bookCount_HeaderGrid {
        display: none;
      }

  }

          @media screen and (max-width: 576px) {
            .bookCount_HeaderGrid {
              display: none;
            }

          }
        `}
      </style>
    </>
  )
}
