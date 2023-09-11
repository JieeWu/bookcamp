// New login
import React, { useState, useEffect } from 'react'
import DetailBtn from '@/components/share/detail-btn'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import LineLogo from '@/components/icons/line-logo'
import GoogleLogo from '@/components/icons/google-logo'
import FacebookLogo from '@/components/icons/facebook-logo'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import useFirebase from '@/hooks/use-firebase'

export default function UserTestJWT() {
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const [error, setError] = useState('')
  const { setAuthJWT, authJWT } = useAuthJWT()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { loginGoogleRedirect, initApp } = useFirebase()

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (authJWT.isAuth) return

    const res = await axios.post(
      'http://localhost:3002/member/google-login/jwt',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      },
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: parseJwt(res.data.accessToken),
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '登入成功',
        timer: 1000,
      }).then(() => {
        router.push('/')
      })
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

  const handleLogin = async () => {
    setError('')

    if (!email) {
      setError('帳號不能為空')
      return
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!emailPattern.test(email)) {
      setError('請輸入有效的email格式')
      return
    }

    if (!passwd) {
      setError('密碼不能為空')
      return
    }

    try {
      const res = await axios.post(
        'http://localhost:3002/member/auth-jwt/login',
        {
          email: email,
          passwd: passwd,
        },
        {
          withCredentials: true, // save cookie in browser
        },
      )

      if (res.data.message === 'success') {
        setAuthJWT({
          isAuth: true,
          userData: parseJwt(res.data.accessToken),
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '登入成功',
          timer: 1000,
        }).then(() => {
          router.push('/')
        })
      } else if (res.data.message === 'fail') {
        setError('帳號或密碼錯誤')
      }
    } catch (error) {
      console.error('登入錯誤', error)
      setError('發生錯誤，請稍後再試')
    }
  }

  // 每個人的快速登入
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value
    if (selectedValue === '1') {
      setEmail('bookdemo134@gmail.com')
      setPasswd('123123')
    } else if (selectedValue === '2') {
      setEmail('user33@test.com')
      setPasswd('123123')
    } else if (selectedValue === '3') {
     setEmail('root@test.com')
    }
  }

  // 以下為 LINE 登入相關
  // 處理登出
  const lineLogout = async () => {
    if (!authJWT.isAuth) return
    if (!authJWT.userData.line_uid) return

    const line_uid = authJWT.userData.line_uid

    const res = await axios.get(
      `http://localhost:3002/member/line-login/logout?line_uid=${line_uid}`,
      {
        withCredentials: true, // 注意: 必要的
      },
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
        },
      })
    }
  }

  // 處理line登入後，要向伺服器進行登入動作
  const callbackLineLogin = async (cUrl) => {
    const res = await axios.get(cUrl, {
      withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
    })

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: parseJwt(res.data.accessToken), // jwt use
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '登入成功',
        timer: 1000,
      }).then(() => {
        router.push('/')
      })
    } else {
      console.log('login fail or not from login page')
    }
  }

  // 處理登入
  const goLineLogin = async () => {
    // 向後端(express/node)伺服器要求line登入的網址
    const res = await axios.get(
      'http://localhost:3002/member/line-login/login',
      {
        withCredentials: true,
      },
    )
    console.log(res.data.url)
    // 重定向到line 登入頁
    if (res.data.url) window.location.href = res.data.url
  }

  // 從line登入畫面後回調到本頁面用
  useEffect(() => {
    // 水合作用(hydration)保護，以免得不到window全域物件
    if (router.isReady) {
      // 判斷是否有query.code(網址上沒有code是進登入頁的時候)
      if (!router.query.code) return

      const qs = new URLSearchParams({
        ...router.query,
      }).toString()

      const cbUrl = `http://localhost:3002/member/line-login/callback?${qs}`

      // 發送至後端伺服器得到line會員資料
      callbackLineLogin(cbUrl)
    }
    // eslint-disable-next-line
  }, [router.isReady, router.query])

  return (
    <>
      <div className='row login-block'>
        <div className='col-12 login-main-block'>
          <div className='pixel-border-yellow py-4 px-5'>
            <div className='login-header'>
              <div className='d-flex align-items-center me-auto'>
                <i className='fa-solid fa-right-to-bracket font-m me-2'></i>
                <h4 className='text-nowrap'>會員登入</h4>
                <select
                  className='form-select form-select-sm ms-3'
                  data-bs-theme='dark'
                  onChange={handleOptionChange}
                >
                  <option selected>快速登入</option>
                  <option value='1'>會員功能測試帳密</option>
                  <option value='2'>優惠券功能測試帳密</option>
                  <option value='3'>管理者</option>
                </select>
              </div>
              {/* 協助按鈕 */}
              <button
                type='button'
                className='font-sm'
                data-bs-toggle='modal'
                data-bs-target='#adModal'
              >
                <i className='fa-solid fa-circle-question me-2'></i>
                協助 ?
              </button>
              {/* Modal */}
              <div
                className='modal fade'
                id='adModal'
                tabIndex={-1}
                aria-labelledby='adModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-dialog-centered text-black'>
                  <div className='yellow-alert pixel-border-yellow'>
                    <div className='modal-header'>
                      <h4
                        className='modal-title fs-5 fw-bold'
                        id='adModalLabel'
                      >
                        如何加入書營 ?
                      </h4>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      />
                    </div>
                    <div className='modal-body'>***</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='login-input mt-4 mb-3'>
              <label className='me-3 pt-2 text-nowrap' htmlFor='email'>
                信箱
              </label>
              <div className='w-100'>
                <div className='input-group flex-nowrap' data-bs-theme='dark'>
                  <input
                    type='text'
                    id='email'
                    className='form-control'
                    placeholder='電子郵件地址'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin()
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='login-input mb-1'>
              <label className='me-3 pt-2 text-nowrap' htmlFor='password'>
                密碼
              </label>
              <div className='w-100'>
                <div
                  className='input-group flex-nowrap align-items-center'
                  data-bs-theme='dark'
                >
                  <input
                    type='password'
                    id='password'
                    className='form-control rounded-2'
                    placeholder='密碼'
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin()
                      }
                    }}
                  />
                  <Link href='/member/forget-password' className='font-sm ms-3'>
                    忘記密碼？
                  </Link>
                </div>
              </div>
            </div>
            {/* 錯誤訊息 */}
            <div className='text-danger text-start mt-2'>
              <strong>{error}</strong>
            </div>
            <div className='d-flex text-start'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='gridCheck1'
                />
                <label
                  className='form-check-label font-sm text-d-purple fw-bold'
                  htmlFor='gridCheck1'
                >
                  記住我
                </label>
              </div>
            </div>
            <div className='d-flex fw-bold mt-4'>
              <button
                className='col pixel-border-purple login-next'
                onClick={handleLogin}
              >
                登入
              </button>
              <Link
                className='col pixel-border-orange sign-up'
                href='/member/register'
              >
                還不是會員？ 立即註冊!
              </Link>
            </div>
            <div className='terms-of-use font-sm text-d-purple'>
              如登入，即代表同意本站隱私權政策和使用條款。
            </div>
          </div>
          <div className='quick-login-block boder-pixel'>
            <div className='quick-login mb-3'>快速登入</div>
            <div className='row mb-2'>
              <div className='col-sm-12 text-start'>
                <div className='d-flex justify-content-center'>
                  <button onClick={goLineLogin}>
                    <LineLogo className='mx-3' />
                  </button>
                  <button onClick={() => loginGoogleRedirect()}>
                    <GoogleLogo className='mx-3' />
                  </button>
                  <FacebookLogo className='mx-3' />
                </div>
              </div>
            </div>
          </div>
          <div className='decorative-color-block-purple'>
            <div className='decorative-color-block-purple-in'>
              <img src='http://localhost:3002/public/img/書營標準字.png' />
            </div>
          </div>
          <div className='decorative-color-block-pink'>
            <div className='decorative-color-block-pink-in'>
              <h4 className='mb-3 pixel-font-chinese'>歡迎來書營</h4>
              <span>
                瀏覽無盡知識海洋，盡在書營。尋找、閱讀、啟發，一站滿足您的閱讀渴望！
              </span>
            </div>
          </div>
          <div className='decorative-color-block-c-purple'>
            <div className='decorative-color-block-c-purple-in'></div>
          </div>
        </div>
      </div>
    </>
  )
}
