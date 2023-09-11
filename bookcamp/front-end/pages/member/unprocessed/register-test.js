import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    passwd: '',
    client_name: '',
    gender: '',
    birthday: '',
    phone: '',
    client_address: '',
  })

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

    if (!checkForm()) {
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
      window.alert('註冊成功，即將導向登入頁面')
      window.location.href = '/member/login'
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

  const checkForm = () => {
    if (formData.email === '') {
      alert('請填寫您的信箱!')
      return false
    }

    if (!checkPasswd(formData.passwd, formData.passwdrecheck)) {
      return false
    }

    if (formData.client_name === '') {
      alert('請填寫您的姓名!')
      return false
    }

    if (formData.gender !== '男' && formData.gender !== '女') {
      alert('請選擇您的性別!')
      return false
    }

    if (formData.birthday === '') {
      alert('請填寫您的生日!')
      return false
    }

    if (formData.phone === '') {
      alert('請填寫您的電話!')
      return false
    }

    if (formData.client_address === '') {
      alert('請填寫您的地址!')
      return false
    }

    return window.confirm('確定要送出嗎？')
  }

  const checkPasswd = (password1, password2) => {
    if (password1 === '') {
      alert('密碼不可以空白!')
      return false
    }

    if (password1.length < 5 || password1.length > 20) {
      alert('密碼長度只能5到20個字母與數字 !')
      return false
    }

    if (password1 !== password2) {
      alert('密碼二次輸入不一樣,請重新輸入 !')
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
                <label className='me-3 pt-2' htmlFor='email'>
                  Email
                </label>
                <div className='w-100'>
                  <div className='input-group flex-nowrap' data-bs-theme='dark'>
                    <input
                      name='email'
                      type='email'
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
                  使用密碼
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
                  確認密碼
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
                      姓名
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
                      姓別
                    </label>
                    <div className='btn-group'>
                      <input
                        className='btn-check'
                        name='gender'
                        type='radio'
                        value='男'
                        id='gender-male'
                        checked={formData.gender === '男'}
                        onChange={handleChange}
                        autoComplete='off'
                      />
                      <label
                        className='btn btn-outline-primary'
                        htmlFor='gender-male'
                      >
                        男
                      </label>
                      <span> </span>
                      <input
                        className='btn-check'
                        name='gender'
                        type='radio'
                        value='女'
                        id='gender-female'
                        checked={formData.gender === '女'}
                        onChange={handleChange}
                        autoComplete='off'
                      />
                      <label
                        className='btn btn-outline-primary'
                        htmlFor='gender-female'
                      >
                        女
                      </label>
                    </div>
                  </div>
                </div>
                <div className='col-6 px-2'>
                  <div className='register-input my-3'>
                    <label className='me-3 pt-2 text-nowrap' htmlFor='birthday'>
                      生日
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
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6 px-2'>
                  <div className='register-input my-3'>
                    <label className='me-3 pt-2 text-nowrap' htmlFor='phone'>
                      電話
                    </label>
                    <div className='w-100'>
                      <div
                        className='input-group flex-nowrap'
                        data-bs-theme='dark'
                      >
                        <input
                          className='form-control'
                          name='phone'
                          type='number'
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
                  href='/member/login-test'
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
