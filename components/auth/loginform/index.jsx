"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useQueries, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loginsend = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/login-user`,
      body
    );
    return resp;
  };

  const query = useMutation(loginsend, {
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err.response.data && err.response.data.msg,
      });
    },
    onSuccess: (data) => {
      Cookies.set("auth_cookie", data.data.auth , { expires: 50 });
      router.push("/account/info");
    },
  });

  const onSubmit = (data) => {
    query.mutateAsync(data);
  };


  return (
    <section className=" flex items-center justify-center  mt-12 mx-4 md:mx-12">
      <div className="w-full flex md:justify-between items-center">
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-[80%] w-full mx-auto text-center flex flex-col justify-center items-center gap-5"
          >
            <h1 className=" font-bold text-zinc-500 text-[18px]">
              ورود به سایت
            </h1>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="ایمیل"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-gray-500 w-[90%]"
                {...register("email", {
                  required: true,
                })}
              />
              <div className=" relative w-full">
                {errors.email && errors.email.type === "required" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    ایمیل اجباری است
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="password"
                autoComplete="off"
                placeholder="رمز عبور"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-gray-500 w-[90%]"
                {...register("password", {
                  required: true,
                })}
              />
              <div className=" relative w-full">
                {errors.password && errors.password.type === "required" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    رمز عبور اجباری است
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full justify-center">
              <Button
                className={cn(
                  "bg-green-600 hover:opacity-[0.9] hover:bg-green-600 transition"
                )}
                type="submit"
                disabled={query.isLoading}
               
              
              >
                ورود به سایت
              </Button>
              <Link href="/register">
                <div className=" text-[15px] bg-rose-500 text-white rounded-md px-4 py-2">
                  ثبت نام در سایت
                </div>
              </Link>
            </div>
            
            <div className="flex flex-col bg-gray-200 p-4 w-full gap-2">
              <span> جهت ورد به صورت ادمین</span>
              <span> email : shahr.coffe@gmail.com</span>
              <span> pass : 7q8w9erty</span>
            </div>
          </form>
        </div>

        <div className="w-[50%] md:block hidden">
          <img
            src="/shop.jpg"
            width={500}
            height={500}
            alt="shop"
            className="rounded-sm shadow-sm h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
