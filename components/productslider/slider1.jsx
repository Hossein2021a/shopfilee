"use client";

import ProductSlider2 from "../slider/Slider2";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import SingleProduct from "./SingleProduct";

import { useQuery , useMutation , useQueryClient  } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast"


function ProSlider() {
  const { toast } = useToast()

const [favorit , setfavorit] = useState(false)
const queryClient = useQueryClient()

 

  const getallProduct = async () => {
    const resp = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/get-new-products"
    );
    return resp;
  };

  const query = useQuery(["prod"], getallProduct);

  // if(query.isSuccess){
  //   console.log(query.data.data)
  // }


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
      // queryClient.removeQueries( ['carttt'] )

    }else{
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید ..."
      })
    }
  }



  //carttt



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
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ProductSlider2
        dir={"horizontal"}
        spacee="30"
        classNamei="mySwiper2"
        name="محصولات"
        firstnum={2}
        secondnum={2}
        lastnum={3}
        lastcol={4}
        over1500={5}
        val1={true}
        index={
          <>
            {query.isSuccess &&
              query.data.data.map((item) => (
                <SwiperSlide key={item._id} className="h-[20rem]">
                  <SingleProduct
                    image={item.image}
                    title={item.title}
                    featchers={item.features.map((fet , index) => (
                      <span key={index} className="text-[12px] bg-gray-200 px-3 py-2 rounded-md">
                        {fet}
                      </span>
                    ))}
                    price={item.price + " " + "تومان"}
                    link={"/product/" + item.slug}
                    time={
                      (item.typeofProduct === "book" && "کتاب") ||
                      (item.typeofProduct === "app" && "اپلیکیشن") ||
                      (item.typeofProduct === "gr" && "گرافیک")
                    }
                    cartfunc={() => addtocart(item._id)}
                    secCat={item.category.map((cat , index)=>(
                      <span key={index}  className="text-12 bg-gray-200 py-2 px-3 rounded-md text-[11px] text-black">{cat}</span>
                    ))}
                    // favorits={favorit}
                    favfunc ={() => addtoFav(item._id)}
                  />
                </SwiperSlide>
              ))}
          </>
        }
      />
    </div>
  );
}

export default ProSlider;
