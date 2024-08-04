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


