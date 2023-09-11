import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function MainNavbar() {
  const [isHovered, setIsHovered] = useState(false)
  const [searchValue, setSearchValue] = useState('') //大搜尋

  const router = useRouter()
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  //監聽事件 按下Enter 可以搜尋
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      // 使用router.push進行導航
      router.push(`/newbook?query=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <>
      <div className='position-relative'>
        <div className='d-none d-md-block navbar-bg'>
          <div className='d-flex justify-content-center'>
            <div className='col-8 d-flex justify-content-between align-items-center'>
              <div className='d-flex w-100'>
                <div className='navbar-link-group'>
                  <Link
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href='/newbook'
                  >
                    實體書籍
                  </Link>
                  <Link
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href='#/'
                  >
                    客服幫助
                  </Link>
                  <Link href='/oldbook'>二手書籍</Link>
                  <Link href='/forum'>討論交流</Link>
                </div>
              </div>
              <div className='search-frame mx-3'>
                <div>
                  <input
                    placeholder='找啥書?'
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Link
                    href={`/newbook?query=${encodeURIComponent(searchValue)}`}
                  >
                    <button type='submit'>搜尋</button>
                  </Link>
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
            <div className='d-flex justify-content-center h-100'>
              <div className='col-8 d-flex justify-content-between align-items-center'>
                <div className='d-flex w-100'>
                  <div className='navbar-list'>
                    {/* <ul className='navbar-slide-list'>
                      <li className='py-1 fw-bold font-s text-yellow'>
                        <a href=''>所有書類</a>
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
                    </ul> */}
                    <div>
                      <a className='fw-bold font-s text-yellow ps-5' href='#'>
                        所有書類
                      </a>
                    </div>
                    <ul className='row'>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                      <li className='col-3'>
                        <a href='#'>書類名稱</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='slide-ad mx-3'>
                  <div className='rounded-2 overflow-hidden'>
                    <a href='#/'>
                      <img src='/img/test/800x300_ad_6.jpg' />
                    </a>
                  </div>
                  <div className='w-100 text-center text-white mt-2'>
                    廣告標題
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 手機板nav */}
        <div className='d-flex d-md-none justify-content-center d-bg-purple p-2'>
          <button
            className='Mobile-search'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseWidth'
            aria-expanded='false'
          >
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
          <div
            className='collapse collapse-horizontal Mobile-search-area'
            id='collapseWidth'
          >
            <div
              className='card card-body p-2 rounded-5 c-bg-purple'
              style={{ width: '80vw' }}
            >
              <input
                placeholder='找啥書?'
                type='text'
                value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className='d-flex Mobile-slid-content'>
            <Link href='#/'>活動專區</Link>
            <Link href='#/'>熱銷榜</Link>
            <Link href='#/'>中文書類</Link>
            <Link href='#/'>英文書類</Link>
            <Link href='#/'>二手書平台</Link>
            <Link href='/forum'>討論交流</Link>
          </div>
        </div>
      </div>
    </>
  )
}
