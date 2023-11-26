"use client";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/appcontext";


const Info = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const [switches, setswitches] = useState(true);
  const router = useRouter()
 const { setCartNum , setNameuset} = useAppContext()


  const {
    register: register1,
    handleSubmit: handleSubmitReset,
    watch,
  } = useForm();

  const cookieval = Cookies.get("auth_cookie");

  const config = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getauthdata = async () => {
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/get-part-user-data/info`,
        config
      );
      return resp;
    
  };
  const { data, isSuccess, isLoading } = useQuery(["info"], getauthdata);

  useEffect(() => {
    if (isSuccess) {
      setswitches(data?.data.emailSend);
    }
  }, [data]);

  useEffect(() => {
    queryClient.removeQueries("info");
    queryClient.removeQueries({ queryKey: ['cartttt'] })

  }, []);

  // if (isSuccess) {
  //   console.log(data.data);
  // }

  const sendDataMini = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/update-miniuser/${
        isSuccess && data.data._id
      }`,
      body,config
    );
    return resp;
  };

  const query1 = useMutation(sendDataMini, {
    onSuccess: () => {
      toast({
        title: "موفقیت",
        description: "با موفقیت به روز شد",
      });
    },

    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err.response.data.msg,
      });
    },
  });

  const onSubmit1 = (data) => {
    query1.mutateAsync(data);
  };

  const confirmemail = async (body) => {
      const resp = await axios.post(
        `https://nextapplicatin.iran.liara.run/api/confirm-user`,
        body,
        config
      );
      return resp;
    
  };
  const query2 = useMutation(confirmemail, {
    onSuccess: () => {
      toast({
        title: "موفقیت",
        description: "با موفقیت تایید شد",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err.response.data.msg,
      });
    },
  });

  const onSubmit = (data) => {
    query2.mutateAsync(data);
  };

  const changeemailSituation = async (body) => {
      const resp = await axios.post(
        `https://nextapplicatin.iran.liara.run/api/update-email-user`,
        body,
        config
      );
      return resp;
  };
  const query3 = useMutation(changeemailSituation, {
    onSuccess: () => {
      toast({
        title: "موفقیت",
        description: "وضعیت با موفقیت تغییر کرد",
      });
    },
  });

  const switchhandler = (inp) => {
    const formData = {
      emailSend: inp,
    };
    query3.mutateAsync(formData);
    setswitches(inp);
  };

  return (
    <div className="">
      {isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}
      {isSuccess && (
        <div className="w-full mx-auto bg-gray-100 p-8 rounded-md ">
          {isSuccess && data?.data.userisActive == false ? (
            <div className="w-full flex justify-center flex-col items-center bg-gray-300 p-8 rounded-md ">
              <p className="mb-4">کد تایید حساب کاربری</p>
              <form
                className="flex flex-col gap-4 items-center justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="w-full border-gray-500 border-[1px] rounded-md px-3 py-3 text-[13px] outline-none"
                  {...register("activeCode")}
                  placeholder="کد تایید ارسال شده به ایمیل خود را وارد نمایید"
                />
                <Button type="submit">تایید حساب کاربری</Button>
              </form>
            </div>
          ) : (
            <div className="text-green-400 text-center">
              اکانت شما با موفقیت تایید شد
            </div>
          )}

          <div className="w-full flex flex-col lg:flex-row gap-6   justify-between  items-center bg-gray-400 p-8 rounded-md mt-6 ">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <p className="text-white"> ایمیل های شرکت در جشنواره</p>

              {switches == true ? (
                <button
                  onClick={() => switchhandler(false)}
                  className="bg-green-600 text-white px-3 py-2 rounded-md"
                >
                  روشن
                </button>
              ) : (
                <button
                  onClick={() => switchhandler(true)}
                  className="bg-rose-600 px-3 py-2 rounded-md text-white"
                >
                  خاموش
                </button>
              )}
            </div>
            <div
              onClick={() => {
                setCartNum(0)
                setNameuset("ورود")
                Cookies.set("auth_cookie", "", { expires: 0 });
                router.push("/login")


              }}
              className="flex items-center bg-rose-500 py-2 px-3 rounded-md justify-center text-center cursor-pointer"
            >
              <p className="text-white">خارج شدن</p>
              <span>
                <ArrowLeftOnRectangleIcon className="w-8 h-5 text-white" />
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center flex-col items-center bg-gray-300 p-8 rounded-md mt-6">
            <div className=" w-full flex flex-col lg:flex-row gap-6 justify-between items-center">
              <p>تاریخ ثبت نام : {isSuccess && data?.data.createdAt} </p>
              <p>تاریخ آپدیت : {isSuccess && data?.data.updatedAt} </p>
            </div>
          </div>

          <div className="w-full flex  justify-center flex-col items-center bg-gray-300 p-8 rounded-md mt-6">
            <div className=" w-full flex flex-col gap-4">
              <p>نام کاربری : {isSuccess && data?.data.username} </p>
              <p>نام نمایشی : {isSuccess && data?.data.displayname} </p>
              <p>ایمیل: {isSuccess && data?.data.email} </p>
            </div>
          </div>

          <div className="w-full flex  justify-center flex-col items-center bg-gray-300 p-8 rounded-md mt-6">
            <p className="mb-2">ویرایش اطلاعات</p>
            <div className=" w-full flex flex-col gap-4">
              <form
                className="flex flex-col gap-4 items-center justify-center w-full"
                onSubmit={handleSubmitReset(onSubmit1)}
              >
                <input
                  className="w-full border-gray-500 border-[1px] rounded-md px-3 py-3 outline-none text-[13px]"
                  {...register1("displayname")}
                  placeholder="نام نمایشی"
                />
                <input
                  className="w-full border-gray-500 border-[1px] rounded-md px-3 py-3 outline-none text-[13px]"
                  {...register1("password")}
                  placeholder="پسورد"
                />
                <input
                  className="w-full border-gray-500 border-[1px] rounded-md px-3 py-3 outline-none text-[13px] "
                  {...register1("rePassword")}
                  placeholder="تکرار پسورد"
                />
                <Button type="submit">ثبت ویرایش</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
