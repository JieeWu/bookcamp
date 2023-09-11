import React, { useState } from 'react'
import Title from '@/components/share/front-title'
import Person from '@/components/about/person'
import styles from '@/styles/oldbook/odbk-page.module.css'
import commodity from '@/components/share/commodity/commodity-page.module.css'
import Link from 'next/link'
export default function About() {
  const [page, setPage] = useState(0)

  const handlePage = (e) => {
    let x = e.currentTarget.id
    setPage(parseInt(x))
  }

  return (
    <>
      <div className='pt-5'></div>
      <div id='touching' class='carousel slide'>
        <div class='carousel-inner'>

          {/* 第四頁-組員介紹 */}
          <div className='carousel-item active'>
            <div className='pt-5'></div>
            <Title title='關於我們' icon='fa-solid fa-users' />
            <div className='pt-5'></div>
            <div className='d-flex justify-content-center'>
              <Person
                name='黃瑀蓁'
                job='組長'
                img='/about/001.png'
                theme='購物車'
                content='
                購物車-版面、功能、LINEPAY、藍新金流；產品-訂單查詢、產品評價、產品收藏；首頁-功能；BUG排除、版本控制、PPT製作
                 '
              />
              <Person
                name='尤政傑'
                job='副組長'
                img='/about/002.jpg'
                theme='會員'
                content='
                會員-版面、功能、GOOGLE登入、JWT驗證、每日簽到、會員點數；伺服器架設
                '
              />
              <Person
                name='吳佳杰'
                job='技術長'
                img='/about/003.png'
                theme='留言板'
                content='
                留言板-版面、功能、即時聊天；首頁-功能；購物車-藍新金流；伺服器架設、版本控制、技術指導
                '
              />
              <Person
                name='張簡飛鴻'
                job='UIUX'
                img='/about/004.png'
                theme='優惠卷'
                content='Figma版面設計；優惠卷-版面、功能；廣告-版面、功能；首頁、會員、產品、購物車、留言板-版面、CSS特效
                '
              />
              <Person
                name='莊友維'
                job='組員'
                img='/about/005.jpg'
                theme='產品'
                content='
                產品-版面、功能、產品收藏；客服系統-版面、功能；首頁-關鍵字搜尋
                '
              />
              {/* <Person
                name='廖郡宛'
                job='組員'
                img='/about/006.jpg'
                content='Figma版面調整小助手、PPT製作'
              /> */}
            </div>
          </div>
        </div>

        <div className='pt-5'></div>
        {/* 按鈕 */}
        {/* <ul
          className={`pagination ${styles.pagination} justify-content-center`}
        >
          {Array.from({ length: 4 }, (_, index) => {
            return (
              <li className='page-item mx-2 pixel-box--white-s'>
                <Link
                  className={`${page == index ? 'active' : ''} page-link`}
                  href='#'
                  data-bs-target='#touching'
                  data-bs-slide-to={index}
                  id={index}
                  onClick={(e) => handlePage(e)}
                >
                  <i className={`fa-solid fa-${index + 1}`}></i>
                </Link>
              </li>
            )
          })}
        </ul> */}
      </div>
    </>
  )
}
