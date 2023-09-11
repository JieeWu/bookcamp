import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import CommodityPageBig from '@/components/bookcamp-commodity/commodity-page-big'

import '@/styles/styles.module.css'

// import required modules
import { Pagination } from 'swiper/modules'

export default function carouselBook() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
        <SwiperSlide>
          <CommodityPageBig />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
