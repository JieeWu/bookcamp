import { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import AdNow from '@/components/member/ad/ad-now'

export default function MyAd() {
  // 如果該頁面有需要了解更多按鈕，把useState變更為true，並填寫下方資料
  const [status, setStatus] = useState(true)

  // const [sideValue, setSideValue] = useState('')
  return (
    <>
      <div className='row'>
        <div className='col-2 d-none d-md-flex px-0'>
          {/* 第一種為不跳轉頁面的切換方式 */}
          {/* <MemberSide setSideValue={setSideValue} /> */}
          <MemberSide />
        </div>
        <div className='col-12 col-md-10 col-xl-8 mobile-phone'>
          <Breadcrumb2 />
          <MemberMiddle
            TitleIcon='fa-solid fa-user me-2'
            TitleName='我的廣告'
            Remark='' // 標題旁備註
            setStatus={setStatus}
            status={status}
            DetailIcon='fa-regular fa-circle-question me-2' // 按鈕icon
            DetailName='刊登廣告說明' // 按鈕名稱
            TextTitle='刊登廣告說明' // 內容標題
            Text='' // 內容說明
          >
            {/* 下方放自己頁面的資料 */}
            {/* {sideValue === '我的優惠券' ? <CouponAll /> : null} */}
            <AdNow />
          </MemberMiddle>
        </div>

        <div className='col d-none d-xl-flex'></div>
      </div>
    </>
  )
}
