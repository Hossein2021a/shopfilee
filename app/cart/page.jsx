"use client";

import { useQuery, useMutation, useQueryClient, isError } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [sumofpro, setsumofpro] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const router = useRouter();

  const cookieval = Cookies.get("auth_cookie");

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getauthdata = async () => {
    const resp = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-part-user-data/cart`,
      configss
    );
    return resp;
  };
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["cart"],
    getauthdata,
    {
      refetchOnWindowFocus: false,
      onError: () => {
        router.push("/login");
      }
    }
  );

  // if (query4.isSuccess) {
  //   console.log(query4.data.data);
  // }

  //delete

  const getcookie = Cookies.get("auth_cookie");
  const config = {
    headers: {
      auth_cookie: getcookie,
    },
  };
  const senddelletefavoritProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/cart-manager`,
      body,
      config
    );
    return resp;
  };

  const query3 = useMutation(senddelletefavoritProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cartttt'] })

      toast({
        title: "موفقیت",
        description: data && data.data.msg,
      });
      queryClient.removeQueries("cart");
    },

    onError: (err) => {
      console.log(err);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "fdhfhd",
      });
    },
  });
  const addtoFav = (ids) => {
    const data = {
      method: "remove",
      goalCartProductId: ids,
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

  const sendfavoritProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/favorits-product`,
      body,
      config
    );
    return resp;
  };

  const query5 = useMutation(sendfavoritProduct, {
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
  const addtoFavv = (ids) => {
    const data = {
      method: "push",
      newFavProduct: ids,
    };

    query5.mutateAsync(data);
  };

  const getuser = async () => {
    const resp = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-user-data`,
      configss
    );
    return resp;
  };
  const query6 = useQuery(["userdata"], getuser, {
    refetchOnWindowFocus: false,
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید",
      });
      router.push("/login");
    },
  });

  useEffect(() => {

    if(!cookieval){
      router.push("/login")
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید",
      });
    }
    return () => {
      queryClient.removeQueries("cart");
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const sum =
        isSuccess &&
        data.data.reduce((prev, next) => prev + Number(next.price), 0);
      setsumofpro(sum);
    }
  }, [data]);

  return (
    <>
      <div className="text-center w-[35%] mx-auto mt-12 bg-green-700 text-white rounded-md py-2">
        <span className="text-center ">صفحه سبد خرید</span>
      </div>

      {}

      <div className="lg:mx-12 mx-4 mt-12  flex flex-col lg:flex-row gap-6 ">
        {isLoading ? (
          <div className="w-full flex items-center justify-center p-12">
            <img width={120} height={120} alt="loading" src="/spin.gif" />
          </div>
        ) : (
          <div className=" w-full border-[1px] border-gray-300 p-8 rounded-md h-fit">
            {data.data?.length == 0 && (
              <div className="w-full text-center">محصولی در سبد نیست</div>
            )}
            <ul className="flex flex-col gap-6">
              {data.data?.map((item) => (
                <li
                  key={item._id}
                  className=" flex flex-col lg:flex-row last:border-b-[0px] justify-between gap-4 items-center border-b-[1px] pb-6  border-gray-300"
                >
                  <div className="flex flex-col lg:flex-row  items-center gap-6 text-[14px]">
                    <Link
                      className="flex flex-col lg:flex-row items-center gap-6"
                      href={`/product/${item.slug}`}
                    >
                      <div>
                        <img
                          className="rounded-md"
                          width={120}
                          height={150}
                          alt="عکس"
                          src="/1.jpg"
                        />
                      </div>

                      <div> نام محصول : {item.title}</div>
                    </Link>

                    <div>قیمت محصول : {item.price.toLocaleString()}</div>
                  </div>

                  <div className=" flex items-center gap-2">
                    <div onClick={() => addtoFavv(item._id)}>
                      <Button className="bg-blue-600 text-white text-[12px] ">
                        افزودن به علاقه مندی ها
                      </Button>
                    </div>

                    <div onClick={() => addtoFav(item._id)}>
                      <Button className="bg-rose-600 text-white text-[12px] ">
                        حذف محصول
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <aside className="lg:min-w-[300px] h-fit border-[1px] border-gray-300 p-8 rounded-md flex flex-col items-start justify-center gap-6">
          <div className="w-fit">مجموع قیمت : {sumofpro.toLocaleString()} تومان </div>
          <div>مجموع تعداد محصول: {isSuccess && data.data?.length} عدد</div>
          <Button onClick={() => router.push("/cart/payment")} className="w-full">پرداخت</Button>
        </aside>
      </div>
    </>
  );
};

export default Cart;
