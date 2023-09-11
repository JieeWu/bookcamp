import react, { useState, useEffect } from 'react'
import styles from './front-page-activity.module.css'
import CommodityPage from '@/components/share/commodity/commodity-page'
import FrontTitle from '@/components/share/front-title'
import axios from 'axios'

export default function FrontPageActivity(props) {
  const [backgroundColor, setBackgroundColor] = useState('var(--main-orange)')
  const [remainingTime, setRemainingTime] = useState(4 * 60 * 60) // 4小時轉換為秒數

  // 活動專區-最新上架
  const [activity, setActivity] = useState([])

  // select抓的
  const [option, setOption] = useState(1)

  // 設定顏色
  const handleButtonClick = (color) => {
    setBackgroundColor(color)
  }
  // 設定文字
  const handleButtonText = (text) => {
    if (!text.target.value && text.target.value == undefined) {
      const getText = text.target.textContent
      const newText = getText.slice(0, 4)
      getData(newText)
    } else if (text.target.value) {
      const getValue = text.target.value
      getData(getValue)
      setOption(getValue)
    }
  }

  // 首次進入網頁-抓到資料-最新上架
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/share/activity')
          .then((res) => {
            setActivity(res.data.activity)
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

  // 觸發按鈕後-重新渲染的頁面
  const getData = async (data) => {
    try {
      await axios
        .post(
          'http://localhost:3002/share/activity',
          { data },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((res) => {
          setActivity(res.data.activity)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  //倒數器
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1)
      }
    }, 1000) // 每秒更新一次

    // 在組件卸載時清除 interval
    return () => {
      clearInterval(interval)
    }
  }, [remainingTime])

  const formatNumber = (number) => {
    return number.toString().padStart(2, '0')
  }

  // 樣式
  const pageSpacing = {
    marginTop: '10vh',
  }
  return (
    <>
      <div className='row' style={pageSpacing} id={props.id}>
        <div className='d-none d-md-block header-height'></div>
        <div className='col'></div>
        <div className='col-12 col-xl-10'>
          {/* 頁面標題 */}
          <FrontTitle title='活動專區' icon='fa-solid fa-umbrella-beach me-2' />
          <div
            className={`${styles.activityBlock} row boder-pixel-w`}
            style={{ backgroundColor }}
          >
            <div
              className={`${styles.sideDecorativeBlock} col d-none d-md-flex`}
            >
              <div className='shape1'></div>
              <div className='shape2-3-block'>
                <div className='shape2 d-bg-purple me-3'></div>
                <div className='shape3 d-bg-purple'></div>
              </div>
            </div>
            <div className='col-12 col-md-9 position-relative'>
              {/* 活動內容按鈕 */}
              <div className={`${styles.btnGroup} px-3`}>
                <div className='row justify-content-around'>
                  {/* 最新上架 */}
                  <button
                    value='4'
                    className={`${styles.actBtn} ${styles.actBtn1} col m-bg-orange pixel-border-orange`}
                    onClick={(e) => {
                      handleButtonClick('var(--main-orange)')
                      handleButtonText(e)
                    }}
                  >
                    <div className='d-flex flex-column flex-xl-row align-items-center'>
                      <h5 className={`${styles.titleText} flex-md-row mb-xl-0`}>
                        <i className='fa-regular fa-calendar-plus me-2 d-none d-md-block'></i>
                        <i className='fa-regular fa-calendar-plus mb-2 font-xl d-md-none'></i>
                        <span>最新上架</span>
                      </h5>
                      <select
                        defaultValue={option}
                        className={`${styles.formSelect} d-none d-md-flex ms-0 ms-xl-auto out-time-pixel`}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        onChange={(e) => {
                          handleButtonText(e)
                          handleButtonClick('var(--main-orange)')
                        }}
                      >
                        <option disabled>請選擇</option>
                        <option value='1'>當月</option>
                        <option value='2'>當周</option>
                        <option value='3'>當日</option>
                      </select>
                    </div>
                  </button>

                  {/* 限時搶購 */}
                  <button
                    value='5'
                    className={`${styles.actBtn} col ${styles.actBtn2} m-bg-yellow pixel-border-yellow mx-4`}
                    onClick={(e) => {
                      try {
                        handleButtonClick('var(--main-yellow)')
                        handleButtonText(e)
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  >
                    <div className='d-flex flex-column flex-xl-row align-items-center'>
                      <h5 className={`${styles.titleText} flex-md-row mb-xl-0`}>
                        <i className='fa-solid fa-stopwatch-20 me-2 d-none d-md-block'></i>
                        <i className='fa-solid fa-stopwatch-20 mb-2 font-xl d-md-none'></i>
                        <span>限時搶購</span>
                      </h5>
                      <div className='d-none d-md-flex align-items-center ms-0 ms-xl-auto'>
                        倒數
                        <span
                          className={`${styles.outTime} out-time-pixel bg-black ms-2`}
                        >
                          {formatNumber(Math.floor(remainingTime / 3600))}
                        </span>
                        <span
                          className={`${styles.outTime} out-time-pixel bg-black mx-3`}
                        >
                          {formatNumber(
                            Math.floor((remainingTime % 3600) / 60),
                          )}
                        </span>
                        <span
                          className={`${styles.outTime} out-time-pixel bg-black`}
                        >
                          {formatNumber(remainingTime % 60)}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* 熱門推薦 */}
                  <button
                    value='6'
                    className={`${styles.actBtn} col ${styles.actBtn3} c-bg-purple pixel-border-purple`}
                    onClick={(e) => {
                      try {
                        handleButtonClick('var(--main-colorpurple)')
                        handleButtonText(e)
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  >
                    <div className='d-flex flex-column flex-xl-row align-items-center'>
                      <h5
                        className={`${styles.titleText} flex-md-row mb-xl-0 text-white`}
                      >
                        <i className='fa-solid fa-fire-flame-curved me-2 d-none d-md-block'></i>
                        <i className='fa-solid fa-fire-flame-curved mb-2 font-xl d-md-none'></i>
                        <span
                          onClick={(e) => {
                            handleButtonText(e)
                          }}
                        >
                          熱門推薦
                        </span>
                      </h5>
                      <span
                        className={`${styles.RecCitation} d-none d-md-flex ms-xl-auto pixel-font-chinese`}
                      >
                        好書都在這 !
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 手機板倒數區塊 */}
              <div className={`${styles.phoneReciprocal} d-md-none`}>
                <select
                  defaultValue='1'
                  className={`${styles.formSelect} d-flex mx-3 py-2 out-time-pixel`}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  onChange={(e) => {
                    handleButtonText(e)
                  }}
                >
                  <option disabled>請選擇</option>
                  <option value='1'>當月</option>
                  <option value='2'>當周</option>
                  <option value='3'>當日</option>
                </select>
              </div>
              {/* <div className={`${styles.phoneReciprocal} d-md-none`}>
                倒數
                <span
                  className={`${styles.outTime} out-time-pixel bg-black ms-2`}
                >
                  {formatNumber(Math.floor(remainingTime / 3600))}
                </span>
                <span
                  className={`${styles.outTime} out-time-pixel bg-black mx-3`}
                >
                  {formatNumber(Math.floor((remainingTime % 3600) / 60))}
                </span>
                <span className={`${styles.outTime} out-time-pixel bg-black`}>
                  {formatNumber(remainingTime % 60)}
                </span>
              </div> */}

              {/* 顯示商品區塊 */}
              <div className={`${styles.commodityArea} d-bg-purple p-2`}>
                {activity.map((item) => {
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
            <div
              className={`${styles.sideDecorativeBlock} col d-none d-md-flex`}
            >
              <div className='shape4-block mb-auto'>
                <div className='shape4 bg-white mb-3'></div>
                <div className='shape4 bg-white mb-3'></div>
                <div className='shape4 bg-white'></div>
              </div>
              <div className='shape5 line-orange'></div>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
