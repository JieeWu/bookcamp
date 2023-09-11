import { useState, useEffect } from 'react'
import styles from '@/components/member/coupon/coupon-record.module.css'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function CouponRecord() {
  const [cRecord, setCRecord] = useState([])

  const [selectedCoupon, setSelectedCoupon] = useState(null)

  //取得當前登入的會員資料
  const { authJWT } = useAuthJWT()
  const client_id = authJWT.userData.client_id
  useEffect(() => {
    const fetchData = async () => {
      try {
        let param = {
          client_id: authJWT.userData.client_id, // 到時要換成實際的會員id
        }
        const response = await axios.post(
          `http://localhost:3002/coupon/history`,
          param,
        )
        setCRecord(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [client_id])

  // 處理點擊按鈕打開 Modal 的函數
  const handleOpenModal = (coupon) => {
    setSelectedCoupon(coupon)
  }

  return (
    <>
      {/* 優惠券區塊 */}
      <div className={`${styles.offset} row`}>
        <div className={styles.cRecordHeader}>
          <div className={styles.cHeaderGrid}>優惠券名稱</div>
          <div className={styles.cHeaderGrid}>訂單編號</div>
          <div className={styles.cHeaderGrid}>結束日期</div>
          <div className={styles.cHeaderGrid}>使用日期</div>
          <div className={styles.cHeaderGrid}>狀態</div>
        </div>
        <div className='my-3 px-1 px-md-4'>
          {cRecord.map((v) => {
            return (
              <>
                <div
                  className={`${styles.cProduct} pixel-box--white`}
                  key={v.coupon_record_id}
                >
                  <div
                    className={`${styles.cProductGrid} ${styles.cProductTitle} fw-bold w-100`}
                  >
                    {v.coupon_name}
                  </div>
                  <div
                    className={`${styles.cProductGrid} ${styles.cProductOrder}`}
                  >
                    {v.order_id === null ? (
                      <span>-</span>
                    ) : (
                      <button
                        type='button'
                        className='c-bg-purple pixel-border-purple text-white'
                        data-bs-toggle='modal'
                        data-bs-target='#details'
                        onClick={() => {
                          handleOpenModal(v)
                        }}
                      >
                        {v.order_id}
                      </button>
                    )}
                  </div>
                  <div
                    className={`${styles.cProductGrid} ${styles.cProductEndDate}`}
                  >
                    <span className={`${styles.titleS} d-md-none`}>
                      結束時間
                    </span>
                    {v.end_time.replace(/-/g, '/')}
                  </div>
                  <div
                    className={`${styles.cProductGrid} ${styles.cProductDate}`}
                  >
                    <span className={`${styles.titleS} d-md-none`}>
                      使用時間
                    </span>
                    {v.use_time === null ? '-' : v.use_time.replace(/-/g, '/')}
                  </div>
                  <div
                    className={`${styles.cProductGrid} ${
                      styles.cProductState
                    } ${
                      v.use_status_id === 2 ? 'c-bg-purple' : 'br-bg-purple'
                    }`}
                  >
                    <div className={`${styles.stateText} fw-bold`}>
                      <span className={styles.statusContent}>
                        {v.status_type_name}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        {/* Modal */}
        <div
          className='modal fade'
          id='details'
          tabIndex={-1}
          aria-labelledby='adModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='yellow-alert pixel-border-yellow'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5 fw-bold' id='adModalLabel'>
                  訂單編號 {selectedCoupon?.order_id}
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                <div
                  className={`${styles.inOffset} row text-white text-center d-bg-purple p-3`}
                >
                  <div className='col'>訂單編號</div>
                  <div className='col'>訂單日期</div>
                  <div className='col'>消費金額</div>
                  <div className='col'>付款方式</div>
                  <div className='col'>訂單狀態</div>
                </div>
                <div className='pt-3'>
                  <div
                    className={`${styles.coupon_cart_item_body} ${styles.coupon_orderWidth} row text-center d-flex align-items-center`}
                  >
                    <div className='col'>{selectedCoupon?.order_id}</div>
                    <div className='col'>{selectedCoupon?.use_time}</div>
                    <div className='col'>${selectedCoupon?.total}</div>
                    <div className='col'>{selectedCoupon?.pay_name}</div>
                    <div className='col'>
                      {selectedCoupon?.order_status_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
