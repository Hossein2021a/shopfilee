"use client";

import { Swiper } from "swiper/react";
import {
  Mousewheel,
  Pagination,
  EffectFade,
  Navigation,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProductSlider({
  dir,
  slides,
  classNamei,
  index,
  eff,
  spacee,
  firstnum,
  secondnum,
  lastnum,
  lastcol,
  val1,
  over1500,
  navVal
}) {
  const swiperRef = useRef(null);

  return (
    <>
      <Swiper
        ref={swiperRef}
        direction={`${dir}`}
        slidesPerView={slides}
        spaceBetween={spacee}
        speed={1000}
        navigation={{ enabled: true }}
        initialSlide={0}
        dir="rtl"
        effect={`${eff}`}
        pagination={{
          clickable: true,
          dynamicBullets: val1,
          dynamicMainBullets: 2,
        }}
        breakpoints={{
          640: {
            slidesPerView: firstnum,
          },
          868: {
            slidesPerView: secondnum,
          },
          1024: {
            slidesPerView: lastnum,
          },
          1250: {
            slidesPerView: lastcol,
          },
          1500: {
            slidesPerView: over1500,
          },
        }}
        modules={[Mousewheel, Pagination, EffectFade, Navigation, A11y]}
        className={`${classNamei}`}
      >
        {index}
      </Swiper>
    </>
  );
}
