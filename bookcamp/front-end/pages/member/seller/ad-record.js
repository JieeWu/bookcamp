import { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import AdRecord from '@/components/member/ad/ad-record'

export default function MemberPage() {
  // 如果該頁面有需要了解更多按鈕，把useState變更為true，並填寫下方資料
  const [status, setStatus] = useState(false)

  // const [sideValue, setSideValue] = useState('')
  return (
    <>
      <div className='row'>
        <div className='col-2 d-none d-md-flex px-0'>
          <MemberSide />
        </div>
        <div className='col-12 col-md-10 col-xl-8 mobile-phone'>
          <div className='mb-5'>
            <Breadcrumb2 />
            <MemberMiddle
              TitleIcon='fa-regular fa-rectangle-list me-2'
              TitleName='廣告刊登紀錄'
              Remark='' // 標題旁備註
              setStatus={setStatus}
              status={status}
              DetailIcon='' // 按鈕icon
              DetailName='' // 按鈕名稱
              TextTitle='' // 內容標題
              Text='' // 內容說明
            >
              {/* 下方放自己頁面的資料 */}
              <AdRecord />
            </MemberMiddle>
          </div>
        </div>

        <div className='col d-none d-xl-flex'></div>
      </div>
    </>
  )
}
