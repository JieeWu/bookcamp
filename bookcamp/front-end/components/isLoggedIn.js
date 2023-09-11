import React from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Link from 'next/link'
import styles from '@/components/front/front-layout/front-page-header.module.css'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function IsLoggedIn({ href, icon, color, title }) {
  // 使用會員
  const { authJWT } = useAuthJWT()

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
          <i className={icon} style={{ color: color }}></i>
          {title}
        </Link>
      ) : (
        <>
          <button
            onClick={(e) => {
              handleLinkClick(e)
            }}
            className={`${styles.blockBtn} bg-white pixel-box--white font-m ms-2 ms-md-3 position-relative`}
          >
            <i className={icon} style={{ color: color }}></i>
            {title}
          </button>
        </>
      )}
    </div>
  )
}
