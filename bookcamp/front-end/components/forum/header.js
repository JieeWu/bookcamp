/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Header() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [jwtToken, setJwtToken] = useState('')
  const getAccount = (e) => {
    setAccount(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  const submitData = async () => {
    try {
      const data = { account: account, password: password }
      const res = await axios.post('http://127.0.0.1:3002/login', data)
      //   const { token } = res.data.token
      const token = res.data.data.token
      localStorage.setItem('jwtToken', token)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken')
    setJwtToken(jwtToken)
    // Do something with jwtToken, if needed
  }, []) // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className='header-group'>
        <div className='logo-div'>
          <img src='/img/logo.jpg' alt='logo' className='w-100' />
        </div>
        <div className='header-btn-group'>
          <div className='header-seller-btn text-center'>
            <img
              src='/img/seller.png'
              alt='seller-btn'
              className='seller-img-width'
            />
          </div>
          <div className='header-favorite-btn'>
            <img
              src='/img/heart.png'
              alt='heart-btn'
              className='heart-img-width'
            />
          </div>
          <div className='header-cart-btn'>
            <img
              src='/img/Cart.png'
              alt='cart-btn'
              className='Cart-img-width'
            />
          </div>
          <div
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>模擬登入系統</h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <a className='nav-link' href='./login/logout.php?logout=true'>
                    <i className='fa-regular fa-heart me-2'></i>登出系統
                  </a>
                  <label className='form-label ms-2' htmlFor='inputField'>
                    帳號：
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='inputField'
                    onChange={getAccount}
                  />
                  <br />
                  <label className='form-label ms-2' htmlFor='inputField2'>
                    密碼：
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='inputField2'
                    onChange={getPassword}
                  />
                  <br />
                  <input
                    type='submit'
                    className='mt-2 btn btn-outline-primary'
                    value='登入'
                    onClick={submitData}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex social-buttons'>
            {jwtToken === '' ? (
              <button className='btn btn-primary ' style={{ color: 'white' }}>
                <p className='btn btn-primary'>已登入</p>
              </button>
            ) : (
              <button
                className='header-login-btn'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
              >
                會員登入
              </button>
            )}
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  )
}
{
  /* <div className="header-login-btn">會員登入</div> */
}
