import { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import CouponAll from '@/components/member/coupon/coupon-all'

export default function Coupon() {
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
            <MemberMiddle
              TitleIcon='fa-solid fa-tags me-2'
              TitleName='我的優惠券'
              Remark='' // 標題旁備註
              setStatus={setStatus}
              status={status}
              DetailIcon='fa-regular fa-circle-question me-2' // 按鈕icon
              DetailName='優惠券詳細' // 按鈕名稱
              TextTitle='優惠券說明' // 內容標題
              Text={`獲取優惠券後，在結帳頁面選擇優惠碼，優惠金額將自動抵扣訂單總額。\n優惠券限不得兌現或轉讓，過期作廢，詳細條款請查閱網站頁面。\n僅限參與活動商品及該網站活動使用，不適用於其他優惠。`} // 內容說明
            >
              {/* 下方放自己頁面的資料 */}

              <CouponAll />
            </MemberMiddle>
          </div>
        </div>

        <div className='col d-none d-xl-flex'></div>
      </div>
    </>
  )
}
