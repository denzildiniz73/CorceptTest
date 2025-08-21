'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';
import GlassCard from '../GlassCard';
import H4 from '../Typography/H4';
import P from '../Typography/P';

const ProgressSliderWithTitleAndDescription = ({data}) => {
  return (
    <>
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            type: 'progressbar',
            el: '.swiper-pagination-custom',
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="specialist-swiper"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <GlassCard className="rounded-[16px] border border-white bg-white/65 backdrop-blur-[30px] px-[24px] py-[56px] flex flex-col items-center justify-start user-select-none cursor-pointer min-h-[389px]">
                {item?.title && <H4 className="text-center font-ofeliaText text-green text-[18px] leading-[26px] font-medium user-select-none">{item.title}</H4>}
                {item?.description && <P className='user-select-none text-center font-mundial text-[16px] leading-[140%] tracking-[0.48px] text-brown font-light mt-4'>{item.description}</P>}
              </GlassCard>
            </SwiperSlide>
          ))}
        </Swiper>
 
        {/* Custom Progress Bar */}
        <div className="mt-8 relative flex items-center gap-4">
          <div className="swiper-pagination-custom"></div>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-4">
            <button className="swiper-button-prev-custom w-[44px] h-[44px] bg-popstar-light hover:bg-popstar text-white rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer">
              <img src="/images/icons/prev.svg" alt="arrow-left" className="w-5 h-5" />
            </button>
            <button className="swiper-button-next-custom w-[44px] h-[44px] bg-popstar-light hover:bg-popstar text-white rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer border border-popstar">
              <img src="/images/icons/next.svg" alt="arrow-right" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProgressSliderWithTitleAndDescription
