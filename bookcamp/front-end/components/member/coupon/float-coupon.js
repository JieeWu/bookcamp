import { useState, useEffect } from 'react'
import styles from '@/components/member/coupon/float-coupon.module.css'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '../../../hooks/use-auth-jwt'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function FloatCoupon() {
  const { authJWT, setAuthJWT } = useAuthJWT()
  const [showSlide, setShowSlide] = useState(false)
  const pageLocation = usePathname()
  const [getCoupon, setGetCoupon] = useState('')
  const [claimedCoupons, setClaimedCoupons] = useState([])

  const router = useRouter()
  // 這裡開始
  // 領取重新渲染
  const handleCouponClaim = async (coupon) => {
    const updatedCoupons = getCoupon.map((c) =>
      c.coupon_id === coupon.coupon_id ? { ...c, is_owned: true } : c,
    )

    setGetCoupon(updatedCoupons)

    try {
      await axios
        .post(
          'http://localhost:3002/coupon/record/create',
          {
            client_id: authJWT.userData.client_id,
            coupon_id: coupon.coupon_id,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((res) => {
          if (res.data !== 'success') {
            Swal.fire({
              icon: 'success',
              title: '你已領取優惠卷！！',
            })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  //取得所有可領取優惠券
  useEffect(() => {
    const getCoupon = async () => {
      try {
        let response

        if (authJWT.isAuth !== false) {
          response = await axios.get(
            'http://localhost:3002/coupon/frontCoupon',
            {
              withCredentials: true,
            },
          )
        } else {
          response = await axios.post(
            'http://localhost:3002/coupon/nologin-list',
          )
        }

        const data = response.data
        setGetCoupon(data)
      } catch (error) {
        console.log(error)
      }
    }

    getCoupon()
  }, [authJWT.isAuth])
  // 這裡結束

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1080) {
        setShowSlide(true)
      } else {
        setShowSlide(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // 清除事件監聽
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 請先登入
  const handleLinkClick = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '請先登入',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }

  return (
    <>
      <div
        className={`${
          pageLocation.indexOf('newbook') < 0
            ? `${styles.floatCoupon} ${showSlide ? styles.active : ''}`
            : `${styles.pageCouponBlock}`
        }`}
      >
        <h4 className={styles.floatCouponTitle}>好康優惠</h4>
        <div className={styles.floatCouponShadow}>
          <div className={styles.frameDecorationTop}></div>
          <div className={styles.floatCouponBlock}>
            {/* 從這裡開始 */}
            {getCoupon.length > 0 ? (
              getCoupon.map((v) => {
                return (
                  <div
                    key={v.coupon_id}
                    className={`${styles.couponBody} boder-pixel`}
                  >
                    <div
                      className={`${styles.couponInformation} boder-pixel-w`}
                    >
                      <span>{v.coupon_name}</span>
                      {v.discount > 1 ? (
                        <h5 className='text-yellow'>
                          {Math.ceil(v.discount)}元
                        </h5>
                      ) : (
                        <h5 className='text-yellow'>
                          {v.discount
                            .toString()
                            .split('.')[1]
                            .replace(/^(d*?[1-9])0+$/, '$1')}
                          折
                        </h5>
                      )}
                    </div>
                    {authJWT.isAuth !== false ? (
                      v.is_owned ? (
                        <div className={`${styles.usedState} mt-auto`}>
                          已領取
                        </div>
                      ) : (
                        <button
                          onClick={() => handleCouponClaim(v)}
                          className='mt-auto pixel-border-purple'
                        >
                          領取
                        </button>
                      )
                    ) : (
                      <Link
                        href='#'
                        onClick={(e) => {
                          handleLinkClick(e)
                        }}
                        className='mt-auto pixel-border-purple'
                      >
                        登入領
                      </Link>
                    )}
                  </div>
                )
              })
            ) : (
              <h5 className='text-yellow'>已全部領取</h5>
            )}

            {/* 從這裡結束 */}
          </div>
          <div className={styles.frameDecorationBottom}></div>
        </div>
        {authJWT.isAuth !== false ? (
          <Link href='/member/coupon/coupon' className={styles.CMoreBtn}>
            <span>
              查看更多
              <div className='ms-2'>
                <i className='fa-solid fa-caret-right arrow-one'></i>
                <i className='fa-solid fa-caret-right arrow-two'></i>
                <i className='fa-solid fa-caret-right arrow-three'></i>
              </div>
            </span>
          </Link>
        ) : (
          <Link
            href='#'
            onClick={(e) => {
              handleLinkClick(e)
            }}
            className={styles.CMoreBtn}
          >
            <span>
              查看更多
              <div className='ms-2'>
                <i className='fa-solid fa-caret-right arrow-one'></i>
                <i className='fa-solid fa-caret-right arrow-two'></i>
                <i className='fa-solid fa-caret-right arrow-three'></i>
              </div>
            </span>
          </Link>
        )}
      </div>
    </>
  )
}
