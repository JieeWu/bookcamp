import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '@/styles/oldbook/odbk-page.module.css'
import Swal from 'sweetalert2'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function CollectButton({ oldBookId }) {
  const [collect, setCollect] = useState(false)
  const [isCollecting, setIsCollecting] = useState(false)
 const [isUnCollecting, setIsUnCollecting] = useState(false)
    // 使用會員
    const { authJWT } = useAuthJWT()

  //找到有沒有蒐藏的書 有就給顏色
  useEffect(() => {
    const checkCollectStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/searchcollect`,
          {
            withCredentials: true,
          },
        )
        const collectedOldBooks = response.data.collectBook

        // 尋找是否存在匹配的 book_id
        const isCollected = collectedOldBooks.some(
          (book) => book.book_id === oldBookId,
        )

        if (isCollected) {
          setCollect(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    checkCollectStatus()
  }, [oldBookId])
  // 根據 collect 的狀態決定使用哪個 class
  const buttonClass = collect ? 'collect-btn9' : 'collect-btn'

  //這是新增蒐藏
  const handleCollect = async () => {
    if (collect || isCollecting) {
      console.log('已收藏，無法再次收藏')
      return
    }
    try {
      setIsCollecting(true) // 開始收藏
      const headers = {
        'Content-Type': 'application/json',
      }
      const response = await axios.post(
        'http://localhost:3002/collect/oldcollect',
        { book_id: oldBookId },
        {
          headers,
          withCredentials: true,
        },
      )

      Swal.fire('成功', '成功加入收藏！', 'success')
      
      console.log('L61',response.data);

      if (response.data) {
        console.log("成功");
        setCollect(true)
        
      } else {
        console.error('錯誤')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsCollecting(false) //
    }
  }
  //取消蒐藏
  const handleUnCollect = async () => {
    if (!collect || isUnCollecting) {
      console.log('無法蒐藏')
      return
    }

    try {
      setIsUnCollecting(true) // 取消收藏
      const response = await axios.delete(
        'http://localhost:3002/collect/oldcollect',
        {
          data: { book_id: oldBookId },
          withCredentials: true,
          
        },
        Swal.fire('成功', '已取消加入收藏！', 'success'),
      )

      if (response.data.message == '已取消收藏') {
        console.log('成功取消收藏')
        setCollect(false)
      } else {
        console.error('取消收藏失败')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsUnCollecting(false)
    }
  }


   // 請先加入會員
   const handleAlert = (e) => {
     Swal.fire({
       position: 'center',
       icon: 'warning',
       title: '請先登入',
       timer: 2500,
     })
   }
   const handleButtonClick = () => {
    // 如果 JWT 不存在或無效，提示用戶登入
    if (authJWT.isAuth !== true) {
      handleAlert();
      return;
    }
    // 如果 JWT 有效，根據 `collect` 的狀態執行相應動作
    collect ? handleUnCollect() : handleCollect();
  };


  //給顏色
  const buttonClass1 = isCollecting ? 'collect-btn9' : 'collect-btn'

  const buttonClass2 = isUnCollecting ? 'collect-btn9' : 'collect-btn'

  return (
    <button
      type='button'
      className={`${styles.commodityLove} 
      ${buttonClass}   `}
      onClick={handleButtonClick}
    >
      <i className='fa-regular fa-heart'></i>
    </button>
  )
}
