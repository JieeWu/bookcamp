import { useState, useEffect } from 'react'
import styles from '@/components/member/coupon/member-coupon.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function CouponUnaccalimed({ coupons, setCoupons }) {
  const router = useRouter()
  const couponCanUse = router.pathname

  const [text, setText] = useState('')

  //取得當前登入的會員資料
  const { authJWT } = useAuthJWT()

  const handleReceiveCoupon = async (couponId) => {
    let param = {
      client_id: authJWT.userData.client_id, // 到時要換成實際的會員id
      coupon_id: couponId,
    }
    console.log(param)
    try {
      const response = await axios.post(
        'http://localhost:3002/coupon/record/create',
        param,
      )
      setText('領取成功 !')
      fetchData()
    } catch (error) {
      setText('領取失敗 !')
      console.error('Error receiving coupon:', error)
    }
  }

  const fetchData = async () => {
    try {
      let param = {
        client_id: authJWT.userData.client_id,
      }
      const response = await axios.post(
        `http://localhost:3002/coupon/list`,
        param,
      )
      console.log(response.data.data)
      setCoupons(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div
        className={`row ${
          couponCanUse === '/cart' ? styles.cartCouponBody : 'mt-4'
        }`}
      >
        {coupons.map((v) => {
          return (
            <>
              {/* 優惠券區塊 */}
              <div
                className={`col-12 ${
                  couponCanUse === '/cart' ? '' : 'col-lg-6'
                }`}
                key={v.coupon_id}
              >
                <div
                  className={`${styles.coupon} flex-md-row bg-white pixel-box--white`}
                >
                  <div className='d-flex w-100'>
                    <button
                      type='button'
                      className={`${styles.receiveButton} col-6 m-bg-yellow`}
                      onClick={() => handleReceiveCoupon(v.coupon_id)}
                      data-bs-toggle='modal'
                      data-bs-target='#ReceiveSuccess'
                    >
                      <div className={`${styles.receiveStyle} fw-bold`}>
                        領取
                      </div>
                    </button>
                    {/* 彈出領取訊息 */}
                    <div className='my-auto p-3'>
                      <span className='fw-bold text-nowrap'>
                        {v.coupon_name}
                      </span>
                      <h5 className='fw-bold'>
                        <span className={`${styles.amount} pixel-font`}>
                          {v.discount_display}
                          &nbsp;
                        </span>
                        {v.discount_type === 1 ? '折' : '元'}
                      </h5>
                      <span className='font-s text-break'>
                        有效期限 {v.start_time.replace(/-/g, '/')}~
                        {v.end_time.replace(/-/g, '/')}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.InformationFrame} flex-md-column col col-md-4`}
                  >
                    <span className={`${styles.InformationCoupon} font-s`}>
                      低消 {parseInt(v.min_point)} 元
                    </span>
                    <span className={`${styles.InformationCoupon} font-s`}>
                      {v.coupon_per_limit === null
                        ? '無數量限制'
                        : `限領 ${v.coupon_per_limit} 張`}
                    </span>
                    <span className={`${styles.InformationCoupon} font-s`}>
                      {v.coupon_quantity === null
                        ? '無上限'
                        : `剩餘 ${v.coupon_quantity} 張`}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        <div
          className='modal fade'
          id='ReceiveSuccess'
          tabindex='-1'
          aria-labelledby='ModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered text-black'>
            <div className='yellow-alert pixel-border-yellow'>
              <div className='modal-body' id='ModalLabel'>
                <div className={styles.receiveNotification}>
                  <i className='fa-solid fa-bell'></i>
                  <span>{text}</span>
                  <button
                    type='button'
                    className='main-btn pixel-border-purple m-bg-purple'
                    data-bs-dismiss='modal'
                  >
                    收到 !
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
