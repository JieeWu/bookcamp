import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
// import CollectButton2 from '@/components/oldbook/CollectButton2'
import CollectBtn2 from '@/components/oldbook/collectBtn2'
import { CartContext } from '@/hooks/cartContext'
import styles from '@/styles/oldbook/oldbooklist.module.css'
import CommodityPagepush from '@/components/share/commodity/commodity-page-push'
import FrontTitle from '@/components/share/front-title'
import ProductComment from '@/components/order/product-comment'
import { useAuthJWT } from '@/hooks/use-auth-jwt'




export default function BookDetail() {
  // 使用會員
    const { authJWT } = useAuthJWT()
  //二手書資料
  const [bookData, setBookData] = useState([])

  //會員資料
  const [clientData, setClientData] = useState([])

  //隨機書資料
  const [bookPushData, setBookPushData] = useState([])

  //分類資料
  const [genre, setGenre] = useState([])
  //使用多久資料
  const [usage, setUsage] = useState([])
  //新書還是二手書資料
  const [type, setType] = useState([])

  const router = useRouter()
  //用status來保存要顯示的頁面
  const [oldbooklist, setOldbooklist] = useState('b')

  // 路由參數
  const { book_id } = router.query
  
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

  

  useEffect(() => {
    if (book_id) {
      const fetchBookData = async () => {
        try {
          const [bookDetailsRes, bookPushRes] = await Promise.all([
            axios.get(`http://localhost:3002/oldbook/${book_id}`),
            axios.get('http://localhost:3002/bookpush'),
          ])

          // 格式化
          if (
            bookDetailsRes.data &&
            bookDetailsRes.data.obData &&
            Array.isArray(bookDetailsRes.data.obData)
          ) {
            bookDetailsRes.data.obData.forEach((book) => {
              if (book.sherlf_date) {
                book.sherlf_date = dayjs(book.sherlf_date).format('YYYY-MM-DD')
              }
              if (book.revise_date) {
                book.revise_date = dayjs(book.revise_date).format('YYYY-MM-DD')
              }
            })
          }
          setGenre(bookDetailsRes.data.obgenre[0])
          setUsage(bookDetailsRes.data.usagename[0])
          setClientData(bookDetailsRes.data.obseller[0])
          setBookData(bookDetailsRes.data.obData[0])
          setType(bookDetailsRes.data.booktype[0])

          // 處理 bookPushRes
          setBookPushData(bookPushRes.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchBookData()
    }
  }, [book_id])
  // 依賴 book_id, 當 book_id 變動時重新執行

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'></div>
          <div className='col-8 col-xl-7'>
            <div className=' rounded-2 shadow-sm d-flex flex-column '>
              <div>
                <ul className={styles.oldlist}>
                  <li>
                    <button
                      className={oldbooklist === 'pay' ? styles.active : ''}
                      onClick={(e) => {
                        e.preventDefault()
                        setOldbooklist('pay')
                      }}
                    >
                      購買
                    </button>
                  </li>
                  <li>
                    <button
                      className={oldbooklist === 'b' ? styles.active : ''}
                      onClick={(e) => {
                        e.preventDefault()
                        setOldbooklist('b')
                      }}
                    >
                      書籍介紹
                    </button>
                  </li>
                  <li>
                    <button
                      className={oldbooklist === 'comment' ? styles.active : ''}
                      onClick={(e) => {
                        e.preventDefault()
                        setOldbooklist('comment')
                      }}
                    >
                      書籍評論
                    </button>
                  </li>
                </ul>
              </div>
              <div className={styles.oldbookname3}>
                <div className={styles.imagecontainer1}>
                  <img
                    src={`http://localhost:3002/public/img/oldbookimgs/${bookData.book_img_id}`}
                    // src={`http://localhost:3002/public/img/Rectangle213.png`}
                  />
                </div>
              </div>

              <div className={`rounded-2 shadow-sm ${styles.oldbookimg}`}>
                {/*顯示購買的地方 */}
                {oldbooklist === 'pay' && (
                  <div className={styles.oldbookmain}>
                    <div className={`${styles.a1} w-100 px-4`}>
                      <h4 className={styles.oldbookname}>{bookData.b_title}</h4>
                      {/* <CollectButton2  oldBookId={bookData.book_id} /> */}
                      <CollectBtn2 book_id={bookData.book_id} />
                    </div>
                    <div className={styles.a2}>
                      {/* <div className='odbkcontent'>
<span className='odbkcontent1'>書籍類別</span>
&nbsp;&nbsp;&nbsp;{type.b_type_name}{' '}
</div> */}
                      <div className={styles.odbkcontent}>
                        <span className={styles.odbkcontent1}>書本價格</span>
                        &nbsp;&nbsp;&nbsp; {bookData.book_price}元
                      </div>
                      <div className={styles.odbkcontent}>
                        {' '}
                        <span className={styles.odbkcontent1}>書本分類</span>
                        &nbsp;&nbsp;&nbsp;{genre.b_genre_name}{' '}
                      </div>
                      <div className={styles.odbkcontent}>
                        <span className={styles.odbkcontent1}>書本語言</span>
                        &nbsp;&nbsp;&nbsp; {usage.b_language_name}{' '}
                      </div>
                      <div className={styles.odbkcontent}>
                        <span className={styles.odbkcontent1}>出版商社</span>
                        &nbsp;&nbsp;&nbsp; {bookData.b_type_id}{' '}
                      </div>
                      <div className={styles.odbkcontent}>
                        <span className={styles.odbkcontent1}>運送方式</span>
                        &nbsp;&nbsp;&nbsp; 宅配/超商取貨{' '}
                      </div>
                    </div>

                    {/* <div className='a3'>
                      <button className='btn-addAndsub-item subButton'>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                      <input type='text' className='input-box-all' readOnly />
                      <button className='btn-addAndsub-item addButton'>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                    </div> */}
                    <div className={styles.a4}>
                      <h6 className={styles.odbkauthor} title={bookData.author}>
                        作者名字: &thinsp;{bookData.author}
                      </h6>
                      <h6>上架日期: &thinsp;{bookData.sherlf_date}</h6>
                      <h6>ISBN編碼: &thinsp;{bookData.isbn}</h6>
                      {/* <h6>
最後修改日期:
<br />
{bookData.revise_date}
</h6> */}
                    </div>
                    <div className={styles.a5}>
                      <button
                        type='button'
                        onClick={(e) => { authJWT.isAuth !== false ? handleAddCart(bookData) : handleAlert(e)}}
                        className={styles.oldbookcar}
                      >
                        加入購物車
                      </button>

                      {/* <button className='oldbookpay'>直接購買</button> */}
                    </div>
                  </div>
                )}
                {/*介紹的地方 */}
                {oldbooklist === 'b' && (
                  <div className={styles.oldbookintroduce}>           
                    <h5 className={`${styles.bookblurd5} pixel-font-chinese`}><i className="fa-solid fa-book-open me-2">
                    </i>書籍介紹</h5>
                    <div className='mx-3'> {bookData.blurb === ''
                      ? '來這裡找劇透？很遺憾，這位賣家不暴雷！'
                      : bookData.blurb} </div>
                    {/* {bookData.blurb === ''
                      ? '來這裡找劇透？很遺憾，這位賣家不暴雷！'
                      : bookData.blurb} */}
                  </div>
                )}
                {/*產品評價 */}
                {oldbooklist === 'comment' && (
                  <div className={`bookcommentY ${styles.oldbookintroduce}`}>
                    <h5 className={`${styles.bookblurd5} pixel-font-chinese`}>
                      <i className='fa-solid fa-book-open me-2'></i>書籍評論
                    </h5>
                    <ProductComment />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='d-none d-xl-block col'>
            <div className={styles.slideshow123}></div>
          </div>

          {/*------------------------------------------------ */}

          {/* 這個賣場沒用了 :) 白寫了 :):):):):) */}

          {/* <div className='sellerbox'>
<div className='sellermain'>
<div className='sellerimage'>
<img src='https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2020/01/31/20200131-052418_U17017_M588719_cd2e.jpg?itok=s0SyFjTD'
/>
</div>
<div className='sellername'>
<h5>{clientData.client_name}</h5>
<div className='astore'>
<Link href={'/store/' + bookData.client_id}>賣場</Link>
</div>
</div>
</div>
<div className='sellerstar'>
<AiOutlineStar className='star-icon' />
<AiOutlineStar className='star-icon' />
<AiOutlineStar className='star-icon' />
<AiOutlineStar className='star-icon' />
<AiOutlineStar className='star-icon' />
<div className='star-icontext'>4/5</div>
</div>
<div className='sellertwobutton'>
<div className='contact_button'>
<a href=''>
<b>私訊</b>
</a>
</div>
<div className='follow_button'>
<a href=''>
<b>關注</b>
</a>
</div>
</div>
</div> */}
          {/*----------------------------------------- */}
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col'></div>
          <div className='col-11 my-5'>
            <FrontTitle title='推薦給您' icon='fa-solid fa-ranking-star me-2' />
            <div className={`${styles.hotBlock} mx-2 `}>
              {bookPushData.map((item) => {
                return (
                  <div key={item.book_id}>
                    <CommodityPagepush
                      item={item}
                      book_id={item.book_id}
                      total_count={item.total_count}
                      blurb={item.blurb}
                      book_price={item.book_price}
                      book_img_id={item.book_img_id}
                      b_title={item.b_title}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col'></div>
        </div>
      </div>
      <style jsx>{`
      .bookcommentY{
        overflow-y: scroll;
        height:520px;
      }
      `}</style>
    </>
  )
}
