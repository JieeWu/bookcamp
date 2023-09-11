import React, { useContext } from 'react'
import styles from './commodity-page10.module.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CartContext } from '@/hooks/cartContext'
import CollectButton from '@/components/oldbook/CollectButton'
import CollectBtnBigPage from '@/components/oldbook/collectBtn-bigpage'
import Link from 'next/link'
export default function CommodityPagepush({
  item,
  book_price,
  total_count,
  book_img_id,
  b_title,
  blurb,
  book_id,
}) {
  const url = 'http://localhost:3002/img/oldbookimgs/'

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

  // 購物車狀態
  const { setCartItem } = CartContext()

  return (
    <>
      <div className={`${styles.hotlistCard} pixel-border-purple`}>
        <Link href={'/newbook/' + book_id}>
          <img src={url + `${book_img_id}`} />
        </Link>
        <CollectBtnBigPage book_id={book_id} />
        <h5 className='fw-bold mx-3 text-white'>{b_title}</h5>
        <div className='mt-auto text-white'>
          {/* <button
            type='button'
            className={`${styles.hotCommodityLove} collect-btn`}
          >
            <i className='fa-regular fa-heart'></i>
          </button> */}
          <div className='d-flex m-2'>
            {/* <div
              className={`${styles.SaleBlock} m-bg-yellow w-100 py-2 font-s`}
            >
              銷售量 :<span>{total_count}</span>本
            </div> */}
            <div className={styles.priceArea}>
              <div className='d-bg-purple pixel-d-purple w-100 p-1'>
                <i className='fa-solid fa-circle-dollar-to-slot me-2'></i>
                {book_price}元
              </div>
              <button
                type='button'
                className={styles.addButton}
                onClick={() => {
                  handleAddCart(item)
                }}
              >
                <i className='fa-solid fa-cart-plus'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
