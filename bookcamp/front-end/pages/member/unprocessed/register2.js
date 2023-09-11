import React, { useState } from 'react'
import axios from 'axios'

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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // 更新密码确认字段
    if (name === 'passwd') {
      setFormData((prevData) => ({
        ...prevData,
        passwdrecheck: '', // 清空密码确认字段
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!checkForm()) {
      return // 验证失败，阻止提交
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
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <h5>帳號資料</h5>
          <div>
            <label htmlFor='email'>電子郵件</label>
            <input
              name='email'
              type='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
            />
            <small>請填寫您常用的電子郵件，以便日後寄送通知信件。</small>
          </div>

          <div>
            <label htmlFor='passwd'>使用密碼</label>
            <input
              name='passwd'
              type='password'
              id='passwd'
              value={formData.passwd}
              onChange={handleChange}
            />
            <small>請填入5~20個字元以內的英文字母、數字。</small>
          </div>
          <div>
            <label htmlFor='passwdrecheck'>確認密碼</label>
            <input
              name='passwdrecheck'
              type='password'
              id='passwdrecheck'
              value={formData.passwdrecheck}
              onChange={handleChange} // 添加这行
            />
            <small>再次確認您的密碼</small>
          </div>
        </div>

        <div>
          <h5>個人資料</h5>
          <div>
            <label htmlFor='client_name'>姓名</label>
            <input
              name='client_name'
              type='text'
              id='client_name'
              value={formData.client_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>性別</label>
            <div>
              <input
                name='gender'
                type='radio'
                value='男'
                id='gender-male'
                checked={formData.gender === '男'}
                onChange={handleChange}
              />
              <label htmlFor='gender-male'>男</label>
              <span> </span>
              <input
                name='gender'
                type='radio'
                value='女'
                id='gender-female'
                checked={formData.gender === '女'}
                onChange={handleChange}
              />
              <label htmlFor='gender-female'>女</label>
            </div>
          </div>
          <div>
            <label htmlFor='birthday'>生日</label>
            <input
              name='birthday'
              type='date'
              id='birthday'
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='phone'>電話</label>
            <input
              name='phone'
              type='text'
              id='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='client_address'>住址</label>
            <input
              name='client_address'
              type='text'
              id='client_address'
              size='40'
              value={formData.client_address}
              onChange={handleChange}
            />
          </div>
        </div>

        <p>
          <span className="register-star">*</span> 表示為必填的欄位
        </p>

        <div>
          <input
            type='reset'
            name='Submit3'
            value='重設表單'
            onClick={handleReset}
          />
          <input type='submit' name='Submit2' value='送出表單' />
          <button
            type='button'
            name='Submit'
            onClick={() => window.history.back()}
          >
            回上一頁
          </button>
        </div>
      </form>
    </>
  )
}

export default Register
