"use client";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Payment = () => {
  const [sumofpro, setsumofpro] = useState("");
  const router = useRouter()

  const cookieval = Cookies.get("auth_cookie");
  const queryClient = useQueryClient();

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
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      const sum =
        isSuccess &&
        data.data.reduce((prev, next) => prev + Number(next.price), 0);
      setsumofpro(sum);
    }
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, []);

  return (
    <div className="mx-12 mt-12 text-center ">
      {isLoading ? (
        <div className=" flex items-center justify-center p-12">
          <Image width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      ) : (
        <div>
          <p> مجموع قیمت محصولات: {sumofpro.toLocaleString()}</p>
          <Button onClick={() => router.push("/cart/paymentresult")} className="mt-8">رفتن به صفحه درگاه پرداخت</Button>
        </div>
      )}
    </div>
  );
};

export default Payment;
