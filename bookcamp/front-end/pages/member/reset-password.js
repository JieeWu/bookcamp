import { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function ResetPassword() {
  const [status, setStatus] = useState(false)
  const { authJWT, setAuthJWT } = useAuthJWT() // 取得jwt的會員認證狀態
  const router = useRouter()

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(await checkForm())) {
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:3002/member/users/reset-password/${authJWT.userData.client_id}`,
        formData,
      )
      console.log(response.data)

      if (response.data.message === 'success') {
        const successResult = await Swal.fire({
          position: 'center',
          icon: 'success', // 修改為 'success' 來顯示成功的提示
          title: '密碼修改成功',
        })

        // 如果用戶點擊"確定"按鈕
        if (successResult.isConfirmed) {
          // 清空表單
          setFormData({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          })

          const res = await axios.post(
            'http://localhost:3002/member/auth-jwt/logout',
            {},
            {
              withCredentials: true, // save cookie in browser
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

          router.push('/')
        }
      } else {
        await Swal.fire({
          position: 'center',
          icon: 'error',
          title: '修改密碼失敗',
        })
      }
    } catch (error) {
      console.log(error.message)
      await Swal.fire({
        position: 'center',
        icon: 'error',
        title: '發生錯誤，請稍後再試',
      })
    }
  }

  const checkForm = async () => {
    if (formData.oldPassword === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請輸入您的密碼!',
      })
      return false
    }

    if (!checkPasswd(formData.newPassword, formData.confirmNewPassword)) {
      return false
    }

    const result = await Swal.fire({
      title: '確定要送出嗎？',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    })

    return result.isConfirmed
  }

  const checkPasswd = (password1, password2) => {
    if (password1 === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請輸入您的新密碼!',
      })
      return false
    }

    if (password1.length < 5 || password1.length > 20) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '密碼長度只能5到20個字母與數字 !',
      })
      return false
    }

    if (password1 !== password2) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '密碼二次輸入不一樣,請重新輸入 !',
      })
      return false
    }

    return true
  }

  if (!authJWT.isAuth) {
    return (
      <>
        <div className='mt-5 not-login'>
          <div className='not-login-img'>
            <img src='/img/dead.png' className='w-100' />
          </div>
          {/* <div className='my-2'>您尚未登入會員喔</div> */}
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
              <Breadcrumb2 />
              <MemberMiddle
                TitleIcon='fa-solid fa-user me-2'
                TitleName='修改密碼'
                setStatus={setStatus}
                status={status}
              >
                {/* 重設密碼表單 */}
                <div className='row'>
                  <div className='col-6'>
                    <form
                      className='d-flex flex-column p-5 text-white'
                      onSubmit={handleSubmit}
                    >
                      <div className='mb-3'>
                        <div className='fix-data-file'>
                          <label htmlFor='oldPassword'>
                            <i className='fa-solid fa-lock me-2'></i>舊密碼
                          </label>
                          <input
                            placeholder='舊密碼'
                            name='oldPassword'
                            type='password'
                            id='oldPassword'
                            value={formData.oldPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className='mb-3'>
                        <div className='fix-data-file'>
                          <label htmlFor='newPassword'>
                            <i className='fa-solid fa-key me-2'></i>新密碼
                          </label>
                          <input
                            placeholder='新密碼'
                            name='newPassword'
                            type='password'
                            id='newPassword'
                            value={formData.newPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className='mb-3'>
                        <div className='fix-data-file'>
                          <label htmlFor='confirmNewPassword'>
                            <i className='fa-solid fa-key me-2'></i>確認新密碼
                          </label>
                          <input
                            placeholder='確認新密碼'
                            name='confirmNewPassword'
                            type='password'
                            id='confirmNewPassword'
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <button
                        type='submit'
                        className='all-submit-btn pixel-border-yellow p-2 mx-2 mt-4'
                      >
                        確認修改
                      </button>
                    </form>
                  </div>
                  <div className='col-6'>
                    <div className='password-illustrate boder-pixel'>
                      <h5 className='p-4 pb-0 pixel-font-chinese d-flex align-items-center'>
                        <i className='fa-solid fa-circle-question me-2'></i>
                        變更密碼注意事項
                      </h5>
                      <ul>
                        <li>
                          <i className='fa-solid fa-circle-exclamation me-2'></i>
                          <strong>複雜度：</strong>
                          選擇一個強度足夠的新密碼，包括大小寫字母、數字和特殊符號。避免使用容易猜到的個人資訊，如生日、姓名等。
                        </li>
                        <li>
                          <i className='fa-solid fa-circle-exclamation me-2'></i>
                          <strong>定期更換：</strong>
                          定期變更密碼，建議每三個到六個月進行一次更換，以減少密碼被猜測或盜取的風險。
                        </li>
                        <li>
                          <i className='fa-solid fa-circle-exclamation me-2'></i>
                          <strong>不要共享：</strong>
                          不要將密碼共享給他人，無論是親友還是客服人員。合法的服務提供者不會要求您提供密碼。
                        </li>
                        <li>
                          <i className='fa-solid fa-circle-exclamation me-2'></i>
                          <strong>登出其他設備：</strong>
                          變更密碼後，確保登出之前登入的所有設備，以避免其他人繼續訪問您的帳戶。
                        </li>
                      </ul>
                    </div>
                  </div>
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
