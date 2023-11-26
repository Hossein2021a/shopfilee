"use client";
import ProductSlider from "../slider/Slider";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { useMutation, useQuery , useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import SingleProduct from "./SingleProduct";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast"


function ProSlider4({ data }) {
  const { toast } = useToast()
  const queryClient =useQueryClient()

  // const getallProduct = async () => {
  //   const resp = await axios.get(
  //     "https://nextapplicatin.iran.liara.run/api/products"
  //   );
  //   return resp;
  // };

  // const query = useQuery(["produ"], getallProduct, {
  //   refetchOnWindowFocus: false,
  // });

  const getrelproduct = async (bod) => {
    const response = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/get-related-products`,
      bod
    );
    return response;
  };

  const query1 = useMutation(getrelproduct);

  const func = () => {
    const bod = { goalIds: data.relatedProducts };
    query1.mutateAsync(bod);
  };

  useEffect(() => {
    func();
  }, []);




    //favorit

    const getcookie = Cookies.get("auth_cookie")

    const config = {
      headers: {
        auth_cookie:getcookie 
      },
    };
  
    const sendfavoritProduct = async (body) => {
      const resp = await axios.post(
        `https://nextapplicatin.iran.liara.run/api/favorits-product`,
        body,
        config,
      );
      return resp
    };
  
    const query3 = useMutation(sendfavoritProduct , {
      onSuccess : (data) => {
        toast({
          title: "موفقیت",
          description: data && data.data.msg
        })
      },
  
      onError : (err) => {
        toast({
          variant: "destructive",
          title: "خطا",
          description: err && err.response.data.msg
        })
      }
    })
    const addtoFav = (ids) => {
      const data = {
        method : "push",
        newFavProduct : ids
      }
      if(getcookie){
        query3.mutateAsync(data)
      }else{
        toast({
          variant: "destructive",
          title: "خطا",
          description: "اپتدا وارد شوید ..."
        })
      }
    }
  
  
  
  
  
    //cart
  
  
    const sendCartProduct = async (body) => {
      const resp = await axios.post(
        `https://nextapplicatin.iran.liara.run/api/cart-manager`,
        body,
        config,
      );
      return resp
    };
  
    const query4 = useMutation(sendCartProduct , {
      onSuccess : (data) => {
        queryClient.invalidateQueries({ queryKey: ['cartttt'] })
        toast({
          title: "موفقیت",
          description: data && data.data.msg
        })
      },
  
      onError : (err) => {
        toast({
          variant: "destructive",
          title: "خطا",
          description: err && err.response.data.msg
        })
      }
    })
  
  
    const addtocart = (ids) => {
      const data = {
        method : "push",
        newCartProduct : ids
      }
      if(getcookie){
        query4.mutateAsync(data)
      }else{
        toast({
          variant: "destructive",
          title: "خطا",
          description: "اپتدا وارد شوید ..."
        })
      }
    }

  return (
    <>
      {query1.isSuccess && (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <ProductSlider
            dir={"horizontal"}
            spacee="30"
            name="مقالات"
            classNamei="mySwiper2"
            firstnum={1}
            secondnum={2}
            lastnum={3}
            lastcol={3}
            over1500={3}
            val1={true}
            index={
              <>
                {query1.isSuccess &&
                  query1.data.data.map((item) => (
                    <SwiperSlide key={item._id} className="h-[20rem]">
                      <SingleProduct
                        image={item.image}
                        title={item.title}
                        price={item.price + " " + "تومان"}
                        link={"/product/" + item.slug}
                        time={
                          (item.typeofProduct === "book" && "کتاب") ||
                          (item.typeofProduct === "app" && "اپلیکیشن") ||
                          (item.typeofProduct === "gr" && "گرافیک")
                        }
                        cartfunc={() => addtocart(item._id)}

                        favfunc ={() => addtoFav(item._id)}
    
                      />
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

export default ProSlider4;
