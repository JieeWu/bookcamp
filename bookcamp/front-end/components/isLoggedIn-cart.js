import React, { useContext } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Link from 'next/link'
import styles from '@/components/front/front-layout/front-page-header.module.css'
import { CartContext } from '@/hooks/cartContext'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function IsLoggedInCart({ href, icon }) {
  // 使用會員
  const { authJWT } = useAuthJWT()
  const { cartItem } = CartContext()

  //偵測路由
  const router = useRouter()

  const handleLinkClick = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '請先登入',
      confirmButtonText: '前往',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }

  return (
    <div>
      {authJWT.isAuth !== false ? (
        <Link
          href={href}
          className={`${styles.blockBtn} bg-white pixel-box--white font-m ms-2 ms-md-3 position-relative`}
        >
          <i className={icon}></i>
          {/* {cartItem.length > 0 ? ( */}
          {cartItem ? (
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
              {cartItem.length}
            </span>
          ) : (
            ''
          )}
        </Link>
      ) : (
        <button
          onClick={(e) => {
            handleLinkClick(e)
          }}
          className={`${styles.blockBtn} bg-white pixel-box--white font-m ms-2 ms-md-3 position-relative`}
        >
          <i className={icon}></i>
        </button>
      )}
    </div>
  )
}
