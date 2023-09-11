import React, { useState } from 'react'
import styles from '@/components/cart/css/cart-item.module.css'

import CommodityPage from '@/components/share/commodity/commodity-page'

export default function CartAddPurchase({ setCheck, cartAddItem }) {
  const imgStyle = {
    width: '200px',
  }

  return (
    <>
      <div
        className='modal fade'
        id='add1'
        tabindex='-1'
        aria-labelledby='add1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div
              className={`modal-header pixel-font-chinese ${styles.modalheader}`}
            >
              <i className='fa-solid fa-sack-dollar pe-2'></i>
              <h5 className='modal-title' id='add1label'>
                加購內容
              </h5>
            </div>
            <div className={`modal-body ${styles.modalbody}`}>
              <div
                id='carouselExampleControlsNoTouching'
                className='carousel slide'
                data-bs-touch='false'
                data-bs-interval='false'
              >
                <div className='carousel-inner'>
                  {cartAddItem.map((item, index) => {
                    if (index % 3 === 0) {
                      const group = cartAddItem.slice(index, index + 3)
                      return (
                        <div
                          key={`group-${index}`}
                          className={`carousel-item ${
                            index === 0 ? 'active' : ''
                          }`}
                        >
                          <div className='row'>
                            <div className='col-1'>
                              <button
                                className='carousel-control-prev d-flex justify-content-start'
                                type='button'
                                data-bs-target='#carouselExampleControlsNoTouching'
                                data-bs-slide='prev'
                              >
                                <div className={`${styles.imgdiv}`}>
                                  <img
                                    src='/img/left-arrow.png'
                                    className='w-100'
                                  />
                                </div>
                              </button>
                            </div>
                            <div className='col-10'>
                              {/* 放置商品內容 */}
                              <div className='d-flex'>
                                {group.map((groupItem) => (
                                  <div
                                    key={groupItem.book_id}
                                    className={`${styles.addproduct} flex-fill`}
                                  >
                                    <CommodityPage
                                      imgStyle={imgStyle}
                                      book_id={groupItem.book_id}
                                      b_title={groupItem.b_title}
                                      book_price={groupItem.book_price}
                                      book_img_id={groupItem.book_img_id}
                                      item={groupItem}
                                      setCheck={setCheck}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className='col-1'>
                              <button
                                className='carousel-control-next d-flex justify-content-end'
                                type='button'
                                data-bs-target='#carouselExampleControlsNoTouching'
                                data-bs-slide='next'
                              >
                                <div className={`${styles.imgdiv}`}>
                                  <img
                                    src='/img/right-arrow.png'
                                    className='w-100'
                                  />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .modal-dialog {
            max-width: 1000px; /* 設定你想要的最大寬度 */
          }

          .commodityCard {
            width: 100px;
          }
        `}
      </style>
    </>
  )
}
