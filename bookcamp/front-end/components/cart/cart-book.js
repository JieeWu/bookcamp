import React, { useContext } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import Swal from 'sweetalert2'

// HOOK
import { CartContext } from '@/hooks/cartContext'

// CSS
import styles from './css/cart-item.module.css'

export default function CartBook({ item,check, selectCheck }) {

  const url = 'http://localhost:3002/img/oldbookimgs/'

  // 購物車狀態
  const { cartItem, setCartItem } = CartContext()

  // 功能-count增加數量
  const addCount = async (click) => {
    let id = click.currentTarget.value
    let updated
    cartItem.map((item) => {
      if (id == item.cart_id) {
        return (updated = { ...item, book_count: ++item.book_count })
      } else return item
    })
    try {
      await axios
        .put(
          `http://localhost:3002/cart/check`,
          { cart_id: id, book_count: updated.book_count },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )
        .then((res) => {
          setCartItem(res.data.count)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // 功能-count減少數量
  const subCount = async (click) => {
    let id = click.currentTarget.value
    let updated
    cartItem.map((item) => {
      if (id == item.cart_id) {
        return (updated = {
          ...item,
          book_count: item.book_count > 1 ? --item.book_count : 1,
        })
      } else return item
    })
    try {
      await axios
        .put(
          `http://localhost:3002/cart/check`,
          { cart_id: id, book_count: updated.book_count },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )
        .then((res) => {
          setCartItem(res.data.count)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // 功能-item刪除
  const deleteItem = async (click) => {
    let id = click.currentTarget.id
    try {
      const result = await Swal.fire({
        title: '您確定不要這項產品嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      })

      if (result.isConfirmed) {
        await axios
          .delete(`http://localhost:3002/cart/check`, {
            params: { id: id },
            withCredentials: true,
          })
          .then((res) => {
            setCartItem(res.data.cart)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }


  // 判定路由決定輸出
  const router = useRouter()
  const CartItemH = router.pathname

  return (
    <>
      {CartItemH == '/cart' ?
        <div className={`${styles.cart_item_body} cart`} key={item.cart_id}>
          <div className='checkbox_BookGrid'>
            <input
              type='checkbox'
              value={item.cart_id}
              checked={check.includes(item.cart_id) ? true : false}
              onChange={(e) => {
                selectCheck(Number(e.target.value))
              }}
            />
          </div>
          <div className='bookImg_BookGrid'>
            <img
              src={url + `${item.book_img_id}`}
              alt='picture'
              className='w-100'
            />
          </div>
          <div className='bookName_BookGrid'>
            <b className='font-m'>{item.b_title}</b>
            <span className={`${styles.pNoWrap} font-s`}>{item.blurb}</span>
          </div>
          <div className='bookType_BookGrid font-s'>
            <span>{item.b_genre_name}</span>
          </div>
          <div className='bookCount_BookGrid pixel-font font-m'>
            <div>
              <button
                className='btn-addAndsub-item subButton'
                onClick={subCount}
                value={item.cart_id}
              >
                <i className='fa-solid fa-minus'></i>
              </button>
              <input
                type='text'
                className='input-box-all'
                value={item.book_count}
                readOnly
              />
              <button
                className='btn-addAndsub-item addButton'
                onClick={addCount}
                value={item.cart_id}
              >
                <i className='fa-solid fa-plus'></i>
              </button>
            </div>
          </div>
          <div className='bookPrice_BookGrid font-m fw-bold'>
            ${item.book_price}
          </div>
          <div className='ashcan_BookGrid'>
            <i
              className='fa-solid fa-xmark'
              id={item.cart_id}
              value={item.cart_id}
              onClick={deleteItem}
            ></i>
          </div>
        </div>
        :
        <div
          className={`${styles.cart_item_body} cart`}
          key={item.cart_id}
        >
          <div className='bookImg_BookGrid'>
            <img
              src={url + `${item.book_img_id}`}
              alt='picture'
              className='w-100'
            />
          </div>
          <div className='bookName_BookGrid font-m'>
            <b>{item.b_title}</b>
          </div>
          <div className='bookType_BookGrid font-s'>
            {item.b_genre_name}
          </div>
          <div className='bookCount_BookGrid pixel-font font-m'>
            <span className='count-rwd '>x</span>
            {item.book_count}
          </div>
          <div className='bookPrice_BookGrid font-m fw-bold'>
            ${item.book_price}
          </div>
        </div>
      }
      <style jsx>
        {`
          @media screen and (max-width: 992px) {
            .cart {
              grid-template-columns: 0.5fr 1fr 1fr 1fr 2fr 0.5fr;
              grid-template-areas:
                'check img name name count ashcan'
                'check img type price count ashcan';
            }
            .bookName_BookGrid{
              text-align:center;
            }

            .bookType_HeaderGrid,
            .bookPrice_HeaderGrid,
            .bookImg_HeaderGrid,
            .bookCount_HeaderGrid {
              display: none;
            }

            .bookType_BookGrid {
              background-color: var(--main-colorpurple);
              color: var(--white);
              border-radius: 30px;
              text-align: center;
              padding-block: 3px;
              padding-inline: 10px;
              margin: 5px;
              width: 90px;
              white-space: nowrap;
            }

            .bookCount_BookGrid > .count-rwd {
              display: inline-block;
            }

            .bookCount_BookGrid {
              margin-inline: 10px;
            }
          }

          @media screen and (max-width: 576px) {
            .bookName_BookGrid > .p-nowrap,
            .bookCount_HeaderGrid {
              display: none;
            }
            .cart {
              grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr;
              grid-template-areas:
                'check img name name ashcan'
                'check img type price ashcan'
                'check img count count ashcan';
            }
            .bookCount_BookGrid {
              margin-bottom: 15px;
              text-align: end;
            }
          }
        `}
      </style>
    </>
  )
}
