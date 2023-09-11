import React from 'react'
import Link from 'next/link'
import styles from './footer.module.css'

const FooterLists = () => {
  return (
    <>
      {/* 網頁版footer */}
      <div className={`${styles.footerList} d-none d-md-flex`}>
        <ul>
          <span>關於我們</span>
          <li>
            <Link href='#/'>關於我們</Link>
          </li>
          <li>
            <Link href='#/'>企業歷史</Link>
          </li>
          <li>
            <Link href='#/'>價值觀</Link>
          </li>
          <li>
            <Link href='#/'>合作夥伴</Link>
          </li>
        </ul>
        <ul>
          <span>客服幫助</span>
          <li>
            <Link href='#/'>消費問題</Link>
          </li>
          <li>
            <Link href='#/'>會員等級</Link>
          </li>
          <li>
            <Link href='#/'>消費權益</Link>
          </li>
          <li>
            <Link href='#/'>常見Q&A</Link>
          </li>
        </ul>
        <ul>
          <span>購物資訊</span>
          <li>
            <Link href='#/'>優惠券取得</Link>
          </li>
          <li>
            <Link href='#/'>關於上架</Link>
          </li>
          <li>
            <Link href='#/'>購物流程</Link>
          </li>
        </ul>
        <ul>
          <span>服務條款</span>
          <li>
            <Link href='#/'>使用者條款</Link>
          </li>
          <li>
            <Link href='#/'>交易紀錄</Link>
          </li>
          <li>
            <Link href='#/'>版權聲明</Link>
          </li>
        </ul>
      </div>
      {/* 手機板footer */}
      <div
        className={`${styles.phoneFooterList} accordion accordion-flush d-block d-md-none`}
        id='accordionFooter'
        data-bs-theme='dark'
      >
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#flush-collapse1'
              aria-expanded='false'
              aria-controls='flush-collapse1'
            >
              關於我們
            </button>
          </h2>
          <div
            id='flush-collapse1'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionFooter'
          >
            <div className='accordion-body pt-0 pb-4'>
              <ul>
                <li>
                  <Link href='#/'>關於...</Link>
                </li>
                <li>
                  <Link href='#/'>關於...</Link>
                </li>
                <li>
                  <Link href='#/'>關於...</Link>
                </li>
                <li>
                  <Link href='#/'>關於...</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#flush-collapse2'
              aria-expanded='false'
              aria-controls='flush-collapse2'
            >
              客服幫助
            </button>
          </h2>
          <div
            id='flush-collapse2'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionFooter'
          >
            <div className='accordion-body pt-0 pb-4'>
              <ul>
                <li>
                  <Link href='#/'>幫助...</Link>
                </li>
                <li>
                  <Link href='#/'>幫助...</Link>
                </li>
                <li>
                  <Link href='#/'>幫助...</Link>
                </li>
                <li>
                  <Link href='#/'>幫助...</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#flush-collapse3'
              aria-expanded='false'
              aria-controls='flush-collapse3'
            >
              購物資訊
            </button>
          </h2>
          <div
            id='flush-collapse3'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionFooter'
          >
            <div className='accordion-body pt-0 pb-4'>
              <ul>
                <li>
                  <Link href='#/'>購物...</Link>
                </li>
                <li>
                  <Link href='#/'>購物...</Link>
                </li>
                <li>
                  <Link href='#/'>購物...</Link>
                </li>
                <li>
                  <Link href='#/'>購物...</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#flush-collapse4'
              aria-expanded='false'
              aria-controls='flush-collapse4'
            >
              服務條款
            </button>
          </h2>
          <div
            id='flush-collapse4'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionFooter'
          >
            <div className='accordion-body pt-0 pb-4'>
              <ul>
                <li>
                  <Link href='#/'>條款...</Link>
                </li>
                <li>
                  <Link href='#/'>條款...</Link>
                </li>
                <li>
                  <Link href='#/'>條款...</Link>
                </li>
                <li>
                  <Link href='#/'>條款...</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterLists
