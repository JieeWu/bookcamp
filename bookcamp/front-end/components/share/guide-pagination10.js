import Link from 'next/link'
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Breadcrumb10 = ({crumb10}) => {
  const customSVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 11 14" fill="none">
<path d="M10.2143 6.22222L10.2143 5.44444H9.42857V4.66667L7.85714 4.66667V3.11111L6.28571 3.11111L6.28571 1.55556L4.71429 1.55556V0L0 0L0 14H4.71429L4.71429 13.2222V12.4444L6.28571 12.4444V10.8889H7.85714V9.33333H9.42857V8.55556H10.2143V7.77778H11V6.22222H10.2143Z" fill="white"/>
</svg>`)

  const customStyle = {
    '--bs-breadcrumb-divider': `url("data:image/svg+xml,${customSVG}")`,
  }

  return (
    <>
      <nav style={customStyle} aria-label='breadcrumb'>
        <ol className='breadcrumb p-3'>
          <li className='breadcrumb-item'>
            <a href='#'>首頁</a>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            會員中心
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {crumb10}
          </li>
        </ol>
      </nav>
      <style jsx>
        {`
          .breadcrumb-item a {
            color: white;
          }

          .active {
            color: white;
          }
        `}
      </style>
    </>
  )
}

export default Breadcrumb10
