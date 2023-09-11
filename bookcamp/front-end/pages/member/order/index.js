import React, { useState, useEffect } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 要使用jwt的會員認證
import Link from 'next/link'
import MemberSide from '@/components/member/member-side'
import Breadcrumb10 from '@/components/share/guide-pagination10'
import MemberMiddle from '@/components/member/member-middle'
import axios from 'axios'

import UserOrderPage from '@/components/member/order/user-order-page'
import UserOrderPageHeader from '@/components/member/order/user-order-page-header'

import styles from '@/components/cart/css/cart-item.module.css'

export default function MemberOrder() {
  const { authJWT } = useAuthJWT() // 取得jwt的會員認證狀態
  const [order, setOrder] = useState([])
  const [coupon, setCoupon] = useState([])
  const [pay, setPay] = useState([])
  const [status, setStatus] = useState([])

  //抓取資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/member/user-order', {
            withCredentials: true,
          })
          .then((res) => {
            setOrder(res.data.order)
            setStatus(res.data.status)
            setPay(res.data.pay)
            setCoupon(res.data.coupon)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])

  if (!authJWT.isAuth) {
    return (
      <>
        <div className='mt-5 not-login'>
          <div className='not-login-img'>
            <img src='/img/dead.png' className='w-100' />
          </div>
          <Link
            href='/member/login'
            className='px-5 my-5 main-btn pixel-border-yellow-s not-login-text'
            type='button'
          >
            請先登入會員
          </Link>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-2 d-none d-md-flex px-0'>
            <MemberSide />
          </div>
          <div className='col-12 col-md-10 col-xl-8'>
            <div className='mb-5'>
              <Breadcrumb10 crumb10='我的訂單' />
              <MemberMiddle
                TitleIcon='fa-solid fa-user me-2' // 標題icon
                TitleName='我的訂單' // 標題
              >
                <UserOrderPageHeader />
                <div className='pt-3'>
                  {order.map((item) => {
                    return (
                      <UserOrderPage
                        item={item}
                        coupon={coupon}
                        pay={pay}
                        status={status}
                      />
                    )
                  })}
                </div>
              </MemberMiddle>
            </div>
          </div>

          <div className='col d-none d-xl-flex'></div>
        </div>
      </>
    )
  }
}
