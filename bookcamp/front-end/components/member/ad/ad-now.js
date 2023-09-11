import { useState, useEffect } from 'react'
import styles from './seller-ad.module.css'
import axios from 'axios'

export default function AdNow() {
  const [advertises, setAdvertises] = useState([])
  const [adStatus, setAdStatus] = useState([])
  const [transitioning, setTransitioning] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const param = {
          client_id: 33,
        }
        const response = await axios.post(
          'http://localhost:3002/advertise/ad_list',
          param,
        )
        setAdvertises(response.data.data)
        setAdStatus(response.data.data.map((v) => v.ad_status))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleStatus = async (ad_id, index) => {
    const newStatus = [...adStatus]
    newStatus[index] = !newStatus[index]
    setAdStatus(newStatus)

    const newAdStatusValue = newStatus[index] ? 1 : 0

    try {
      const response = await axios.post(
        'http://localhost:3002/advertise/status_change',
        {
          ad_id: ad_id,
          client_id: 33,
          ad_status: newAdStatusValue,
        },
      )

      if (response.data.success) {
        setTransitioning(index) // 設置過渡
        setTimeout(() => {
          setTransitioning(null) // 清除過渡
        }, 1000)
      } else {
        console.error('Failed to update ad status on the server.')
        newStatus[index] = !newStatus[index]
        setAdStatus(newStatus)
      }
    } catch (error) {
      console.error('Error updating ad status:', error)
    }
  }

  return (
    <>
      <div className={`${styles.offset} row`}>
        <div className={styles.adHeader}>
          <div className={styles.adHeaderGrid}>廣告圖片</div>
          <div className={styles.adHeaderGrid}>標題</div>
          <div className={styles.adHeaderGrid}>刊登時間</div>
          <div className={styles.adHeaderGrid}>狀態</div>
        </div>
        <div className={`${styles.mainAd} px-md-4`}>
          {advertises.map((v, index) => (
            <div
              className={`${styles.adProduct} pixel-box--white ${
                adStatus[index] ? '' : styles.closeState
              }`}
              key={v.ad_id}
            >
              <div className={`${styles.adProductGrid} ${styles.adProductImg}`}>
                <img src={`/img/all-ad/${v.ad_img_url}`} width='100%' alt='' />
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
                <div className='d-flex flex-column align-items-center'>
                  <span className={`${styles.dataTitle} d-md-none`}>
                    刊登時間
                  </span>
                  <span>
                    {v.startTime.replace(/-/g, '/')}~
                    {v.endTime.replace(/-/g, '/')}
                  </span>
                </div>
              </div>
              <div
                className={`${styles.adProductGrid} ${styles.adProductState}`}
              >
                <div className='col my-auto'>
                  {adStatus[index] !== 2 ? (
                    <>
                      {transitioning === index ? (
                        <div className={`${styles.transition}`}></div>
                      ) : (
                        <label className={`${styles.switchod}`}>
                          <input
                            className='form-check-input m-auto'
                            name='open-state'
                            type='checkbox'
                            checked={adStatus[index]}
                            onChange={() => handleStatus(v.ad_id, index)}
                          />
                          <span className={styles.slider} />
                        </label>
                      )}
                    </>
                  ) : (
                    <span className='fw-bold'>審核中</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <a href='/member/seller/ad-add'>
        <button
          className={`${styles.addBtn} main-btn pixel-border-yellow m-bg-yellow`}
          type='button'
        >
          <span>立即刊登</span>
          <i className='fa-solid fa-plus ms-md-3'></i>
        </button>
      </a>
    </>
  )
}
