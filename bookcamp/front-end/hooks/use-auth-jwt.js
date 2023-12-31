import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContextJWT = createContext(null)

export const AuthProviderJWT = ({ children }) => {
  const [authJWT, setAuthJWT] = useState({
    isAuth: false,
    userData: {
      client_id: 0,
      client_name: '',
      email: '',
      join_date: '',
      client_point: 0,
      client_level:'',
      avatar: '',
    },
  })
  // 註: 如果使用google登入會多幾個欄位(iat, exp是由jwt token來的)
  // {
  //     "id": 8,
  //     "name": "",
  //     "email": "",
  //     "username": null,
  //     "r_date": "",
  //     "google_uid": "109150685961710971645",
  //     "photo_url": "",
  //     "iat": 1691401150,
  //     "exp": 1691487550
  // }

  const router = useRouter()

  // 登入頁路由
  const loginRoute = '/member/login'
  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
  const protectedRoutes = ['/member/login-status-jwt', '/xxxx/xxxx']

  // 檢查會員認證用
  const checkAuth = async () => {
    const res = await axios.get(
      'http://3.113.3.149:3002/member/auth-jwt/check-login',
      {
        withCredentials: true,
      },
    )
    if (res.data.message === 'authorized') {
      setAuthJWT({ isAuth: true, userData: res.data.user })
    }
    // 可以在這裡實作跳轉
    else {
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }
  }

  // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !authJWT.isAuth) {
      checkAuth()
    }
    // 下面加入router.pathname，是為了要在向伺服器檢查後，
    // 如果有比對到是隱私路由，就執行跳轉到登入頁面工作
    // 注意有可能會造成向伺服器要求多次，此為簡單的實作範例
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  return (
    <AuthContextJWT.Provider
      value={{
        authJWT,
        setAuthJWT,
      }}
    >
      {children}
    </AuthContextJWT.Provider>
  )
}

export const useAuthJWT = () => useContext(AuthContextJWT)
