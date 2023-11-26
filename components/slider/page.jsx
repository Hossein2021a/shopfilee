"use client";

import ProductSlider from "./Slider";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";

function MainSlider() {
  const getAllMainBanner = async () => {
    const response = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/get-active-sliders"
    );
    return response;
  };

  const { data, isSuccess, isLoading } = useQuery(
    ["middleBanner"],
    getAllMainBanner
  );



  return (
    <div>
      {isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}
      {isSuccess && (
        <ProductSlider
          dir={"horizontal"}
          spacee="0"
          classNamei="mySwiper2"
          firstnum={1}
          secondnum={1}
          lastnum={1}
          lastcol={1}
          over1500={1}
          val1={true}
          index={
            <>
              {data.data.map((item) => (
                <SwiperSlide key={item._id} className="">
                  <img
                    src={`${item.image}`}
                    alt={item.imageAlt}
                    priority
                    width={0}
                    height={0}
                    sizes="100vw"
                    className = "w-full h-[134px] sm:h-auto rounded-md shadow-lg"
                  />
                </SwiperSlide>
              ))}
            </>
          }
        />
      )}
    </div>
  );
}

export default MainSlider;
