import { useEffect } from 'react'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 要使用jwt的會員認證

export default function LoginStatusJWT() {
  const { authJWT } = useAuthJWT() // 取得jwt的會員認證狀態

  // 未登入時，不會出現頁面內容
  if (!authJWT.isAuth) {
    return <></> // 未登入時，不會出現頁面內容
  } else
    return (
      <>
        <h1>會員專用頁面(未登入無法觀看)</h1>
        <p>會員姓名:{authJWT.userData.id}</p>
        <Link href='/member/login'>JWT授權&登入測試</Link>
      </>
    )
}
