"use client";
import Breadcrump from "@/components/Breadcrunb/page";
import Image from "next/image";
import ProSlider3 from "@/components/productslider/slider3";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

const SingleBlogPage = ({ params }) => {
  const queryClient = useQueryClient();

  const [param, setparams] = useState("");

  const getdata = async () => {
    const response = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-post/${params.singleblog}`
    );
    return response;
  };
  const { data, isSuccess, isLoading } = useQuery(["post"], getdata, {
    refetchOnWindowFocus: false,
  });

  // if (isSuccess) {
  //   console.log(data.data);
  // }

  const getmostvied = async () => {
    const response = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-most-viewed-posts`
    );
    return response;
  };
  const query = useQuery(["mostviewd"], getmostvied);

  // if (query.isSuccess) {
  //   console.log(query.data.data);
  // }

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      setparams(params.singleblog);
      queryClient.removeQueries("post");
      window.scrollTo(0, 0);
    };
  }, [param]);

  return (
    <>
      {isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}

      {!data && !isLoading && (
        <div className=" flex items-center justify-center p-12">
          این مقاله وجود ندارد
        </div>
      )}

      {isSuccess && (
        <div className="lg:flex lg:justify-between px-4 md:px-12 mt-12  lg:gap-6 lg:flex-row-reverse">

          <aside className="min-w-[20%] hidden lg:block  rounded-md">
            <div className=" sticky top-3 flex flex-col items-center gap-6">
              <div className=" w-full relative">
                <input
                  placeholder="جستجو در وبلاگ ..."
                  className="w-full text-[12px] border-[1px] h-[3rem] rounded-md pr-2 outline-none"
                  type="text"
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-2 text-zinc-600 bottom-[15px]" />
              </div>

              <div className=" flex flex-col gap-3 border-[1px] shadow-md p-5 rounded-lg w-full">
                <p className="text-[14px]">توضیحات خلاصه</p>
                <p className=" text-[13px] text-justify leading-6 ">
                  {data.data.shortDesc}
                </p>
              </div>

              <div className=" flex flex-col gap-3 border-[1px] shadow-md p-5 rounded-lg w-full">
                <p className="text-[14px] mb-2">پربازدیدترین مقالات</p>

                <ul className="flex flex-col gap-3">
                  {query.isSuccess &&
                    query.data.data.map((item) => {
                      return (
                        <Link key={item._id} href={`/blog/${item.slug}`}>
                          <li className=" border-r-[2px] pr-2 text-[13px]">
                            {item.title}
                          </li>
                        </Link>
                      );
                    })}
                </ul>
              </div>

              <div className=" flex flex-col gap-3 border-[1px] shadow-md p-5 rounded-lg">
                <p className="text-[14px] mb-2">پربازدیدترین محصولات</p>

                <ul className="flex flex-col gap-3">
                  <li className=" border-r-[2px] pr-2 text-[12px]">
                    اینترنتی، با تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویس
                  </li>

                  <li className=" border-r-[2px] pr-2 text-[12px]">
                    اینترنتی، با تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویس
                  </li>
                  <li className=" border-r-[2px] pr-2 text-[12px]">
                    اینترنتی، با تکیه بر قدرت نرم‌افزار فتوشاپ و کدنویس
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <div className="">
            <Breadcrump
              firststage={<Link href="/blog">وبلاگ</Link>}
              lastone={
                <Link href={`/blog/${params.singleblog}`}>
                  {data.data.title}
                </Link>
              }
            />

            <div className="flex flex-col  ">
              <img
                src={data.data.image}
                width="0"
                height="0"
                sizes="100vw"
                className=" w-[500px] mx-auto rounded-md h-auto"
                alt="blog"
                quality={100}
                priority
              />

              <h2 className="py-5 font-bold text-[20px] text-zinc-600">
                {data.data.title}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-zinc-700 bg-zinc-200 px-3 py-2 rounded-md text-[12px]">
                  <p>تعداد بازدید :</p>
                  <span>{data.data.pageView}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700 bg-zinc-200 px-3 py-2 rounded-md text-[12px]">
                  <p>تعداد دیدگاه :</p>
                  <span>{data.data.comments.length}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700 bg-zinc-200 px-3 py-2 rounded-md text-[12px]">
                  <p>تاریخ انتشار :</p>
                  <span>{data.data.createdAt}</span>
                </div>
              </div>

              <div className=" flex flex-col gap-4">
                <div className=" mt-12 font-semibold">توضیحات تکمیلی</div>
                <p className=" text-zinc-700 text-[14px] text-justify leading-7 ">
                  {data.data.longDesc}
                </p>

                {/* <div className=" px-4 py-4 bg-zinc-400 mx-auto max-w-[900px]">
                  <p className=" text-[16px] py-4 text-center mb-4">مقالات مرتبط</p>
                  <ProSlider3 data={data.data} />
                </div> */}
           
              </div>

          

              <div className="py-8">
                <p>دیدگاه ها</p>
                <textarea
                  className=" mt-4 h-[150px] w-full border-[2px] rounded-md outline-none p-4"
                  name="dgs"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
