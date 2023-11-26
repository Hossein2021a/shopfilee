"use client";

import ProductSlider2 from "../slider/Slider2";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Blogbox from "./Singleblogbox";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";


function ProSlider2() {
  const getAllPost = async () => {
    const response = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/get-new-posts"
    );
    return response;
  };

  const { data, isSuccess, isLoading } = useQuery(["allactivepos"], getAllPost);


 
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}

      {isSuccess && (
        <ProductSlider2
          dir={"horizontal"}
          spacee="30"
          name="مقالات"
          classNamei="mySwiper2"
          firstnum={2}
          secondnum={2}
          lastnum={3}
          lastcol={4}
          over1500={5}
          val1={true}
          index={
            <>
              {data.data.map(
                (item) =>
                    <SwiperSlide key={item._id} className="h-[20rem]">
                                          <Link href={`/blog/${item.slug}`}>

                      <Blogbox
                        image={item.image}
                        title={item.title}
                        date={item.createdAt}
                        teacherName="محمد علی"
                        comment={0}
                        text={item.longDesc}
                      />
                                          </Link>

                    </SwiperSlide>
                  
              )}
            </>
          }
        />
      )}
    </div>
  );
}

export default ProSlider2;
