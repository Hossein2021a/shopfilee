"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import Breadcrump from "@/components/Breadcrunb/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProSlider4 from "@/components/productslider/slider4";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";

const SingleProductShop = ({ params }) => {
  const queryClient = useQueryClient();
  const [param, setparam] = useState("");
  const { toast } = useToast();

  const getproduct = async () => {
    const resp = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-product/${params.idproduct}`
    );
    return resp;
  };

  const query = useQuery(["productSingle"], getproduct, {
    refetchOnWindowFocus: false,
  });

  // if (query.isSuccess) {
  //   console.log(query.data.data);
  // }

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      setparam(params.idproduct);
      queryClient.removeQueries(["productSingle"]);
      window.scrollTo(0, 0);
    };
  }, [param]);

  const getmost = async () => {
    const resp = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-most-viewed-products`
    );
    return resp;
  };

  const query1 = useQuery(["mostvied"], getmost, {
    refetchOnWindowFocus: false,
  });

  // if (query1.isSuccess) {
  //   console.log(query1.data.data);
  // }
  const getcookie = Cookies.get("auth_cookie");

  const config = {
    headers: {
      auth_cookie: getcookie,
    },
  };

  const sendfavoritProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/favorits-product`,
      body,
      config
    );
    return resp;
  };

  const query3 = useMutation(sendfavoritProduct, {
    onSuccess: (data) => {
      toast({
        title: "موفقیت",
        description: data && data.data.msg,
      });
    },

    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err && err.response.data.msg,
      });
    },
  });
  const addtoFav = () => {
    const data = {
      method: "push",
      newFavProduct: query.isSuccess && query.data.data._id,
    };
    if (getcookie) {
      query3.mutateAsync(data);
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید ...",
      });
    }
  };

  //cart

  const sendCartProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/cart-manager`,
      body,
      config
    );
    return resp;
  };

  const query4 = useMutation(sendCartProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cartttt"] });

      toast({
        title: "موفقیت",
        description: data && data.data.msg,
      });
    },

    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err && err.response.data.msg,
      });
    },
  });

  const addtocart = () => {
    const data = {
      method: "push",
      newCartProduct: query.isSuccess && query.data.data._id,
    };
    if (getcookie) {
      query4.mutateAsync(data);
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید ...",
      });
    }
  };

  return (
    <>
      {query.isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}

      {!query.data && !query.isLoading && (
        <div className=" flex items-center justify-center p-12">
          این محصول وجود ندارد
        </div>
      )}
      {query.isSuccess && (
        <div className="flex justify-center w-full lg:justify-between lg:gap-6 lg:px-12 px-4">
          <div className="lg:w-[75%] w-[100%] flex flex-col gap-6 mt-6">
            <div className=" flex flex-col lg:flex-row  items-center w-full  shadow-md border-[1px] rounded-md p-6 gap-6 ">
              <img
                src={query.data.data.image}
                alt="image"
    
                className="rounded-md max-w-[300px]"
              />

              <div className="w-full">
                <p className=" font-semibold text-zinc-600 text-center">
                  {query.data.data.title}
                </p>
                <p className="  leading-6 text-zinc-700 text-[13px] lg:w-[80%] text-center mx-auto mt-3 ">
                  {query.data.data.shortDesc}
                </p>

                <ul className="mt-3 flex flex-col lg:flex-row items-center gap-3 justify-center text-[14px]">
                  {query.data.data.features.map((fet, index) => (
                    <li key={index} className=" flex items-center gap-1">
                      <CheckBadgeIcon className="w-4 h-4" />
                      <p>{fet}</p>
                    </li>
                  ))}
                </ul>

                <div className="  gap-3 w-full flex-col mx-auto mt-4  flex lg:hidden  ">
                  <div onClick={() => addtocart()} className="w-full  ">
                    <Button className="w-full bg-orange-500 font-semibold text-[12px]">
                      <div className="flex items-center gap-3">
                        <span>{query.data.data.price + " " + "تومان"}</span>
                        <span>-</span>
                        <span>افزودن به سبد خرید</span>
                      </div>
                    </Button>
                  </div>

                  <div className="w-full max-w-full">
                    <Button
                      onClick={() => addtoFav()}
                      className="w-full bg-blue-500 font-semibold text-[12px]"
                    >
                      <div className="flex items-center gap-3">
                        <span>افزودن به علاقه مندی ها</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row  items-center  shadow-md border-[1px] rounded-md p-6 gap-6">
              <span>توضیحات</span>
              <p className=" text-[13px] leading-6 text-justify">
                {query.data.data.longDesc}
              </p>
            </div>

            <div className="p-6 bg-zinc-400 rounded-md shadow-md  ">
              <p className="text-white py-4">محصولات مرتبط : </p>
              {<ProSlider4 data={query.data.data} />}
            </div>
          </div>

          <div className="w-[24%] hidden lg:block">
            <div className=" flex justify-between gap-6 ">
              <aside className=" mt-6">
                <div className="sticky top-3  mx-auto gap-6 flex flex-col items-center ">
                  <div className=" flex flex-col gap-3 w-full max-w-full">
                    <div onClick={() => addtocart()} className="w-full ">
                      <Button className="w-full bg-orange-500 font-semibold">
                        <div className="flex items-center gap-3">
                          <span>{query.data.data.price + " " + "تومان"}</span>
                          <span>-</span>
                          <span>افزودن به سبد خرید</span>
                        </div>
                      </Button>
                    </div>

                    <div className="w-full max-w-full">
                      <Button
                        onClick={() => addtoFav()}
                        className="w-full bg-blue-500 font-semibold"
                      >
                        <div className="flex items-center gap-3">
                          <span>افزودن به علاقه مندی ها</span>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div className="w-full shadow-md border-[1px] px-4 py-4 rounded-md  max-w-full">
                    <ul className=" flex flex-col gap-3">
                      <li className=" flex justify-between text-[14px] ">
                        <p>تعداد خرید</p>
                        <p>{query.data.data.buyNumber}</p>
                      </li>
                      <li className=" flex justify-between text-[14px] ">
                        <p>تعداد بازدید</p>
                        <p>{query.data.data.pageView}</p>
                      </li>
                      <li className=" flex justify-between text-[14px] ">
                        <p>تعداد دیدگاه</p>
                        <p>{query.data.data.comments.length}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="w-full shadow-md border-[1px] px-4 py-4 rounded-md  max-w-full">
                    <p className=" font-semibold text-[13px] mb-3">
                      معرفی کوتاه
                    </p>
                    <p className=" leading-6 text-[13px] text-justify">
                      {query.data.data.shortDesc}
                    </p>
                  </div>

                  <div className="w-full shadow-md border-[1px] px-4 py-4 rounded-md  max-w-full">
                    <p className=" font-semibold text-[13px] mb-3">
                      بیشترین بازدید محصولات
                    </p>

                    {query1.isSuccess &&
                      query1.data.data.map((moster) => (
                        <div
                          key={moster._id}
                          className="flex w-full  flex-col text-gray-600 justify-start text-[14px] mt-3"
                        >
                          <Link href={`/product/${moster.slug}`}>
                            <span className=" border-r-[1px] pr-1 border-gray-400 text-right w-full">
                              {moster.title}
                            </span>
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className="w-full shadow-md border-[1px] px-4 py-4 rounded-md  max-w-full">
                    <p className=" font-semibold text-[13px] mb-3">
                      دسته بندی ها
                    </p>

                    {query.isSuccess &&
                      query.data.data.category.map((cat) => (
                        <div
                          key={cat._id}
                          className="flex w-full  flex-col text-gray-600 justify-start text-[14px] mt-3"
                        >
                          <Link href={`/product?pn=1&category=${cat.slug}`}>
                            <span className=" border-r-[1px] pr-1 border-gray-400 text-right w-full">
                              {cat.title}
                            </span>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductShop;
