import React, { useContext } from 'react'
import styles from './commodity-page.module.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CartContext } from '@/hooks/cartContext'
import CollectButton from '@/components/oldbook/CollectButton'
import CollectBtnBigPage from '@/components/oldbook/collectBtn-bigpage'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
export default function CommodityPageBig({
  key,
  item,
  book_price,
  total_count,
  book_img_id,
  b_title,
  blurb,
  book_id,
  index,
}) {
  const url = 'http://localhost:3002/img/oldbookimgs/'
  //偵測路由
  const router = useRouter()
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
  // 使用會員
  const { authJWT } = useAuthJWT()
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

  // 購物車狀態
  const { setCartItem } = CartContext()

  return (
    <div key={key} className={`${styles.hotlistCard} pixel-border-purple`}>
      <span className={styles.rankBrand}>
        <img className={styles.crown} src='/img/icon-pixel/no1_1.svg' />
        <span className='boder-pixel-w'>
          <div className='font-s'>No.</div>
          {index + 1}
        </span>
      </span>
      <Link href={'/newbook/' + book_id}>
        <img className={styles.hotlistBookImg} src={url + `${book_img_id}`} />
      </Link>
      <CollectBtnBigPage book_id={book_id} />
      <h5 className='fw-bold mx-3 text-white'>{b_title}</h5>
      <div className='mt-auto text-white'>
        <div className='d-flex m-2'>
          <div className={`${styles.SaleBlock} w-100 font-sm`}>
            銷售量<span className='font-m px-2 fw-bold'>{total_count}</span>本
          </div>
          <div className={styles.priceArea}>
            <div className='d-bg-purple pixel-d-purple w-100 p-1'>
              <i className='fa-solid fa-circle-dollar-to-slot me-2'></i>
              {book_price}元
            </div>
            <button
              type='button'
              className={styles.addButton}
              onClick={(e) => {
                authJWT.isAuth !== false ? handleAddCart(item) : handleAlert(e)
              }}
            >
              <i className='fa-solid fa-cart-plus'></i>
            </button>
            {/* <CollectButton oldBookId={book_id}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
