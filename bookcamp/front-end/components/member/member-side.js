import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import { useRouter } from 'next/router'
import useFirebase from '@/hooks/use-firebase'
import { useAvatar } from '@/hooks/avatarContext'

export default function MemberSide() {
  const { setAuthJWT, authJWT } = useAuthJWT()
  const router = useRouter()
  const { logoutFirebase } = useFirebase()
  // console.log(authJWT)
  const { avatar } = useAvatar()

  const handleLogout = async () => {
    // firebase logout(注意，並不會登出google帳號)
    logoutFirebase()
    localStorage.removeItem('birthdayNotified');

    const res = await axios.post(
      'http://localhost:3002/member/auth-jwt/logout',
      {},
      {
        withCredentials: true, // save cookie in browser
      },
    )

    // console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
          avatar: '',
        },
      })
    }
    // window.alert('已登出，返回首頁')
    router.push('/')
  }

  return (
    <>
      <aside className='management-block'>
        {/* 會員資訊 */}
        <div className='member-information'>
          <figure className='round-avatar'>
            {/* <img
              src='/img/test/1000_F_543133978_1yU08gMOtkUPq1zcepCEoc4d4dBcYdyL.png'
              width='100%'
              alt=''
            /> */}
            {avatar === null ? (
              <img
                src={`http://localhost:3002/public/img/member/default.png`}
                alt='avatar'
                width='100%'
              />
            ) : (
              <Link href='/member'>
                <img
                  src={`http://localhost:3002/public/img/member/${avatar}`}
                  alt='avatar'
                  width='100%'
                />
              </Link>
            )}
          </figure>
          <div className='d-flex flex-wrap align-items-center ms-2'>
            <div className='fw-bold me-2'>{authJWT.userData.client_name}</div>
            {/* 是會員給會員 是管理給管理 */}
            {authJWT.userData.client_level === 'root' ? (
              <span className='fw-bold font-s'>歡迎回到管理中心</span>
            ) : (
              <span className='fw-bold font-s'>歡迎回到會員中心</span>
            )}
            {/* <span className='fw-bold font-s'>歡迎回到會員中心</span> */}
          </div>
        </div>
        {/* 功能管理區 */}
        <div className='member-options' id='accordion'>
          {/* 判斷是否是管理者 */}
          {authJWT.userData.client_level === 'root' ? (
            <button
              className='member-main-btn pixel-purple c-bg-purple'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse3'
              aria-expanded='false'
              aria-controls='collapse3'
            >
              管理者中心
              <i className='fa-solid fa-caret-down'></i>
            </button>
          ) : null}
          <div
            className='collapse w-100'
            id='collapse3'
            data-bs-parent='#accordion'
          >
            <div className='card card-body member-details'>
              <ul>
                <li>
                  <Link href='/member/seller/Mycommodity'>商品管理</Link>
                </li>
                <li>
                  <Link href='/member/seller/add_product'>商品新增</Link>
                </li>
                {/* <li>
                  <Link href='/member/seller/ad-record'>廣告紀錄</Link>
                </li> */}
              </ul>
            </div>
          </div>
          {/* 判斷是否是管理者 是則不顯示下面 */}
          {authJWT.userData.client_level !== 'root' ? (
            <>
              <button
                className='member-main-btn pixel-purple c-bg-purple'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapse'
                aria-expanded='false'
                aria-controls='collapse'
              >
                會員資訊
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
                      <Link href='/member/update'>修改資料</Link>
                    </li>
                    <li>
                      <Link href='/member/reset-password'>修改密碼</Link>
                    </li>
                    <li>
                      <Link href='/member/mycollect'>我的收藏</Link>
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
                消費紀錄
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
                      <Link href='/member/order'>訂單紀錄</Link>
                    </li>
                    <li>
                      <Link href='/member/point-record'>點數查詢</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <button
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
                      <Link href='/member/coupon/coupon-record'>
                        優惠券紀錄
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 判斷是否是管理者 */}
              {authJWT.userData.client_level === 'root' ? (
                <button
                  className='member-main-btn pixel-purple c-bg-purple'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapse3'
                  aria-expanded='false'
                  aria-controls='collapse3'
                >
                  管理者中心
                  <i className='fa-solid fa-caret-down'></i>
                </button>
              ) : null}

              <div
                className='collapse w-100'
                id='collapse3'
                data-bs-parent='#accordion'
              >
                <div className='card card-body member-details'>
                  <ul>
                    <li>
                      <Link href='/member/seller/Mycommodity'>商品管理</Link>
                    </li>
                    <li>
                      <Link href='/member/seller/add_product'>商品新增</Link>
                    </li>
                    {/* <li>
                  <Link href='/member/seller/ad-record'>廣告紀錄</Link>
                </li> */}
                  </ul>
                </div>
              </div>
              <button
                className='member-main-btn pixel-purple c-bg-purple'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapse4'
                aria-expanded='false'
                aria-controls='collapse4'
              >
                文章資訊
                <i className='fa-solid fa-caret-down'></i>
              </button>
              <div
                className='collapse w-100'
                id='collapse4'
                data-bs-parent='#accordion'
              >
                <div className='card card-body member-details'>
                  <ul>
                    <li>
                      <Link href='/member/forum/forum-user-post'>我的文章</Link>
                    </li>
                    <li>
                      <Link href='/member/forum/forum-collect'>收藏文章</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className='footer mt-auto'>
          {/* 登出按鍵 */}
          {/* <button
            className='pixel-border-yellow m-bg-yellow w-100 fw-bold py-1'
            type='button'
          >
            登出
          </button> */}

          <button
            className='pixel-border-yellow m-bg-yellow w-100 fw-bold py-1'
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
      </aside>
    </>
  )
}
