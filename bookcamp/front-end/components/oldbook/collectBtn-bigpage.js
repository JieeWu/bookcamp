import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import { useCollect } from '@/hooks/collectContext'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '@/components/share/commodity/commodity-page.module.css'

export default function CollectBtnBigPage({ book_id }) {
  // 使用會員
  const { authJWT } = useAuthJWT()
  const router = useRouter()
  const { collect, setCollect } = useCollect()

  // 強迫登入
  const handleLinkClick = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '請先登入',
      confirmButtonText: '前往',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }

  // 收藏按鈕
  const handleLove = async (e) => {
    let click = e.currentTarget.value
    await axios
      .post(
        `http://localhost:3002/searchcollect/love`,
        { click },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const gg = res.data.collectID
        if (gg.length >= 0) {
          const array = gg.map((v) => {
            return v.book_id
          })
          if (res.data.x.length > 0) {
            Swal.fire('成功', '已取消此收藏！', 'success').then(() => {
              setCollect(array)
            })
          } else {
            Swal.fire('成功', '成功加入收藏！', 'success').then(() => {
              setCollect(array)
            })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {authJWT.isAuth !== false ? (
        <button
          type='button'
          className={`${styles.hotCommodityLove} 
         
                        ${
                          collect.includes(book_id)
                            ? 'collectbtn9'
                            : 'collectbtn'
                        }
                        `}
          onClick={handleLove}
          value={book_id}
        >
          <i className='fa-regular fa-heart'></i>
        </button>
      ) : (
        <button
          type='button'
          className={`${styles.hotCommodityLove} collectbtn`}
          onClick={(e) => {
            handleLinkClick(e)
          }}
        >
          <i className='fa-regular fa-heart'></i>
        </button>
      )}

      <style jsx>
        {`
          .collectbtn {
            width: 100%;
            height: 100%;
            max-width: 30px;
            max-height: 30px;
            background-color: rgb(228, 218, 219);
            color: white;
            border-radius: 50%;
          }
          .collectbtn9 {
            width: 100%;
            height: 100%;
            max-width: 30px;
            max-height: 30px;
            background-color: rgb(255, 29, 51);
            color: white;
            border-radius: 50%;
          }
        `}
      </style>
    </>
  )
}
