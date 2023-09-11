import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/components/member/coupon/member-coupon.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Swal from 'sweetalert2'

export default function CouponUnused({
  setCartCoupon,
  coupons,
  setCoupons,
  amount,
}) {
  const router = useRouter()
  const couponUse = router.pathname

  // 抓到當前登入的會員
  const { authJWT } = useAuthJWT()
  const client_id = authJWT.userData.client_id
  const [selectCouponId, setSelectCouponId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        let param = {
          client_id: client_id, // 到時要換成實際的會員id
        }
        const response = await axios.post(
          `http://localhost:3002/coupon/received`,
          param,
        )
        setCoupons(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [client_id])

  // 點擊使用後購物車抓到此張COUPON_ID
  const handleCartCoupon = (e, minPoint) => {
    if (amount >= minPoint) {
      let id = e.currentTarget.value
      setCartCoupon(id)
    } else {
    }
  }

  // 彈出尚未達成標準視窗
  const handleLinkClick = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '尚未符合使用資格',
      showCancelButton: false, // 不显示取消按钮
      showConfirmButton: true, // 显示确认按钮
      timer: 2000, // 警告框自动关闭时间（以毫秒为单位）
    })
  }

  return (
    <>
      <div
        className={`row ${
          couponUse === '/cart' ? styles.cartCouponBody : 'mt-4'
        }`}
      >
        {coupons && coupons.length > 0 ? (
          coupons.map((v) => {
            return (
              <>
                <div
                  className={`col-12 ${
                    couponUse === '/cart' ? '' : 'col-lg-6'
                  }`}
                  key={v.coupon_record_id}
                >
                  <div
                    className={`${styles.coupon} ${
                      selectCouponId == '' || selectCouponId == v.coupon_id
                        ? ''
                        : styles.unavailable
                    } flex-md-row pixel-box--white bg-white`}
                  >
                    <div className='d-flex w-100'>
                      {couponUse === '/cart' ? (
                        <button
                          className={`${styles.couponName} col-6 ${
                            styles.couponUseBtn
                          } ${
                            selectCouponId === v.coupon_id &&
                            amount >= v.min_point
                              ? styles.unavailable
                              : ''
                          }`}
                          value={v.coupon_id}
                          onClick={(e) => {
                            if (amount < v.min_point) {
                              handleLinkClick(e)
                            } else {
                              setSelectCouponId(e.currentTarget.value)
                              handleCartCoupon(e, v.min_point)
                            }
                          }}
                        >
                          <div className={styles.couponUseBtnText}>
                            {selectCouponId == v.coupon_id ? '套用' : '使用'}
                          </div>
                        </button>
                      ) : (
                        <Link
                          href={
                            v.use_type === 0
                              ? '/'
                              : v.use_type === 1
                              ? `/newbook?b_genre_id=${v.b_genre_id}`
                              : `/newbook/${v.book_id}`
                          }
                          className={`${styles.couponName} col-6 ${
                            v.use_type === 0
                              ? 'c-bg-purple'
                              : v.use_type === 1
                              ? 'br-bg-pink'
                              : ''
                          }`}
                        >
                          {v.use_type === 0 ? (
                            <i className='fa-solid fa-gift mb-4 font-xl'></i>
                          ) : v.use_type === 1 ? (
                            <i className='fa-solid fa-book mb-4 font-xl'></i>
                          ) : (
                            <img
                              className={styles.commodityImg}
                              src={`http://localhost:3002/public/img/oldbookimgs/${v.book_img_id}`}
                              alt='Commodity'
                            />
                          )}
                          <span className='font-s'>前往使用</span>
                        </Link>
                      )}
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
          })
        ) : (
          <h6 className='text-center text-white py-5 d-bg-purple rounded-3'>
            目前尚無優惠券
          </h6>
        )}
      </div>
    </>
  )
}
