"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";


const RegisterForm = () => {
  const { toast } = useToast();
  const cookieval = Cookies.get("auth_cookie");

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    try {
      const url = "https://nextapplicatin.iran.liara.run/api/new-slider";
      axios.post(url, data,configss).then(function (response) {
        if (response.status) {
          toast({
            title: "موفقیت",
            description: "بنر میانی با موفقیت ثبت شد",

          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="  mt-12 mx-12">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto text-center flex flex-col justify-center items-center gap-5"
          >
            <h1 className=" font-bold text-zinc-500 text-[18px]">
              ایجاد اسلاید جدید
            </h1>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="آدرس عکس"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("image", {
                  required: true,
                })}
              />
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="توضیح عکس"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("imageAlt", {
                  required: true,
                })}
              />
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="text"
                autoComplete="off"
                placeholder="لینک عکس"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("link", {
                  required: true,
                })}
              />
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <input
                type="number"
                autoComplete="off"
                placeholder="شماره عکس"
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("sorter", {
                  required: true,
                })}
              />
            </div>

            <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[90%]">
              <select
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("situation")}
              >
                <option value="true">روشن</option>
                <option value="false">خاموش</option>
              </select>
            </div>

            <div className="  flex items-center gap-3 w-full  justify-center">
              <Button
                className={cn(
                  "w-[81%] bg-green-600 hover:opacity-[0.9] hover:bg-green-600 transition"
                )}
                type="submit"
              >
                ثبت عکس
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
