import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DetailBtn from '@/components/share/detail-btn'
import MemberDay from '@/components/member/member-day'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import dayjs from 'dayjs'
import { useAvatar } from '@/hooks/avatarContext'

const MemberCard = () => {
  const { authJWT } = useAuthJWT()
  const { avatar, setAvatar } = useAvatar()
  const birthday = dayjs(authJWT.userData.birthday).format('YYYY-MM-DD')
  const [memberData, setMemberData] = useState([])

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        if (authJWT.userData && authJWT.userData.client_id) {
          const response = await axios.get(
            `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
          )
          setAvatar(response.data.avatar)
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchAvatar()
  }, [authJWT, setAvatar])

  const handleFileUpload = async (e) => {
    try {
      // 呼叫刪除舊的大頭貼函式
      deleteOldAvatar()
      const avatar = e.target.files[0] // 取得上傳的檔案
      const formData = new FormData() // 建立formData
      formData.append('avatar', avatar) // 將檔案加入formData

      const response = await axios.post(
        `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
        formData,
      )

      // 若上傳成功，更新畫面
      if (response.data && response.data.code === '200') {
        setAvatar(response.data.avatar)
      }
      // 重整網頁
      // window.location.reload()
    } catch (error) {
      console.error(error.message)
    }
  }

  // 先刪除舊的大頭貼
  const deleteOldAvatar = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
      )
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className='member-card'>
        {/* 會員資訊區塊 */}
        <div className='col-12 col-md-5 d-flex align-items-end'>
          <div className='member-information-block c-bg-purple pixel-border-purple'>
            <div className='edit-img-block'>
              <div className='avatar-block'>
                <form>
                  <label htmlFor='avatar'>
                    {avatar === null ? (
                      <img
                        src={`http://localhost:3002/public/img/member/default.png`}
                        alt='avatar'
                      />
                    ) : (
                      <img
                        src={`http://localhost:3002/public/img/member/${avatar}`}
                        alt='avatar'
                      />
                    )}
                  </label>
                  <input
                    className='d-none'
                    placeholder=''
                    name='avatar'
                    type='file'
                    id='avatar'
                    // value={avatar}
                    accept='image/* '
                    onChange={handleFileUpload}
                  />
                </form>
              </div>
              <label className='upload-image-btn' htmlFor='avatar'>
                <i className='fa-solid fa-camera'></i>
              </label>
            </div>
            <div className='member-card-block'>
              <div className='member-card-info'>
                <div className='col-6 d-flex align-items-center mt-3'>
                  <strong className='me-2 font-s m-bg-yellow text-d-purple px-2 py-1 rounded-pill'>
                    我的點數
                  </strong>
                  {authJWT.userData.client_point}
                  <span className='ms-2'>點</span>
                </div>
                <div className='col-6 d-flex align-items-center mt-3'>
                  <strong className='me-2 font-s m-bg-yellow text-d-purple px-2 py-1 rounded-pill'>
                    身份驗證
                  </strong>
                  <i className='fa-solid fa-circle-check me-2 text-success'></i>
                  已驗證
                </div>
                <div className='col-6 d-flex align-items-center mt-3'>
                  <strong className='me-2 font-s m-bg-yellow text-d-purple px-2 py-1 rounded-pill'>
                    會員等級
                  </strong>
                  {authJWT.userData.client_level}
                </div>
                <div className='col-6 d-flex align-items-center mt-3'>
                  <strong className='me-2 font-s m-bg-yellow text-d-purple px-2 py-1 rounded-pill'>
                    距離升級
                  </strong>
                  <span className='font-s'>9500 / 10000</span>
                </div>
              </div>
            </div>
            <div className='basic-information mt-4'>
              <h5 className='pixel-font-chinese d-flex align-items-center'>
                <i className='fa-solid fa-user me-2'></i>基本資訊
              </h5>
              <div className='member-card-info'>
                <div className='col-6 d-flex align-items-center mt-3 font-sm'>
                  <strong className='me-2 d-bg-purple px-2 py-1 rounded-pill'>
                    姓名
                  </strong>
                  {authJWT.userData.client_name}
                </div>
                <div className='col-6 d-flex align-items-center mt-3 font-sm'>
                  <strong className='me-2 d-bg-purple px-2 py-1 rounded-pill'>
                    Email
                  </strong>
                  <div className='member-card-email'>
                    {authJWT.userData.email}
                  </div>
                </div>
                <div className='col-6 d-flex align-items-center mt-3 font-sm'>
                  <strong className='me-2 d-bg-purple px-2 py-1 rounded-pill'>
                    生日
                  </strong>
                  {birthday}
                </div>
                <div className='col-6 d-flex align-items-center mt-3 font-sm'>
                  <strong className='me-2 d-bg-purple px-2 py-1 rounded-pill'>
                    電話
                  </strong>
                  {authJWT.userData.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 每日簽到區塊 */}
        <div className='col-12 col-md-7'>
          <div className='member-daily-check c-bg-purple pixel-border-purple'>
            <div className='d-flex align-items-center m-bg-purple p-3'>
              <h5 className='pixel-font-chinese d-flex align-items-center'>
                <i className='fa-regular fa-calendar-check me-2'></i>每日簽到
              </h5>
              <div className='ms-auto'>
                <DetailBtn
                  DetailIcon='fa-regular fa-circle-question me-2'
                  DetailName='關於簽到'
                  TextTitle=''
                  Text=''
                />
              </div>
            </div>
            <MemberDay />
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberCard
