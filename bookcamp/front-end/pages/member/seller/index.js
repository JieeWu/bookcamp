import React from 'react'
import MemberMiddle from '@/components/member/member-middle'
import OldbookSide from '@/components/oldbook/oldbook-side'
import Shad from '@/components/oldbook/SellerHome/Shad'
import Operate from '@/components/oldbook/SellerHome/operate'
import Operateeffect from '@/components/oldbook/SellerHome/operateeffect'
import MemberSide from '@/components/member/member-side'
export default function SellerHome() {
  return (
    <>
      <div className='row'>
        {/*左側內容*/}
        <div className='col-2 d-none d-md-flex px-0'>
        <MemberSide />
        </div>
        {/*營運概況看板 */}
        <div className='col-12 col-lg-7 col-xl-7 p-3'>
          <Operate />
          <br />
          {/*廣告成效表 */}
          <Operateeffect />
        </div>
        {/*右側廣告*/}
        <Shad />
      </div>
    </>
  )
}
