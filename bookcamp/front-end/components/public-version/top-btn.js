import { useEffect, useState } from 'react'

export default function TopBtn() {
  // 狀態變量，用於控制按鈕的可見性
  const [isVisible, setIsVisible] = useState(false)

  // 滾動事件處理函數
  const handleScroll = () => {
    if (window.scrollY >= 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // 添加滾動事件監聽
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // 清理副作用
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 滾動到頂部的函數
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滾動效果
    })
  }

  return (
    <>
      <button
        type='button'
        className={`top-btn ${isVisible ? 'd-flex' : 'd-none'}`}
        onClick={scrollToTop}
      >
        <img src='/img/icon-pixel/topbtn.svg' />
        <span className='pixel-font-chinese'>TOP</span>
      </button>
    </>
  )
}
