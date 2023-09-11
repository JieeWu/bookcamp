import React, { useState, useEffect, use } from 'react'
import FrontPageAd from '@/components/front/frontpage-ad'
import FrontPageActivity from '@/components/front/frontpage-activity-area'
import HotList from '@/components/front/frontpage-hotList'
import FrontPageLanguageTw from '@/components/front/frontpage-language-tw'
import FrontPageLanguageEn from '@/components/front/frontpage-language-en'
import FrontUesdBook from '@/components/front/frontpage-usedbook'
import PhoneBottomBtn from '@/components/public-version/phone-bottom-btn'
import FrontPageMessage from '@/components/front/frontpage-message'
import FloatCoupon from '@/components/member/coupon/float-coupon'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Swal from 'sweetalert2'
import { useAvatar } from '@/hooks/avatarContext'

export default function Home({next}) {
  const { authJWT } = useAuthJWT()
  const { avatar, setAvatar } = useAvatar()
  const [twCategory, setTwCategory] = useState([])
  const [TW, setTW] = useState([])
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/share/TWlanguage')
          .then((res) => {
            setTW(res.data.TWbook)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])
  //抓取分類資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/share/TWlanguage/bookCategory')
          .then((res) => {
            setTwCategory(res.data)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])
  const twCategoryData = async (e) => {
    await axios
      .post('http://localhost:3002/share/TWlanguage/bookCategory', [
        e.target.id,
      ])
      .then((res) => {
        const [data] = res.data
        setTW(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //中
  ////////////////////////////
  //英
  //有時間再把兩隻程式碼合併
  const [enCategory, setEnCategory] = useState([])
  const [EN, setEN] = useState([])
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/share/ENlanguage')
          .then((res) => {
            setEN(res.data.TWbook)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])
  //抓取分類資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/share/ENlanguage/bookCategory')
          .then((res) => {
            setEnCategory(res.data)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])
  const enCategoryData = async (e) => {
    await axios
      .post('http://localhost:3002/share/ENlanguage/bookCategory', [
        e.target.id,
      ])
      .then((res) => {
        const [data] = res.data
        setEN(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleReceiveCoupon = async () => {
    let param = {
      client_id: authJWT.userData.client_id, // 到時要換成實際的會員id
      coupon_id: 2,
      action: 'birthday',
    }
    try {
      const response = await axios.post(
        'http://localhost:3002/coupon/auto_distribution',
        param,
      )
      console.log(response, 'response')
    } catch (error) {
      console.error('Error receiving coupon:', error)
    }
  }

  // 登入時判斷是否為生日
  const [isNotifty, setIsNotifty] = useState(false)
  useEffect(() => {
    const today = new Date()
    const userBirthday = new Date(authJWT.userData.birthday)
    // localStorage中的通知狀態
    const isBirthdayNotified = localStorage.getItem('birthdayNotified')

    if (
      today.getDate() === userBirthday.getDate() &&
      today.getMonth() === userBirthday.getMonth() &&
      isNotifty === false &&
      !isBirthdayNotified
    ) {
      handleReceiveCoupon()
      Swal.fire({
        icon: 'success', // 设置图标为成功图标
        title: '書營祝您生日快樂，生日優惠券已發送給您了。', // 设置通知正文文本
        className: 'red-bg', // 设置自定义 CSS 类名
      })
      setIsNotifty(true)

      // 將狀態更改為已通知
      localStorage.setItem('birthdayNotified', 'true')
    } else {
    }
  }, [])

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



  console.log(next);
  return (
    <>
      <FrontPageAd  />
      <FrontPageActivity id='server1' />
      <HotList id='server2' />
      <FrontPageLanguageTw
        category={twCategory}
        categoryData={twCategoryData}
        TW={TW}
        id='server3'
      />
      <FrontPageLanguageEn
        category={enCategory}
        categoryData={enCategoryData}
        EN={EN}
        id='server4'
      />
      {/* <FrontUesdBook />     */}
      {/* 這個二手書交易平台用不到了 我就先註解掉了 :) */}
      <FrontPageMessage id="server5"/>
      <FloatCoupon />
      <PhoneBottomBtn />
    </>
  )
}
