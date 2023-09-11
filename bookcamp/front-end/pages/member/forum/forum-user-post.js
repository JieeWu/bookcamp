import { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import CouponAll from '@/components/member/coupon/coupon-all'
import ForumButtonHeader from '@/components/forum/forum-button-header'
import ForumPostHeader from '@/components/forum/forum-member-post-header'
import ForumCollect from '@/components/forum/forum_collect'


export default function forumUserPost() {
  // 如果該頁面有需要了解更多按鈕，把useState變更為true，並填寫下方資料
  const [status, setStatus] = useState(true)

  const handleLinkClick = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '請先登入',
      timer: 2500,
    }).then(() => {
      router.push('/member/login')
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col d-none d-md-flex px-0'>
          <MemberSide />
        </div>
        <div className='col-12 col-md-10 col-xl-8 mobile-phone'>
          <div className='mb-5'>
            <Breadcrumb2 />
            <div className='ms-3'>
            <ForumPostHeader/>
            </div>
            <div className='mt-4 ms-3'>
            <ForumCollect />
            </div>
          </div>
        </div>

        <div className='col d-none d-xl-flex'></div>
      </div>
    </>
  )
}
