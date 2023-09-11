import { useEffect, useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function MemberPage() {
  // 如果該頁面有需要了解更多按鈕，把useState變更為true，並填寫下方資料
  const [status, setStatus] = useState(false)
  const { authJWT } = useAuthJWT() // 取得jwt的會員認證狀態
  const [pointRecord, setPointRecord] = useState([])

  useEffect(() => {
    const fetchPointRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/member/sign/${authJWT.userData.client_id}`,
        )
        console.log('point', response.data)
        setPointRecord(response.data.signedDates)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchPointRecord()
  }, [authJWT])

  // const [sideValue, setSideValue] = useState('')
  if (!authJWT.isAuth) {
    return (
      <>
        <div className='mt-5 not-login'>
          <div className='not-login-img'>
            <img src='/img/dead.png' className='w-100' />
          </div>
          {/* <div className='my-2'>您尚未登入會員喔</div> */}
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
            {/* 第一種為不跳轉頁面的切換方式 */}
            {/* <MemberSide setSideValue={setSideValue} /> */}
            <MemberSide />
          </div>
          <div className='col-12 col-md-10 col-xl-8'>
            <div className='mb-5'>
              <Breadcrumb2 />
              <MemberMiddle
                TitleIcon='fa-solid fa-user me-2' // 標題icon
                TitleName='點數查詢' // 標題
                Remark='' // 標題旁備註
                setStatus={setStatus}
                status={status}
                DetailIcon='' // 按鈕icon
                DetailName='' // 按鈕名稱
                TextTitle='' // 內容標題
                Text='' // 內容說明
              >
                <table className='table'>
                  <thead>
                    <tr>
                      <th>日期</th>
                      <th>點數</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pointRecord
                      .sort((a, b) => new Date(b) - new Date(a)) // 對日期進行排序
                      .map((date, index) => (
                        <tr key={index}>
                          <td>{new Date(date).toLocaleDateString()}</td>
                          <td>每日簽到增加 10 點</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </MemberMiddle>
            </div>
          </div>

          <div className='col d-none d-xl-flex'></div>
        </div>
      </>
    )
  }
}
