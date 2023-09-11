// New login
import React, { useState } from 'react'
import DetailBtn from '@/components/share/detail-btn'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import LineLogo from '@/components/icons/line-logo'
import GoogleLogo from '@/components/icons/google-logo'
import FacebookLogo from '@/components/icons/facebook-logo'
import Swal from 'sweetalert2'

export default function UserTestJWT() {
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const { setAuthJWT, authJWT } = useAuthJWT()

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  return (
    <>
      <div className='row login-block'>
        <div className='col-12 login-main-block'>
          <div className='pixel-border-yellow py-4 px-5'>
            <div className='login-header'>
              <div className='d-flex align-items-center me-auto'>
                <i className='fa-solid fa-right-to-bracket font-m me-2'></i>
                <h4>會員登入</h4>
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
              <label className='me-3 pt-2' htmlFor='email'>
                Email
              </label>
              <div className='w-100'>
                <div className='input-group flex-nowrap' data-bs-theme='dark'>
                  <input
                    type='email'
                    id='email'
                    className='form-control'
                    placeholder='電子郵件地址'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={`error my-2 text-start`}>
                  請輸入有效的電子郵件地址。
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
                    onChange={(e) => setPasswd(e.target.value)}
                  />
                  <Link href='/member/forget-password' className='font-sm ms-3'>
                    忘記密碼？
                  </Link>
                </div>
                <div className='d-flex align-items-center'>
                  <div className={`error my-2 text-start`}>請輸入密碼。</div>
                </div>
              </div>
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
                  保持登入狀態
                </label>
              </div>
            </div>
            <div className='d-flex fw-bold mt-4'>
              <button
                className='col pixel-border-purple login-next'
                onClick={async () => {
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

                  // console.log(res.data)
                  // console.log(parseJwt(res.data.accessToken))

                  if (res.data.message === 'success') {
                    setAuthJWT({
                      isAuth: true,
                      userData: parseJwt(res.data.accessToken),
                    })
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: '登入成功',
                      timer: 1500,
                    }).then((res) => {
                      window.location.href = '/'
                    })
                  }
                  if (res.data.message === 'fail') {
                    window.alert('帳號或密碼錯誤')
                  }
                }}
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
              如登入，即代表同意本站
              <Link href='/about'>隱私權政策</Link>和
              <Link href='/about'>使用條款</Link>。
            </div>
          </div>
          <div className='quick-login-block boder-pixel'>
            <div className='quick-login mb-3'>快速登入</div>
            <div className='row mb-2'>
              <div className='col-sm-12 text-start'>
                <div className='d-flex justify-content-center'>
                  <LineLogo className='mx-3' />
                  <GoogleLogo className='mx-3' />
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
          <div className='decorative-color-block-br-purple'></div>
          <div className='decorative-color-block-neon2'>
            <span>享受生活</span>
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
          <div className='decorative-color-block-br-pink'>
            <div className='decorative-color-block-br-pink-in'>
              <div className='d-flex w-100 justify-content-between'>
                <div className='shap-basic shape8'></div>
                <div className='shap-basic shape9'></div>
              </div>
              <div className='d-flex w-100 justify-content-between'>
                <div className='shap-basic shape6'></div>
                <div className='shap-basic shape7'></div>
              </div>
            </div>
          </div>
          <div className='decorative-color-block-neon'>
            <span>
              歡迎
              <br />
              加入
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
