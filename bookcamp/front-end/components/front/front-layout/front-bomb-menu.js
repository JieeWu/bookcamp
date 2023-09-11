import Link from 'next/link'
import React from 'react'

export default function FrontBombMenu() {
  return (
    <>
      {/* 右側彈出目錄 */}
      <div
        className='offcanvas offcanvas-end menu-block pixel-border-yellow-s'
        tabindex='-1'
        id='offcanvasRightFront'
        aria-labelledby='offcanvasRightLabel'
      >
        <div className='offcanvas-header'>
          <div className='bombmenu-head'>
            <h5 className='offcanvas-title fw-bold' id='offcanvasRightLabel'>
              <i className='fa-solid fa-bars'></i>
              <span className='ms-2'>選單</span>
            </h5>
            <div className='d-flex'>
              <Link href='/member/seller' className='header-btn font-m'>
                賣
              </Link>
              <Link href='/member/mycollect' className='header-btn font-m'>
                <i className='fa-solid fa-heart' style={{ color: '#ff245b' }}></i>
              </Link>
            </div>
          </div>
        </div>
        <div className='offcanvas-body'>
          <div className='project-block'>
            <button className='pixel-purple c-bg-purple' type='button'>
              活動專區
            </button>
            <button className='pixel-purple c-bg-purple' type='button'>
              熱銷榜
            </button>
            <button className='pixel-purple c-bg-purple' type='button'>
              中文書類
            </button>
            <button className='pixel-purple c-bg-purple' type='button'>
              英文書類
            </button>
            <button className='pixel-purple c-bg-purple' type='button'>
              二手書區
            </button>
            <button className='pixel-purple c-bg-purple' type='button'>
              互動交流
            </button>
          </div>
          <div className='py-4' id='accordion'>
            <button
              className='nav-big-btn pixel-border-yellow-s m-bg-yellow'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse'
              aria-expanded='false'
              aria-controls='collapse'
            >
              實體書籍
              <i className='fa-solid fa-caret-down'></i>
            </button>
            <div
              className='collapse w-100'
              id='collapse'
              data-bs-parent='#accordion'
            >
              <div className='card card-body nav-details'>
                <ul>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className='nav-big-btn pixel-border-yellow-s m-bg-yellow'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse1'
              aria-expanded='false'
              aria-controls='collapse1'
            >
              二手書籍
              <i className='fa-solid fa-caret-down'></i>
            </button>
            <div
              className='collapse w-100'
              id='collapse1'
              data-bs-parent='#accordion'
            >
              <div className='card card-body nav-details'>
                <ul>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className='nav-big-btn pixel-border-yellow-s m-bg-yellow'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse2'
              aria-expanded='false'
              aria-controls='collapse2'
            >
              書籍分類
              <i className='fa-solid fa-caret-down'></i>
            </button>
            <div
              className='collapse w-100'
              id='collapse2'
              data-bs-parent='#accordion'
            >
              <div className='card card-body nav-details'>
                <ul>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className='nav-big-btn pixel-border-yellow-s m-bg-yellow'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse3'
              aria-expanded='false'
              aria-controls='collapse3'
            >
              討論交流
              <i className='fa-solid fa-caret-down'></i>
            </button>
            <div
              className='collapse w-100'
              id='collapse3'
              data-bs-parent='#accordion'
            >
              <div className='card card-body nav-details'>
                <ul>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                  <li>
                    <a href='#/'>書籍分類</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
