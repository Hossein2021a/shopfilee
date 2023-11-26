"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useCallback, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const [getid, setgetid] = useState([]);
  const [getfeatures, setgetfeatures] = useState([]);
  const [categoryitem, setcategoryitem] = useState([]);
  const { toast } = useToast();
  
  const cookieval = Cookies.get("auth_cookie");

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };

  const getallProduct = useCallback(async () => {
    const resp = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/products",configss
    );
    return resp;
  });

  const { data, isSuccess } = useQuery(["products"], getallProduct, {
    refetchOnWindowFocus: false,
  });

  const getallCategories = useCallback(async () => {
    const resp = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/categories",configss
    );
    return resp;
  });

  const query = useQuery(["categories"], getallCategories, {
    refetchOnWindowFocus: false,
  });

  if (query.isSuccess) {
    console.log(query.data.data);
  }

  const sendNewProduct = async (data) => {
    const resp = await axios.post(
      "https://nextapplicatin.iran.liara.run/api/new-product",
      data,configss
    );
    return resp;
  };

  const querySend = useMutation(sendNewProduct, {
    onSuccess: () => {
      toast({
        title: "با موفقیت انجام شد",
      });
    },
  });

  const changeCheckbox = (event, id) => {
    let rel = [...getid];

    if (event.target.checked) {
      rel = [...rel, id];
    } else {
      rel.splice(getid.indexOf(id), 1);
    }

    setgetid(rel);
  };

  const onSubmit = (data) => {
    const newdata = {
      ...data,
      relatedProducts: getid,
      features: getfeatures,
      category: categoryitem,
      comments: [],
      buyNumber: 0,
      pageView: 0,
    };
    querySend.mutateAsync(newdata);
  };

  const onInputText = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setgetfeatures([...getfeatures, event.target.value]);
      event.target.value = "";
    }
  };

  const deletefetchers = (ind) => {
    const filtered = getfeatures.filter((item, index) => index !== ind);
    setgetfeatures(filtered);
  };

  const checkcat = (event, ids) => {
    const gets = ids.split("*");
    const newdata = { _id: gets[0], slug: gets[1], title: gets[2] };
    let cats = [...categoryitem];

    if (event.target.checked) {
      cats = [...cats, newdata];
    } else {
      cats.splice(categoryitem.indexOf(newdata), 1);
    }
    setcategoryitem(cats);
  };

  return (
    <div className="w-full px-4">
      <form
        className="flex items-center justify-center flex-wrap w-full gap-[15px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="عنوان محصول"
          className="w-[47%] text-[13px] outline-none  border-[1px] border-gray-400 rounded-md p-3"
          {...register("title")}
        />
        <input
          placeholder="اسلاگ محصول"
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("slug")}
        />
        <input
          placeholder="آدرس فایل محصول"
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("mainFile")}
        />
        <input
          placeholder="عکس محصول"
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("image")}
        />
        <input
          placeholder="آلت عکس"
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("imageAlt")}
        />
        <input
          placeholder="قیمت"
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("price")}
        />

        <select
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("typeofProduct")}
          placeholder="نوع محصول"
        >
          <option>نوع محصول</option>
          <option value="gr">گرافیک</option>
          <option value="app">اپلیکیشن</option>
          <option value="book">کتاب</option>
        </select>
        <select
          className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("published")}
        >
          <option value="true">انتشار</option>
          <option value="false">پیشنویس</option>
        </select>

        <div className="w-[96%] flex flex-wrap items-center gap-4 text-[13px] outline-none border-[1px] border-gray-400 rounded-md p-3">
          <p>محصولات مرتبط: </p>

          {isSuccess &&
            data.data.map((item) => (
              <div key={item._id} className="flex items-center gap-1">
                <input
                  onChange={() => changeCheckbox(event, item._id)}
                  className=" cursor-pointer"
                  type="checkbox"
                />
                <p>{item.title}</p>
              </div>
            ))}
        </div>

        <div className="w-[96%]  text-[13px]  border-[1px] border-gray-400 rounded-md  py-3 flex items-center ">
          <ul className="flex items-center gap-2 px-2">
            {getfeatures.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-center gap-1 bg-gray-200 p-1 rounded-md w-max  "
              >
                <p className="flex items-center justify-center relative top-[2px]">
                  {item}
                </p>
                <XMarkIcon
                  className="w-4 font-bold cursor-pointer"
                  onClick={() => deletefetchers(index)}
                />
              </li>
            ))}
          </ul>
          <input
            placeholder="ویژگی مورد نظر خود را وارد و اینتر را بزنید"
            className=" outline-none w-full"
            onKeyDown={() => onInputText(event)}
          />
        </div>

        <div className="w-[96%]  text-[13px]  border-[1px] border-gray-400 rounded-md  py-3 flex items-center ">
          <ul className="flex items-center gap-2 px-2">
            <p>انتخاب دسته بندی : </p>
            {query.isSuccess &&
              query.data.data.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center gap-1 bg-gray-200 p-1 px-2 rounded-md  "
                >
                  <input
                    onChange={() => checkcat(event, `${item._id}*${item.slug}*${item.title}`)}
                    type="checkbox"
                    className=" cursor-pointer"
                  />
                  <p className="flex items-center justify-center relative top-[2px]">
                    {item.title}
                  </p>
                </li>
              ))}
          </ul>
        </div>

        <input
          placeholder="توضیحات کوتاه"
          className="w-[96%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("shortDesc")}
        />
        <textarea
          placeholder="توضیحات کامل"
          className="w-[96%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
          {...register("longDesc")}
        />
        <Button className="w-[96%]" type="submit">
          ثبت محصول
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
