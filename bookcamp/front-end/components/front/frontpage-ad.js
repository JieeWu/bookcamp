import { useState, useEffect } from 'react'
import styles from './front-page.module.css'
import Link from 'next/link'
import axios from 'axios'

export default function FrontPageAd(props) {
  const [advertises, setAdvertises] = useState([])
  const [book, setBook] = useState([])
  const [low, setLow] = useState([])

  // 輪播大圖廣告
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:3002/advertise/ad_size`)
          .then((res) => {
            setAdvertises(res.data.adData.data)
            setBook(res.data.book.book_id)
            setLow(res.data.lowprice.book_id)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {/* 首頁廣告區 */}
      <div>
        <div className='d-flex justify-content-between mt-2'>
          <button
            className={`${styles.adDecorateBtn} ${styles.adDecorateBtnRe} carousel-control-prev d-lg-flex`}
            type='button'
            data-bs-target='#carouselInterval'
            data-bs-slide='prev'
          >
            <div>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
            <div className={styles.nextCenter}>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
            <div>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
          </button>
          <div className={`col-12 col-lg-10 ${styles.adDecorate} boder-pixel`}>
            <div className={styles.carouselImg}>
              <div
                id='carouselInterval'
                className='carousel carousel-dark slide'
                data-bs-ride='carousel'
              >
                <div className='carousel-inner'>
                  {advertises
                    ? advertises.map((v, i) => {
                        return (
                          <div
                            className={
                              i == 0 ? 'carousel-item active' : 'carousel-item'
                            }
                            data-bs-interval='3000'
                            key={v.ad_id}
                          >
                            <Link
                              href={
                                v.client_id !== null
                                  ? `/store/${v.client_id}`
                                  : v.ad_class === 'class'
                                  ? `/newbook?b_genre_id=${v.b_genre_id}`
                                  : `/newbook/${v.book_id}`
                              }
                            >
                              <picture className='d-block w-100'>
                                <source
                                  srcSet={`http://localhost:3002/public/img/ad/${v.ad_img_urls.find(
                                    (url) => url.includes('1200x300'),
                                  )}`}
                                  media='(min-width: 768px)'
                                />
                                <source
                                  srcSet={`http://localhost:3002/public/img/ad/${v.ad_img_urls.find(
                                    (url) => url.includes('800x300'),
                                  )}`}
                                  media='(min-width: 540px)'
                                />
                                <img
                                  src={`http://localhost:3002/public/img/ad/${v.ad_img_urls.find(
                                    (url) => url.includes('300x300'),
                                  )}`}
                                  alt=''
                                  width='100%'
                                />
                              </picture>
                            </Link>
                          </div>
                        )
                      })
                    : ''}
                </div>
              </div>
            </div>
          </div>
          <button
            className={`${styles.adDecorateBtn} carousel-control-next d-lg-flex`}
            type='button'
            data-bs-target='#carouselInterval'
            data-bs-slide='next'
          >
            <div>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
            <div>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
            <div>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
          </button>
        </div>
        <div
          className={`${styles.registerBlock} d-md-none m-bg-orange pixel-border-orange-s`}
        >
          <div className={`${styles.registerText}`}>
            <span>初來書營 ?</span>
            <span>加入會員立刻送禮券 !</span>
          </div>
          <Link
            href='/member/login'
            className='rounded-pill text-orange fw-bold px-4 py-2 bg-white'
          >
            立即加入<i className='fa-solid fa-arrow-pointer ms-2'></i>
          </Link>
        </div>
        <div className='d-flex my-3'>
          {/* top10廣告 */}
          <div className='col-6 col-md-4 col-xl-4'>
            <div
              className={`${styles.BottomAd} ${styles.top10AdBlock} me-2 me-md-0`}
            >
              <Link className='d-flex text-white h-100' href='#'>
                <div
                  className={`${styles.topText} col col-xl-5 ps-5 pe-5 pe-xl-0`}
                >
                  <h5 className='fw-bold mb-2 text-yellow pixel-font-chinese'>
                    <div className='font-l me-2'>TOP10</div>
                    <span className='text-center'>十大必讀精選</span>
                  </h5>
                  <p className={`${styles.adText} d-none d-md-block`}>
                    「十大必讀精選」是一份包含了最值得閱讀的十本書籍清單，提供了精心挑選的內容
                  </p>
                </div>
                <div className='d-none d-xl-block col-xl-7'>
                  <img
                    className={`${styles.top10Img} pt-4`}
                    src='/img/test/戀愛使用說明書1.png'
                  />
                </div>
              </Link>
            </div>
          </div>
          {/* 熱搜廣告 */}
          <div
            className={`${styles.BottomAd} ${styles.hotAd} col-6 col-md-4 col-xl-3 py-1`}
          >
            <div
              className={`${styles.registerBlock} d-none d-md-flex flex-xl-row m-bg-orange pixel-border-orange-s`}
            >
              <div
                className={`${styles.registerText} flex-xl-column mb-2 mb-xl-0`}
              >
                <span className='d-none d-xl-flex'>初來書營 ?</span>
                <span className='ms-2 ms-xl-0'>加入會員立刻送禮券 !</span>
              </div>
              <Link
                href='/member/login'
                className='rounded-pill text-orange fw-bold px-4 py-2'
              >
                立即加入<i className='fa-solid fa-arrow-pointer ms-2'></i>
              </Link>
            </div>
            <Link className='mt-0 mt-md-3 h-100' href='/newbook?b_genre_id=1'>
              <div
                className={`${styles.wellBook} px-5 px-md-3 px-xl-4 pixel-border-yellow-s`}
              >
                <h5 className='d-flex flex-column align-items-center flex-md-row pixel-font-chinese mb-md-2 ms-md-2'>
                  <i className='fa-solid fa-crown me-2'></i>
                  <span className='fw-bold m-0 mt-2 mt-md-0'>最新熱搜排行</span>
                </h5>
                <p className='d-none d-md-block px-4'>
                  探索當下最受矚目的書籍，了解讀者間熱切討論的新作品和趨勢。
                </p>
              </div>
            </Link>
          </div>
          {/* 隨機廣告 */}
          <div
            className={`${styles.BottomAd} col-md-4 col-xl-3 d-none d-md-block px-0`}
          >
            <div className={styles.lightTube}>
              <Link className={styles.ad3} href={`newbook/${low}`}>
                <img src='/img/test/300x300_ad_6.jpg' />
              </Link>
            </div>
          </div>
          {/* 找書連結 */}

          <div className='d-none d-xl-block col-xl-2 position-relative'>
            <Link className={styles.searchBook} href={`newbook/${book}`}>
              <img src='img/comp1.gif' alt='Transparent Animation' />
              <div className={`${styles.searchBookText} fw-bold`}>找好書?</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
