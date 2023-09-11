import React, { useEffect, useState } from 'react'
import styles from './rankbookblock.module.css'
import CommodityPage from '@/components/share/commodity/commodity-page'
import axios from 'axios'

export default function RankBookBlock() {
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

  return (
    <>
      <div className={`${styles.rankBlock} d-flex c-bg-purple boder-pixel-w`}>
        <div className='col'>
          <div className='d-flex flex-column h-100 p-3'>
            <div className='my-auto'>
              <div className={styles.rankTitle}>
                <div className={`${styles.rankIcon} boder-pixel-w`}>
                  <i className='fa-solid fa-ranking-star'></i>
                </div>
                <h4 className='pixel-font-chinese'>熱銷排行</h4>
              </div>
              <div className='px-5' hidden>
                <select
                  defaultValue='1'
                  className={`${styles.formSelect} d-md-flex out-time-pixel`}
                  aria-label='Default select example'
                  
                >
                  <option>當月</option>
                  <option value='1'>當周</option>
                  <option value='2'>當日</option>
                </select>
              </div>
            </div>
            <div className='d-flex mt-auto'>
              <div className='shape2 bg-black me-3'></div>
              <div className='shape3 bg-black'></div>
            </div>
          </div>
        </div>
        <div className='col-9'>
          <div className={`${styles.rankCommodityBlock} d-bg-purple`}>
            <div className={`${styles.ranking} pixel-font-chinese`}>
              <div>No.1</div>
              <div>No.2</div>
              <div>No.3</div>
              <div>No.4</div>
              <div>No.5</div>
            </div>

            {hotList.slice(0, 5).map((item, i) => {
              return (
                <CommodityPage
                  rwd='col-6 col-md-4 col-xl-3 col-xxl-2'
                  item={item}
                  book_id={item.book_id}
                  b_title={item.b_title}
                  book_price={item.book_price}
                  book_img_id={item.book_img_id}
                  key={item.book_id}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
