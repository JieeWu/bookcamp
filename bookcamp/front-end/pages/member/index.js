import { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import MemberCard from '@/components/member/member-card'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 要使用jwt的會員認證
import Link from 'next/link'

export default function MemberPage() {
  // 如果該頁面有需要了解更多按鈕，把useState變更為true，並填寫下方資料
  const [status, setStatus] = useState(false)
  const { authJWT } = useAuthJWT() // 取得jwt的會員認證狀態
  console.log(authJWT.userData)
  // const [sideValue, setSideValue] = useState('')
  if (!authJWT.isAuth) {
    return (
      <>
        <div className='mt-5 not-login'>
          <div className='not-login-img'>
            <img src='/img/dead.png' className='w-100' />
          </div>
          <Link
            href='/member/login'
            className='px-5 my-5 main-btn pixel-border-yellow-s not-login-text'
            type='button'
          >
            請先登入會員
          </Link>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-2 d-none d-md-flex px-0'>
            <MemberSide />
          </div>
          <div className='col-12 col-md-10 col-xl-8 mobile-phone'>
            <div className='mb-5'>
              <Breadcrumb2 />
              <div className='d-flex card-day'>
                <MemberCard />
              </div>
            </div>
          </div>
          <div className='col d-none d-xl-flex'></div>
        </div>
      </>
    )
  }
}
