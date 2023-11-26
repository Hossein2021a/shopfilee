"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useQuery } from "react-query";
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
  const [tagss, settags] = useState([]);
  const [relatedsId, setrelatedsId] = useState([]);

  const ref = useRef();

  const getallPosts = async () => {
    const resp = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/posts",configss
    );
    return resp;
  };

  const { data, isSuccess } = useQuery(["posts"], getallPosts);

  const onChangehandler = (v) => {
    let rel = [...relatedsId];
    if (v.target.checked) {
      rel = [...relatedsId, v.target.value];
    } else {
      rel.splice(relatedsId.indexOf(v.target.value), 1);
    }
    setrelatedsId(rel);
  };

  // if (isSuccess) {
  //   console.log(data.data);
  // }

  const gettags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      settags([...tagss, e.target.value]);
      e.target.value = "";
    }
  };

  const closebutton = (ind) => {
    const getfilterd = tagss.filter((item, index) => index !== ind);
    settags(getfilterd);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newdata = {
      ...data,
      tags: tagss,
      type: "post",
      pageView: 0,
      relatedPosts: relatedsId,
    };
    console.log(newdata);

    try {
      const url = "https://nextapplicatin.iran.liara.run/api/new-post";
      axios.post(url, newdata,configss).then(function (response) {
        if (response.status) {
          toast({
            title: "موفقیت",
            description: " پست با موفقیت ثبت شد",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" mt-12 lg:mx-12 mx-0">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto text-center flex flex-col justify-center items-center gap-5"
          >
            <h1 className=" font-bold text-zinc-500 text-[18px]">
              ایجاد پست جدید
            </h1>

            <div className=" flex items-center justify-between flex-wrap gap-3 ">
              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[49%]">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="عنوان مقاله"
                  className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                  {...register("title", {
                    required: true,
                  })}
                />
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[49%]">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="اسلاگ مقاله"
                  className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                  {...register("slug", {
                    required: true,
                  })}
                />
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[49%]">
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

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[49%]">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="آلت عکس"
                  className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                  {...register("imageAlt", {
                    required: true,
                  })}
                />
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[49%]">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="توضیح کوتاه"
                  className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                  {...register("shortDesc", {
                    required: true,
                  })}
                />
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[49%]">
                <select
                  className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                  {...register("published")}
                >
                  <option>وضعیت انتشار</option>
                  <option value="true">منتشر شود</option>
                  <option value="false">پیش نویس</option>
                </select>
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-3  w-[100%]">
                <div className=" border-[1px] flex  h-12 rounded-md items-center gap-2 px-2 border-zinc-400 w-[95%]">
                  {tagss.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-200 "
                    >
                      <span className="text-sm">{item}</span>
                      <XMarkIcon
                        onClick={() => closebutton(index)}
                        className=" w-4 cursor-pointer"
                      />
                    </div>
                  ))}

                  <input
                    onKeyDown={gettags}
                    placeholder="تگ ها را وارد نمایید ..."
                    className=" text-sm outline-none w-full"
                    type="text"
                    ref={ref}
                  />
                </div>
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-2 w-[100%]">
                <textarea
                  type="text"
                  autoComplete="off"
                  placeholder="توضیح کامل"
                  className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[95%]"
                  {...register("longDesc", {
                    required: true,
                  })}
                />
              </div>

              <div className="mx-auto text-center flex flex-col justify-center items-center gap-3  w-[100%]">
                <div className=" flex border-[1px] flex-wrap h-auto py-3 rounded-md items-center gap-4 px-2 border-zinc-400 w-[95%]">
                  <p className=" text-sm">مقالات مرتبط : </p>
                  {isSuccess &&
                    data.data.map((item, index) => (
                      <div
                        key={item._id}
                        className=" flex items-center flex-row-reverse gap-1 bg-zinc-200 text-sm px-2 py-1 rounded-md"
                      >
                        <p>{item.title}</p>
                        <input
                          value={item._id}
                          onChange={onChangehandler}
                          type="checkbox"
                          className=" cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className=" mt-8  flex items-center gap-3 w-full  justify-center">
                <Button
                  className={cn(
                    "w-[95%] bg-green-600 hover:opacity-[0.9] hover:bg-green-600 transition"
                  )}
                  type="submit"
                >
                  ارسال پست
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
