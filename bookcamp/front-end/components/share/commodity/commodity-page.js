import React, { useContext } from 'react'
import styles from './commodity-page.module.css'
import axios from 'axios'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { CartContext } from '@/hooks/cartContext'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import { useRouter } from 'next/router'

import CollectButton from '@/components/oldbook/CollectButton'
import CollectBtn from '@/components/oldbook/collectBtn'

export default function CommodityPage({
  key,
  rwd,
  book_id,
  b_title,
  book_img_id,
  book_price,
  item,
  imgStyle,
}) {
  // 抓後端的圖片
  const url = 'http://localhost:3002/img/oldbookimgs/'
  //偵測路由
  const router = useRouter()
  // 使用會員
  const { authJWT } = useAuthJWT()

  // 購物車狀態
  const { setCartItem } = CartContext()
  
  // 加入購物車按鈕
  const handleAddCart = (e) => {
    try {
      axios
        .post('http://localhost:3002/share/addcart/add', e, {
          withCredentials: true,
        })
        .then((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '加入購物車',
            timer: 1500,
          })
          setCartItem(res.data.newcart)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // 請先加入會員
  const handleAlert = (e) => {
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

  return (
      <div key={key} className={`${rwd} p-2`}>
        <div
          className={`${styles.commodityCard} pixel-box--white`}
          style={imgStyle}
        >
          <Link href={'/newbook/' + book_id}>
            <img className={styles.commodityImg} src={url + `${book_img_id}`} />
          </Link>
          <div className='mt-auto position-relative'>
            <CollectBtn  book_id={book_id} />
            <h6 className='fw-bold px-2'>{b_title}</h6>
            <div className={styles.priceArea}>
              <div className='d-bg-purple text-yellow pixel-d-purple w-100 p-1'>
                <i className='fa-solid fa-circle-dollar-to-slot me-2'></i>
                {book_price}元
              </div>
              <button
                type='button'
                className={styles.addButton}
                onClick={(e) => { authJWT.isAuth !== false ? handleAddCart(item) : handleAlert(e) }}>
                <i className='fa-solid fa-cart-plus'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
