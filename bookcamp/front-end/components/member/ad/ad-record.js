import { useState, useEffect } from 'react'
import styles from './seller-ad-record.module.css'
import axios from 'axios'

export default function AdRecord() {
  const [adRecord, setAdRecord] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let param = {
          client_id: 33, // 到時要換成實際的會員id
        }
        const response = await axios.post(
          `http://localhost:3002/advertise/ad_record`,
          param,
        )
        setAdRecord(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className={`${styles.offset} row`}>
        <div className={styles.adHeader}>
          <div className={styles.adHeaderGrid}>廣告圖片</div>
          <div className={styles.adHeaderGrid}>標題</div>
          <div className={styles.adHeaderGrid}>刊登時間</div>
          <div className={styles.adHeaderGrid}>點擊量</div>
          <div className={styles.adHeaderGrid}>刊登次數</div>
        </div>

        <div className={`${styles.mainAdRecord} px-md-4`}>
          {adRecord.map((v, index) => (
            <div
              className={`${styles.adProduct} pixel-box--white`}
              key={v.ad_id}
            >
              <div className={`${styles.adProductGrid} ${styles.adProductImg}`}>
                <img
                  src={`http://localhost:3002/public/img/ad/${v.ad_img_url}`}
                  width='100%'
                  alt=''
                />
              </div>
              <div
                className={`${styles.adProductGrid} ${styles.adProductName} ${styles.titleType}`}
              >
                <div>{v.ad_title}</div>
                {/* <div className='class-frame mt-0 mt-md-2'>兒童文學</div> */}
              </div>
              <div
                className={`${styles.adProductGrid} ${styles.adProductDate}`}
              >
                {v.startTime.replace(/-/g, '/')}~{v.endTime.replace(/-/g, '/')}
              </div>
              <div
                className={`${styles.adProductGrid} ${styles.adProductClick}`}
              >
                <span className={`${styles.titleS} d-md-none`}>點擊量</span>
                {v.click_amount}
              </div>
              <div
                className={`${styles.adProductGrid} ${styles.adProductPublish}`}
              >
                <span className={`${styles.titleS} d-md-none`}>刊登數</span>
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.addBtn} main-btn pixel-border-yellow m-bg-yellow`}
        type='button'
      >
        查看圖表
        <i className='fa-solid fa-chart-simple ms-3'></i>
      </button>
    </>
  )
}
