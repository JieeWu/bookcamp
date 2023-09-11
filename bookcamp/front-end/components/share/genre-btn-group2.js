import React, { useRef, useEffect, useState } from 'react'
import styles from '@/components/front/front-page-language2.module.css'

export default function GenreBtnGroup2(props) {
  const genreBtnGroupRef = useRef(null)

  const [containerWidth, setContainerWidth] = useState(0)

  const scrollLeft = () => {
    if (genreBtnGroupRef.current) {
      genreBtnGroupRef.current.scrollLeft -= containerWidth / 3
    }
  }

  const scrollRight = () => {
    if (genreBtnGroupRef.current) {
      genreBtnGroupRef.current.scrollLeft += containerWidth / 3
    }
  }

  useEffect(() => {
    genreBtnGroupRef.current = document.querySelector(
      `.${styles.bookGenreBtnGroup}`,
    )
  }, []) // 設置為空陣列以確保只執行一次
  useEffect(() => {
    if (genreBtnGroupRef.current) {
      // 設定整個容器的寬度
      setContainerWidth(genreBtnGroupRef.current.offsetWidth)
    }
  }, [genreBtnGroupRef])
  return (
    <>
      <div className='d-flex d-bg-purple pixel-d-purple mb-3'>
        <button className='back-btn' type='button' onClick={scrollLeft}>
          <img src='/img/icon-pixel/diamond.svg' />
        </button>
        <div
          className={`${styles.bookGenreBtnGroup} d-bg-purple pixel-d-purple`}
        >
          {props.category.map((v, i) => {
            return (
              <button
                key={i}
                className={`${styles.pixelBorderYellow} col-3 text-nowrap`}
                type='button'
                id={v.b_genre_id}
                onClick={(e) => {
                  e.target.id
                  props.categoryData(e)
                }}
              >
                {v.b_genre_name}
              </button>
            )
          })}
        </div>
        <button className='next-btn' type='button' onClick={scrollRight}>
          <img src='/img/icon-pixel/diamond.svg' />
        </button>
      </div>
    </>
  )
}