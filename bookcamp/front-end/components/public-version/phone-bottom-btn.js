import React from 'react'
import Link from 'next/link'

export default function PhoneBottomBtn() {
  return (
    <>
      <div className='fixed-bottom phone-bottom-btn d-md-none'>
        <Link href='/'>
          <i className='fa-solid fa-house font-m'></i>
          <span className='font-s mt-1'>首頁</span>
        </Link>
        <Link href='/'>
          <i className='fa-solid fa-tag font-m'></i>
          <span className='font-s mt-1'>好康優惠</span>
        </Link>
        <Link href='/'>
          <i className='fa-solid fa-book-bookmark font-m'></i>
          <span className='font-s mt-1'>好書推薦</span>
        </Link>
        <Link href='/'>
          <i className='fa-solid fa-circle-user font-m'></i>
          <span className='font-s mt-1'>會員中心</span>
        </Link>
      </div>
    </>
  )
}
