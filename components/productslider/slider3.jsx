"use client";
import ProductSlider from "../slider/Slider";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Blogbox from "./Singleblogbox";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

function ProSlider3({ data }) {

  const getpost = async () => {
    const response = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/posts`
    );
    return response;
  };

  const query = useQuery(["allpost"], getpost, {
    refetchOnWindowFocus: false,
  });

  // if (query.isSuccess) {
  //   console.log(query.data.data);
  // }

  const getrelpost = async (bod) => {
    const response = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/get-related-posts`,
      bod
    );
    return response;
  };

  const query1 = useMutation(getrelpost);

  const func = () => {
    const bod = { goalIds: data.relatedPosts };
    query1.mutateAsync(bod);
  };

  useEffect(() => {
    func();
  }, []);



  return (
    <>
      {query1.isSuccess && (
        <div>
          <ProductSlider
            dir={"horizontal"}
            spacee="30"
            name="مقالات"
            classNamei="mySwiper2"
            firstnum={1}
            secondnum={1}
            lastnum={2}
            lastcol={2}
            over1500={3}
            val1={true}
            index={
              <>
                {query1.data.data.map((item) => (
                  <SwiperSlide key={item._id} className="h-[20rem]">
                    <Link href={`/blog/${item.slug}`}>
                      <Blogbox
                        image={item.image}
                        title={item.title}
                        date={item.updatedAt}
                        teacherName="محمد علی"
                        comment="2"
                        text={item.shortDesc}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </>
            }
          />
        </div>
      )}
    </>
  );
}

export default ProSlider3;
