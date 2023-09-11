import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Register = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    passwd: '',
    client_name: '',
    gender: '',
    birthday: '1995-01-01',
    phone: '',
    client_address: '',
  })

  const today = new Date().toISOString().split('T')[0] // 取得今天的日期，格式：YYYY-MM-DD

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'passwd') {
      setFormData((prevData) => ({
        ...prevData,
        passwdrecheck: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(await checkForm())) {
      return
    }

    // 移除不需要的字段，以免传递到后端
    const { passwdrecheck, ...dataToSend } = formData

    console.log(formData)
    try {
      const response = await axios.post(
        'http://localhost:3002/member/users/register',
        dataToSend,
      )
      console.log(response.data)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '註冊成功，即將導向登入頁面。',
      }).then(() => {
        router.push('/')
      })
      // 在這裡可以處理後端回傳的訊息或進行其他操作
    } catch (error) {
      console.log(error.message)
      // 在這裡處理錯誤情況
    }
  }

  const handleReset = () => {
    setFormData({
      email: '',
      passwd: '',
      client_name: '',
      gender: '',
      birthday: '',
      phone: '',
      client_address: '',
    })
  }

  const checkForm = async () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (formData.email === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請填寫您的信箱',
      })
      return false
    }

    if (!emailPattern.test(formData.email)) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請輸入有效的信箱格式',
      })
      return false
    }

    if (!checkPasswd(formData.passwd, formData.passwdrecheck)) {
      return false
    }

    if (formData.client_name === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請填寫您的姓名',
      })
      return false
    }

    if (formData.gender !== '男' && formData.gender !== '女') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請選擇您的性別',
      })
      return false
    }

    if (formData.birthday === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請選擇您的生日',
      })
      return false
    }

    if (formData.phone === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '請填寫您的電話',
      })
      return false
    }
    // return window.confirm('確定要送出嗎？')
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
        title: '密碼不可以空白',
      })
      return false
    }

    if (password1.length < 5 || password1.length > 20) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '密碼只能5到20個英文字母或數字',
      })
      return false
    }

    if (password1 !== password2) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '兩次密碼輸入不一致',
      })
      return false
    }

    return true
  }
  return (
    <>
      <div className='row register-block'>
        <div className='col-12 register-main-block'>
          <div className='pixel-border-yellow py-4 px-5'>
            <div className='register-header'>
              <div className='d-flex align-items-center me-auto'>
                <i className='fa-solid fa-user-plus font-m me-2'></i>
                <h4>加入會員</h4>
                <span>
                  <button
                    onClick={() => {
                      setFormData({
                        email: 'bookdemo134@gmail.com',
                        passwd: '123123',
                        passwdrecheck: '123123',
                        client_name: '尤阿傑',
                        gender: '男',
                        birthday: '1996-09-09',
                        phone: '0988168168',
                        client_address: '高雄市三民區建工路900號',
                      })
                    }}
                  >
                    DEMO
                  </button>
                </span>
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
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='register-input mt-4 mb-3'>
                <label className='me-3 pt-2 text-nowrap' htmlFor='email'>
                  <span className='register-star'>*</span>電子信箱
                </label>
                <div className='w-100'>
                  <div className='input-group flex-nowrap' data-bs-theme='dark'>
                    <input
                      name='email'
                      type='text'
                      id='email'
                      className='form-control'
                      placeholder='電子郵件地址'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`error my-2 text-start`}>
                    請填寫您常用的電子郵件，以便日後寄送通知信件。
                  </div>
                </div>
              </div>
              <div className='register-input my-3'>
                <label className='me-3 pt-2 text-nowrap' htmlFor='passwd'>
                  <span className='register-star'>*</span>使用密碼
                </label>
                <div className='w-100'>
                  <div className='input-group flex-nowrap' data-bs-theme='dark'>
                    <input
                      name='passwd'
                      type='password'
                      id='passwd'
                      className='form-control'
                      placeholder='密碼'
                      value={formData.passwd}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`error my-2 text-start`}>
                    請填入5~20個字元以內的英文字母、數字。
                  </div>
                </div>
              </div>
              <div className='register-input my-3'>
                <label
                  className='me-3 pt-2 text-nowrap'
                  htmlFor='passwdrecheck'
                >
                  <span className='register-star'>*</span>確認密碼
                </label>
                <div className='w-100'>
                  <div className='input-group flex-nowrap' data-bs-theme='dark'>
                    <input
                      name='passwdrecheck'
                      type='password'
                      id='passwdrecheck'
                      className='form-control'
                      placeholder='確認密碼'
                      value={formData.passwdrecheck}
                      onChange={handleChange} // 添加这行
                    />
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center mt-4'>
                <div className='d-flex align-items-center text-black'>
                  <i className='fa-solid fa-tachograph-digital font-m me-2'></i>
                  <h4 className='fw-bold'>個人資料</h4>
                </div>
                <span className='ms-auto pe-3 text-black font-sm fw-bold'>
                  <span className='register-star'>*</span> 表示為必填的欄位
                </span>
              </div>
              <div className='row'>
                <div className='col-6 px-2'>
                  <div className='register-input my-3'>
                    <label
                      className='me-3 pt-2 text-nowrap'
                      htmlFor='client_name'
                    >
                      <span className='register-star'>*</span>姓名
                    </label>
                    <div className='w-100'>
                      <div
                        className='input-group flex-nowrap'
                        data-bs-theme='dark'
                      >
                        <input
                          className='form-control'
                          placeholder='姓名'
                          name='client_name'
                          type='text'
                          id='client_name'
                          value={formData.client_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6 px-2'>
                  <div className='register-input my-3 justify-content-start'>
                    <label className='me-3 pt-2 text-nowrap' htmlFor='gender'>
                      <span className='register-star'>*</span>姓別
                    </label>
                    <div class='gender-selector-block'>
                      <div class='input-container'>
                        <input
                          id='gender-male'
                          className='radio-button'
                          name='gender'
                          type='radio'
                          value='男'
                          checked={formData.gender === '男'}
                          onChange={handleChange}
                          autoComplete='off'
                        />
                        <div class='radio-tile'>
                          <div class='icon walk-icon'>
                            <i className='fa-solid fa-child'></i>
                          </div>
                          <label
                            htmlFor='gender-male'
                            className='radio-tile-label p-0'
                          >
                            男
                          </label>
                        </div>
                      </div>

                      <div class='input-container'>
                        <input
                          id='gender-female'
                          className='radio-button'
                          name='gender'
                          type='radio'
                          value='女'
                          checked={formData.gender === '女'}
                          onChange={handleChange}
                          autoComplete='off'
                        />
                        <div class='radio-tile'>
                          <div class='icon bike-icon'>
                            <i className='fa-solid fa-child-dress'></i>
                          </div>
                          <label
                            htmlFor='gender-female'
                            className='radio-tile-label p-0'
                          >
                            女
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6 px-2'>
                  <div className='register-input my-3'>
                    <label className='me-3 pt-2 text-nowrap' htmlFor='birthday'>
                      <span className='register-star'>*</span>生日
                    </label>
                    <div className='w-100'>
                      <div
                        className='input-group flex-nowrap'
                        data-bs-theme='dark'
                      >
                        <input
                          className='form-control'
                          name='birthday'
                          type='date'
                          id='birthday'
                          value={formData.birthday}
                          onChange={handleChange}
                          max={today} // 限制最大日期為今天
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6 px-2'>
                  <div className='register-input my-3'>
                    <label className='me-3 pt-2 text-nowrap' htmlFor='phone'>
                      <span className='register-star'>*</span>電話
                    </label>
                    <div className='w-100'>
                      <div
                        className='input-group flex-nowrap'
                        data-bs-theme='dark'
                      >
                        <input
                          className='form-control'
                          name='phone'
                          type='text'
                          id='phone'
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 px-2'>
                  <div className='register-input mt-4 mb-3'>
                    <label
                      className='me-3 pt-2 text-nowrap'
                      htmlFor='client_address'
                    >
                      住址
                    </label>
                    <div className='w-100'>
                      <div
                        className='input-group flex-nowrap'
                        data-bs-theme='dark'
                      >
                        <input
                          className='form-control'
                          name='client_address'
                          type='text'
                          id='client_address'
                          size='40'
                          value={formData.client_address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className='text-black font-sm'>
                如建立帳號，即代表同意本站隱私權政策和使用條款。
              </span>
              <div className='d-flex my-4 fw-bold'>
                <input
                  className='col pixel-border-purple register-btn'
                  type='reset'
                  name='Submit3'
                  value='重設'
                  onClick={handleReset}
                />
                <input
                  className='col pixel-border-purple register-btn mx-4'
                  type='submit'
                  name='Submit2'
                  value='註冊'
                />
                <button
                  className='col pixel-border-purple register-btn'
                  type='button'
                  name='Submit'
                  onClick={() => window.history.back()}
                >
                  回上一頁
                </button>
              </div>
              <span className='text-black fw-bold font-sm'>
                已經是會員了嗎？{' '}
                <Link
                  className='text-decoration-underline'
                  href='/member/login'
                >
                  登入
                </Link>
                。
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
