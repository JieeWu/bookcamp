import React, { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import AdAddText from '@/components/member/ad/add-text-block'
import AdAddImg from '@/components/member/ad/add-image-block'
import styles from '@/components/member/ad/seller-ad.module.css'

export default function MemberPage() {
  // 如果該頁面有需要了解更多按鈕，把useState變更為true，並填寫下方資料
  const [status, setStatus] = useState(true)

  // const [sideValue, setSideValue] = useState('')
  return (
    <>
      <div className='row'>
        <div className='col-2 d-none d-md-flex px-0'>
          {/* 第一種為不跳轉頁面的切換方式 */}
          {/* <MemberSide setSideValue={setSideValue} /> */}
          <MemberSide />
        </div>
        <div className='col-12 col-md-10 col-xl-8 mobile-phone'>
          <div className='mb-5'>
            <Breadcrumb2 />
            <MemberMiddle
              TitleIcon='fa-solid fa-upload me-2'
              TitleName='刊登廣告'
              Remark='立即為您的商品打開觀看度' // 標題旁備註
              setStatus={setStatus}
              status={status}
              DetailIcon='fa-regular fa-circle-question me-2' // 按鈕icon
              DetailName='刊登廣告說明' // 按鈕名稱
              TextTitle='刊登廣告說明' // 內容標題
              Text='' // 內容說明
            >
              {/* 下方放自己頁面的資料 */}
              {/* {sideValue === '我的優惠券' ? <CouponAll /> : null} */}
              <AdAddText />
              <AdAddImg />
              <div className='d-flex justify-content-between py-4'>
                <a href='/member/seller/ad'>
                  <button
                    type='button'
                    className='text-white main-btn pixel-border-purple c-bg-purple'
                  >
                    返回
                  </button>
                </a>
                <button
                  type='button'
                  className='main-btn pixel-border-yellow m-bg-yellow'
                  data-bs-toggle='modal'
                  data-bs-target='#adconfirm'
                >
                  刊登
                  <i className='fa-solid fa-upload ms-3'></i>
                </button>
                {/* Modal */}
                <div
                  className='modal fade'
                  id='adconfirm'
                  tabIndex={-1}
                  aria-labelledby='adModalLabel'
                  aria-hidden='true'
                >
                  <div
                    className={`${styles.paymentConfirmation} modal-dialog modal-dialog-centered`}
                  >
                    <div className='yellow-alert pixel-border-yellow'>
                      <div className='modal-body'>
                        <h5 className='mb-3 fw-bold'>
                          <i className='fa-regular fa-circle-check me-2'></i>
                          刊登確認
                        </h5>
                        <ul className={styles.adInformation}>
                          <li>
                            <h6 className='fw-bold me-3 mb-0'>標題</h6>
                            <span>限量珍藏版，即刻收藏 !</span>
                          </li>
                          <li>
                            <h6 className='fw-bold me-3 mb-0'>類型</h6>
                            <span className='class-frame'>中文書類</span>
                          </li>
                          <li>
                            <h6 className='fw-bold me-3 mb-0'>廣告時段</h6>
                            <span>2023/01/01 ~ 2023/12/31</span>
                          </li>
                        </ul>
                        <img
                          className='rounded-3'
                          src='/img/test/1200x300_ad_1.jpg'
                          width='100%'
                          alt=''
                        />
                      </div>
                    </div>

                    <div className={`${styles.totalBox} boder-pixel mt-md-0`}>
                      <img
                        className='d-none d-md-block'
                        src='/img/test/money.png'
                        alt=''
                      />
                      <div>
                        <div className='mb-2'>我的錢包 : ******元</div>
                        <div>廣告費用 : 10000元</div>
                        <hr />
                        <div className='text-orange text-end mb-3'>
                          錢包餘額 : ******
                        </div>
                        <button
                          type='button'
                          className='main-btn w-100 pixel-border-orange m-bg-orange'
                        >
                          確認刊登
                        </button>
                      </div>
                    </div>
                    <button
                      type='button'
                      className={styles.closebtn}
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    >
                      <i className='fa-solid fa-xmark'></i>
                    </button>
                  </div>
                </div>
              </div>
            </MemberMiddle>
          </div>
        </div>

        <div className='col d-none d-xl-flex'></div>
      </div>
    </>
  )
}
