import Link from 'next/link'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function MainNavbar() {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <div className='position-relative'>
        <div className='d-none d-md-block navbar-bg'>
          <div className='d-flex justify-content-center'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex '>
                <div
                  className='navbar-link-group'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href='#'>實體書籍</a>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`slide-list d-bg-purple pixel-border-purple ${
              isHovered ? 'd-block' : ''
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='d-flex justify-content-center'>
              <div className=' d-flex justify-content-between align-items-center'>
                <div className='d-flex '>
                  <div className='navbar-list'>
                    <ul className='navbar-slide-list'>
                      <li className='py-1 fw-bold font-s text-yellow'>
                        <a href=''>討論交流</a>
                      </li>
                      <li>
                        <a href=''>書類名稱</a>
                      </li>
                      <li>
                        <a href=''>書類名稱</a>
                      </li>
                      <li>
                        <a href=''>書類名稱</a>
                      </li>
                      <li>
                        <a href=''>書類名稱</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='slide-ad mx-3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



{/* <header className={styles.fHeader} />
<div className={styles.fHeaderUp}>
  <div className={styles.logo}>
    <Link href='#'>
      <img src='/img/test/書營標準字.png' width='110px' alt='' />
    </Link>
    <div className={`${styles.search} d-none d-md-flex ms-3`}>
      <input placeholder='找啥書?' type='text' />
      <button type='submit'>搜尋</button>
    </div>
  </div>
  <ul className='d-none d-md-flex'>
    <li>
      <Link href='#'>關於我們</Link>
    </li>
    <li>
      <Link href='#'>好康優惠</Link>
    </li>
    <li>
      <Link href='/forum'>交流討論</Link>
    </li>
  </ul>
  {/* 等政傑寫 */}
  {authJWT.isAuth ? (<>
    {/* <a href='member/' className='main-btn pixel-border-yellow-s'>已登入</a> */}
    <div className='position-relative zindex-5'>
        <div className='d-none d-md-block navbar-bg'>
          <div className='d-flex justify-content-center'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex '>
                <div
                  className='navbar-link-group'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <LineLogo className='mx-3' />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`slide-list d-bg-purple pixel-border-purple ${
              isHovered ? 'd-block' : ''
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='d-flex justify-content-center'>
              <div className=' d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                  <div className='navbar-list '>
                    <ul className='navbar-slide-list'>
                      <li className='py-1 fw-bold font-s text-yellow'>
                        <a href=''>我的頁面</a>
                      </li>
                      <li>
                        <a href=''>我再想想</a>
                      </li>
                      <li>
                        <a href=''>我再想想</a>
                      </li>
                      <li>
                        <a href=''>我再想想</a>
                      </li>
                      <li>
                        <li
                          href=''
                          type='button'
                          className='pixel-border-yellow m-bg-yellow w-100 fw-bold py-1'
                          onClick={async () => {
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
                            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '登入成功',
                timer: 1500,
              }).then((res) => {
                window.location.href = '/'
              })
                          }}
                        >
                          登出
                        </li>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='slide-ad mx-3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>) : ('')}

      
      
      </div> */}