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
import { useRef } from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ProductSlider2({
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
  name,
}) {
  const swiperRef = useRef(null);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className=" font-bold text-[18px] md:text-[20px] text-gray-200 relative bottom-[6px]">
            | {name}
          </div>
          <div className="flex items-center justify-start flex-row-reverse gap-2">
            <div className=" mb-6 flex items-center justify-end">
              <Button className="h-[32px] text-[13px] md:h-[40px]">مشاهده همه</Button>
            </div>

            <div
              className=" bg-white md:py-2 md:px-2 py-1 px-1 rounded-lg cursor-pointer relative bottom-[12px] "
              id="previousButton"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </div>

            <div
              className=" bg-white md:py-2 md:px-2 py-1 px-1 rounded-lg cursor-pointer relative bottom-[12px] "
              id="nextButton"
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        direction={`${dir}`}
        slidesPerView={slides}
        spaceBetween={spacee}
        speed={1000}
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
