import React, { useRef, useState } from 'react'
import styles from './dms.module.css'

function Carousel() {
  const carouselSlideRef = useRef(null)
  const [counter, setCounter] = useState(1)

  const nextSlide = () => {
    const carouselImages = carouselSlideRef.current.querySelectorAll('img')
    const size = carouselImages[0].clientWidth

    if (counter >= carouselImages.length - 1) return

    setCounter((prevCounter) => prevCounter + 1)
    carouselSlideRef.current.style.transform = `translateX(${
      -size * (counter + 1)
    }px)`
  }

  const prevSlide = () => {
    const carouselImages = carouselSlideRef.current.querySelectorAll('img')
    const size = carouselImages[0].clientWidth

    if (counter <= 0) return

    setCounter((prevCounter) => prevCounter - 1)
    carouselSlideRef.current.style.transform = `translateX(${
      -size * (counter - 1)
    }px)`
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.carousel}-container`}>
        <div className={`${styles.carousel}-slide`} ref={carouselSlideRef}>
          <img src='/test/dm1.png' alt='Slide 1' />
          <img src='/test/dm2.png' alt='Slide 2' />
          <img src='/test/dm3.png' alt='Slide 3' />
        </div>
      </div>
      <div className={`${styles.btn}`}>
        <a id='prevBtn' onClick={prevSlide}>
          &lt;
        </a>
        <a id='nextBtn' onClick={nextSlide}>
          &gt;
        </a>
      </div>
    </div>
  )
}

export default Carousel
