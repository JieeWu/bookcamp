import { useState, useEffect } from 'react'
import axios from 'axios'
// countdown use
import useInterval from '@/hooks/use-interval'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  // countdown use
  const [count, setCount] = useState(10) // 60s
  const [delay, setDelay] = useState(null) // delay=null to stop, delay=1000 to start

  // countdown use
  useInterval(() => {
    setCount(count - 1)
  }, delay)

  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
    }
  }, [count])

  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s內無法重新獲得驗證碼')
      return
    }

    const res = await axios.post(
      'http://localhost:3002/member/reset-password/otp',
      {
        email,
      },
    )

    console.log(res.data)
    if (res.data.message === 'fail') {
      setMessage('驗證碼取得失敗，請確認Email是否已經註冊。')
    }

    if (res.data.message === 'email sent') {
      setMessage('驗證碼已寄送到你填寫的Email信箱中。')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
  }

  const resetPassword = async () => {
    const res = await axios.post(
      'http://localhost:3002/member/reset-password/reset',
      {
        email,
        token,
        password,
      },
    )

    if (res.data.message === 'success') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '密碼修改成功',
        timer: 1500,
      }).then(() => {
        router.push('/')
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '密碼修改失敗',
      })
    }
    console.log(res.data)
  }
  return (
    <>
      <div className='row forget-block'>
        <div className='col-12 login-main-block'>
          <div className='d-flex flex-column pixel-border-yellow py-4 px-5'>
            <div className='login-header'>
              <div className='d-flex align-items-center me-auto'>
                <i className='fa-solid fa-key me-2'></i>
                <h4>忘記密碼</h4>
                <span>
                  <button
                    onClick={() => {
                      setEmail('bookdemo134@gmail.com')
                    }}
                  >
                    DEMO
                  </button>
                </span>
              </div>
            </div>
            {message && (
              <h5
                style={{ color: 'red' }}
                className='d-flex justify-content-center align-item-center '
              >
                {message}
              </h5>
            )}
            <div className='login-input align-items-center mt-4'>
              <label className='me-3 text-nowrap' htmlFor='email'>
                信&ensp;&ensp;箱
              </label>
              <div className='input-group flex-nowrap' data-bs-theme='dark'>
                <input
                  type='text'
                  id='email'
                  className='form-control'
                  placeholder='電子郵件地址'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                onClick={getOtp}
                className='pixel-border-orange-s get-vcode'
              >
                <i className='fa-solid fa-circle-check me-2'></i>
                {delay ? count + '秒後可以再次取得驗證碼' : '取得驗證碼'}
              </button>
            </div>
            <div className='login-input align-items-center mt-4'>
              <label className='me-3 text-nowrap' htmlFor='verification_code'>
                驗證碼
              </label>
              <div className='input-group flex-nowrap' data-bs-theme='dark'>
                <input
                  type='text'
                  id='verification_code'
                  className='form-control'
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            </div>
            <div className='login-input align-items-center mt-4'>
              <label className='me-3 text-nowrap' htmlFor='new_password'>
                新密碼
              </label>
              <div className='input-group flex-nowrap' data-bs-theme='dark'>
                <input
                  type='password'
                  id='new_password'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={resetPassword}
              className='col-8 mx-auto pixel-border-purple reset-btn mt-5 mb-2'
            >
              重設密碼
            </button>
            <span className='font-s text-black fw-bold mt-3'>
              透過使用本網站的忘記密碼功能，您同意遵守條款和條件。
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
