import React, { useState, useEffect, useContext } from 'react'
import styles from './mycollect.module.css'
import axios from 'axios'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { CartContext } from '@/hooks/cartContext'

export default function Mycollect() {
  //存二手書書籍
  const [bookData, setbookData] = useState([])
  // 加入購物車按鈕
  const handleAddCart = (e, book) => {
    e.stopPropagation()
    try {
      axios
        .post('http://localhost:3002/share/addcart/add', book, {
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

  //存新書書籍
  //沒用了:) QQ
  // const [book, setbook] = useState([])
  //   //存語言分類
  const [genre, setGenre] = useState([])

  useEffect(() => {
    const fetchstoreData = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/searchcollect`, {
          withCredentials: true,
        })
        setbookData(res.data.collectBook)
        // setbook(res.data.collectBook)
        setGenre(res.data.genre)
      } catch (err) {
        console.log(err)
      }
    }
    fetchstoreData()
  }, [])

  return (
    <>
      <div className={`${styles.offset} row`}>
        <div className={styles.colHeader}>
          <div className={styles.colHeaderGrid}>商品</div>
          <div className={styles.colHeaderGrid}>書名</div>
          <div className={styles.colHeaderGrid}>書的種類</div>
          <div className={styles.colHeaderGrid}>價錢</div>
          <div className={styles.colHeaderGrid}>購物車</div>
        </div>

        {/* 二手書收藏 */}
        <div className='py-3'>
          {bookData.map((v) => (
           
            <div key={v.book_id}>
              <div className={` px-md-4`}>
                <div className={`${styles.colProduct} pixel-box--white`}>
                  <div
                    className={`${styles.colProductGrid} ${styles.colProductImg}`}
                  >
                    <img
                      src={`http://localhost:3002/public/img/oldbookimgs/${v.book_img_id}`}
                      width='100%'
                      alt=''
                    />
                  </div>
                  <div
                    className={`${styles.colProductGrid} ${styles.colProductName} ${styles.titleType}`}
                  >
                  <Link href={`/newbook/${v.book_id}`}> <div>{v.b_title}</div></Link> 
                  </div>
                  <div
                    className={`${styles.colProductGrid} ${styles.colProductDate}`}
                  >
                    {genre[v.b_genre_id - 1]?.b_genre_name}
                  </div>
                  <div
                    className={`${styles.colProductGrid} ${styles.colProductClick}`}
                  >
                    {v.book_price}
                  </div>
                  <div
                    className={`${styles.colProductGrid} ${styles.colProductPublish}`}
                  >
                    <button
                      type='button'
                      className={styles.addButton}
                      onClick={(e) => handleAddCart(e, v)}
                    >
                      <i className='fa-solid fa-cart-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
         
          ))}
        </div>
      </div>
    </>
  )
}
