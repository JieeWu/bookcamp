import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import styles from './front-page-hotlist.module.css'
import FrontTitle from '@/components/share/front-title'
import 'slick-carousel/slick/slick.css'
// import CarouselBook from '@/components/decorate/carousel-book'
import CommodityPageBig from '@/components/share/commodity/commodity-page-big'

export default function HotList(props) {
  const pageSpacing = {
    marginTop: '10vh',
  }
  // 熱銷榜的書
  const [hotList, setHotList] = useState([])
  // 抓到資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/share/hotList')
          .then((res) => {
            setHotList(res.data.hot)
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

  const [slidesToShow, setSlidesToShow] = useState(1.2) // 初始值為 1

  useEffect(() => {
    // 監聽螢幕寬度的變化
    const handleResize = () => {
      // 根據螢幕寬度設置展示的張數
      if (window.innerWidth >= 1400) {
        setSlidesToShow(4)
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2.5)
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(1.7)
      } else {
        setSlidesToShow(1.2)
      }
    }

    // 監聽窗口大小變化事件
    window.addEventListener('resize', handleResize)

    // 初始調用一次以設置初始值
    handleResize()

    // 清除事件監聽
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: 'linear',
  }

  return (
    <div
      className='row flex-column flex-xl-row'
      style={pageSpacing}
      id={props.id}
    >
      <div className='d-none d-md-block header-height-L'></div>
      {/* 頁面標題 */}
      <div className='col-12 mb-5'>
        <FrontTitle title='熱銷榜' icon='fa-solid fa-ranking-star me-2' />
      </div>
      <div className={`${styles.side} col-1 m-bg-purple boder-pixel`}>
        <div className='shape4-block mb-auto'>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white'></div>
        </div>
        <div className='shape4-block'>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white'></div>
        </div>
      </div>
      <div className='col-12 col-xl-10 px-0'>
        <div className={`${styles.hotBlock} d-bg-purple`}>
          <Slider {...settings} className={styles.customSlider}>
            {hotList.map((item, index) => {
              return (
                <CommodityPageBig
                  item={item}
                  book_id={item.book_id}
                  total_count={item.total_count}
                  blurb={item.blurb}
                  book_price={item.book_price}
                  book_img_id={item.book_img_id}
                  b_title={item.b_title}
                  key={item.book_id}
                  index={index}
                />
              )
            })}
          </Slider>
        </div>
      </div>

      <div className={`${styles.side} col-1 m-bg-purple boder-pixel`}>
        <div className='shape4-block mb-auto'>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white'></div>
        </div>
        <div className='shape4-block'>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white mb-2'></div>
          <div className='shape4 bg-white'></div>
        </div>
      </div>
    </div>
  )
}
