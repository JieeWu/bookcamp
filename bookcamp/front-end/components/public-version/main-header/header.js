import React, { useState, useEffect, useContext } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 取得jwt的會員認證狀態
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { useCollect } from '@/hooks/collectContext'
import { CartContext } from '@/hooks/cartContext'
import { useAvatar } from '@/hooks/avatarContext'
import useFirebase from '@/hooks/use-firebase'

import IsLoggedIn from '@/components/isLoggedIn'
import IsLoggedInCart from '@/components/isLoggedIn-cart'

export default function MainHeader() {
  const { authJWT, setAuthJWT } = useAuthJWT() // 取得jwt的會員認證狀態
  const { avatar, setAvatar } = useAvatar()
  const router = useRouter()
  const [user, setUser] = useState([])
  const { logoutFirebase } = useFirebase()

  // 購物車狀態
  const { cartItem, setCartItem } = CartContext()
  // 收藏狀態
  const { collect, setCollect } = useCollect()

  // 登入按鈕滑入顯示
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleLogout = async () => {
    logoutFirebase()
    localStorage.removeItem('birthdayNotified')

    const res = await axios.post(
      'http://localhost:3002/member/auth-jwt/logout',
      {},
      {
        withCredentials: true, // save cookie in browser
      },
    )

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
      setCartItem([])
      setCollect([])
    }
    router.push('/')
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        if (authJWT.userData && authJWT.userData.client_id) {
          const response = await axios.get(
            `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
          )
          setAvatar(response.data.avatar)
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchAvatar()
  }, [authJWT, setAvatar])

  return (
    <>
      <div className='header-group'>
        <div className='logo-div'>
          <Link href='/'>
            <img src='/img/logo.jpg' alt='logo' width='100%' />
          </Link>
        </div>
        <div className='header-btn-group'>
          <IsLoggedIn
            href='/customerservice'
            icon='fa-solid fa-headphones-simple'
          />
          <IsLoggedIn
            href='/member/mycollect'
            icon='fa-solid fa-heart'
            color='#ff245b'
          />
          <IsLoggedInCart href='/cart' icon='fa-solid fa-cart-shopping' />

          <div className='d-flex flex-column position-relative'>
            {authJWT.isAuth ? (
              <Link
                href='/member/'
                className='main-btn pixel-border-yellow-s login-btn d-md-flex p-0'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className='px-3'>歡迎!</span>

                <div className='header-member-avatar m-0'>
                  {avatar === null ? (
                    <img
                      src={`http://localhost:3002/public/img/member/default.png`}
                      alt='avatar'
                    />
                  ) : (
                    <img
                      src={`http://localhost:3002/public/img/member/${avatar}`}
                      alt='avatar'
                    />
                  )}
                </div>
              </Link>
            ) : (
              <Link
                href='/member/login'
                className='main-btn pixel-border-yellow-s login-btn d-md-block'
              >
                登入/註冊
              </Link>
            )}
            <div
              className={`loginbtn-optionblock ${
                isHovered ? 'd-block' : 'd-none'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ul className='w-auto'>
                <li>
                  {authJWT.userData.client_level === 'root' ? (
                    <Link
                      className='pixel-border-yellow-s'
                      href='/member/seller/Mycommodity'
                    >
                      管理中心
                    </Link>
                  ) : (
                    <Link className='pixel-border-yellow-s' href='/member/'>
                      會員中心
                    </Link>
                  )}
                  {/* <Link className='pixel-border-yellow-s' href='/member/'>
                    會員中心
                  </Link> */}
                </li>
                <li>
                  <button
                    className='pixel-border-yellow-s'
                    onClick={handleLogout}
                  >
                    登出
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
