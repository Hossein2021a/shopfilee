"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newUser = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/new-user`,
      body
    );
    return resp;
  };



  const query = useMutation(newUser, {
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err.response.data.msg,
      });
    },
    onSuccess: (data) => {
      toast({
        title: "موفقیت",
        description: data.data.msg,
      });

      Cookies.set("auth_cookie", data.data.auth ,{ expires: 50 });
      router.push("/account/info")
    },
  });

  const onSubmit = (data) => {
    const newdata = {
      ...data,
      favoriteProduct: [],
      userProduct: [],
      comments: [],
      payments: [],
      cart: [],
      viewed: false,
      userisActive: false,
      emailSend: true,
    };
    query.mutateAsync(newdata);
  };

  return (
    <section className=" flex items-center justify-center  mt-12 mx-4 md:mx-12">
      <div className="w-full flex justify-between items-center">
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[80%] text-center flex flex-col justify-center items-center gap-5"
          >
            <h1 className=" font-bold text-zinc-500 text-[18px]">
              ثبت نام در سایت
            </h1>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="نام کاربری"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-gray-500 w-[90%]"
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                })}
              />
              <div className=" relative w-full">
                {errors.username && errors.username.type === "required" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    نام کاربری اجباری است
                  </div>
                )}

                {errors.username && errors.username.type === "maxLength" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    نام کاربری حداکثر 20 کلمه می باشد
                  </div>
                )}

                {errors.username && errors.username.type === "minLength" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    نام کاربری حداقل 6 کلمه می باشد
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="نام نمایشی سایت"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-gray-500 w-[90%]"
                {...register("displayname", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                })}
              />
              <div className=" relative w-full">
                {errors.displayname &&
                  errors.displayname.type === "required" && (
                    <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                      نام نمایشی اجباری است
                    </div>
                  )}

                {errors.displayname &&
                  errors.displayname.type === "maxLength" && (
                    <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                      نام کاربری حداکثر 20 کلمه می باشد
                    </div>
                  )}

                {errors.displayname &&
                  errors.displayname.type === "minLength" && (
                    <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                      نام کاربری حداقل 6 کلمه می باشد
                    </div>
                  )}
              </div>
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="ایمیل"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-gray-500 w-[90%]"
                {...register("email", {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}
              />
              <div className=" relative w-full">
                {errors.email && errors.email.type === "required" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    ایمیل اجباری است
                  </div>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    لطفا ایمیل معتبر وارد نمایید
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
                  maxLength: 20,
                  minLength: 6,
                })}
              />
              <div className=" relative w-full">
                {errors.password && errors.password.type === "required" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    رمز عبور اجباری است
                  </div>
                )}

                {errors.password && errors.password.type === "maxLength" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    رمز عبور حداکثر 20 کلمه می باشد
                  </div>
                )}

                {errors.password && errors.password.type === "minLength" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    رمز عبور حداقل 6 کلمه می باشد
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="password"
                autoComplete="off"
                placeholder="تکرار رمز عبور"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-gray-500 w-[90%]"
                {...register("rePassword", {
                  required: true,
                  validate: (val) => val === watch("password"),
                })}
              />
              <div className=" relative w-full">
                {errors.rePassword && errors.rePassword.type === "required" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    تکرار رمز عبور اجباری است
                  </div>
                )}

                {errors.rePassword && errors.rePassword.type === "validate" && (
                  <div className=" text-rose-500 text-[11px] text-right absolute right-8 top-[-5px] w-full">
                    تکرار رمز عبور مطابقت ندارد
                  </div>
                )}
              </div>
            </div>

            <div className="  flex items-center gap-3 w-full  justify-center">
              <Button
                className={cn(
                  "bg-green-600 hover:opacity-[0.9] hover:bg-green-600 transition"
                )}
                type="submit"
                disabled = {query.isLoading}
              >
                عضویت در سایت
              </Button>
              <Link href="/login">
                <div className=" text-[15px] bg-rose-500 text-white rounded-md px-4 py-2">
                  ورود به سایت
                </div>
              </Link>
            </div>
          </form>
        </div>

        <div className="w-[50%] md:block hidden ">
          <img
            src="/shop.jpg"
            priority
            width={0}
            height={0}
            alt="shop"
            className="rounded-sm shadow-sm w-[70%]  h-auto"
            quality={100}
            sizes={"100vh"}
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
