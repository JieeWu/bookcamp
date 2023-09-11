import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import styles from './newbook-top-ad.module.css'

import { Autoplay, Pagination } from 'swiper/modules'

export default function NewBookTopAd() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
        autoplay={{
          delay: 3000, // 輪播之間的時間間隔（以毫秒為單位）
          disableOnInteraction: true, // 使用者互動後是否暫停自動輪播
        }}
        loop={true}
      >
        <SwiperSlide className={styles.swiperSlide}>
          {/* <img src='http://localhost:3002/public/img/ad/800x300_ad_1.jpg' /> */}
          <img src='/img/all-ad/800x300_ad_1.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_2.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_3.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_4.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_5.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_6.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_7.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_8.jpg' />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src='/img/all-ad/800x300_ad_9.jpg' />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
