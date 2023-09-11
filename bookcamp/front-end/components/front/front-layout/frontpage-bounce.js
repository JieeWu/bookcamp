import { useState, useEffect } from 'react'
import styles from './front-page-bounce.module.css'

export default function FrontpageBounce() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY // 取得當前位置
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      ) // 獲得總高度

      // 根據滾動位置和滾動方向決定是否隱藏元素
      if (scrollPosition >= documentHeight * 0.75) {
        // 95vh
        setIsVisible(false)
      } else if (scrollPosition < lastScrollPosition) {
        // 往上滾動時重新出現
        setIsVisible(true)
      }

      setLastScrollPosition(scrollPosition) // 更新上次滾動位置
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollPosition])

  return (
    <>
      <div
        className={`${styles.animatedElement} ${
          isVisible ? styles.visible : styles.hidden
        }`}
      >
        <div className={`${styles.popupBlock} d-none d-md-block fixed-bottom`}>
          <div className='row flex-column'>
            <div className='d-flex p-0'>
              <div className={`${styles.bounceDecorateL} align-self-end`}></div>
              <div className={styles.directoryArea}>
                <i className='fa-solid fa-caret-down me-3'></i>
                <span>分類目錄</span>
                <i className='fa-solid fa-caret-down ms-3'></i>
              </div>
              <div className={`${styles.bounceDecorateR} align-self-end`}></div>
            </div>
            <div className='d-flex p-0'>
              <div className={styles.bounceBlock}>
                <a className='font-m' type='button' href='#server1'>
                  <i className='fa-solid fa-play me-3'></i>
                  <i className='fa-solid fa-umbrella-beach me-2'></i>
                  活動專區
                </a>
              </div>
              <div className={styles.bounceBlock}>
                <a className='font-m' type='button' href='#server2'>
                  <i className='fa-solid fa-play me-3'></i>
                  <i className='fa-solid fa-ranking-star me-2'></i>
                  熱銷榜
                </a>
              </div>
              <div className={styles.bounceBlock}>
                <a className='font-m' type='button' href='#server3'>
                  <i className='fa-solid fa-play me-3'></i>
                  <i className='fa-solid fa-book me-2'></i>
                  中文書類
                </a>
              </div>
              <div className={styles.bounceBlock}>
                <a className='font-m' type='button' href='#server4'>
                  <i className='fa-solid fa-play me-3'></i>
                  <i className='fa-solid fa-book-bookmark me-2'></i>
                  英文書類
                </a>
              </div>

              <div className={styles.bounceBlock}>
                <a className='font-m' type='button' href='#server5'>
                  <i className='fa-solid fa-play me-3'></i>
                  <i className='fa-solid fa-comment-dots me-2'></i>
                  互動交流
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
