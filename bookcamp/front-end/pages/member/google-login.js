// google 重定向
import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import GoogleLogo from '@/components/icons/google-logo'
import { useEffect } from 'react'



export default function GoogleLoginJWT() {

  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { logoutFirebase, loginGoogleRedirect, initApp } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(123, providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (authJWT.isAuth) return

    const res = await axios.post(
      'http://localhost:3002/member/google-login/jwt',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      },
    )

    console.log(42,res.data)

    if (res.data.message === 'success') {
     

      setAuthJWT({
        isAuth: true,
        userData: parseJwt(res.data.accessToken),
      })
      console.log(123,authJWT)
    } else {
      alert('有錯誤')
    }
  }

  const checkLogin = async () => {
    const res = await axios.get(
      'http://localhost:3002/member/auth-jwt/check-login',
      {
        withCredentials: true, // 從瀏覽器獲取cookie
      },
    )

    console.log(res.data)
  }

  const logout = async () => {
    // firebase logout(注意，並不會登出google帳號)
    logoutFirebase()

    // 伺服器logout
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
    }
  }

  return (
    <>
      <h1>google-login重定向測試頁(JWT)</h1>
      <p>會員狀態:{authJWT.isAuth ? '已登入' : '未登入'}</p>
      <button onClick={() => loginGoogleRedirect()}>
        <GoogleLogo /> 用google登入(重定向)
      </button>
      <br />
      <button onClick={logout}>登出</button>
      <br />
      <button onClick={checkLogin}>向伺服器檢查登入狀態</button>
      <hr />
    </>
  )
}
