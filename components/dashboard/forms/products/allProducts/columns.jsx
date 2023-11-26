"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export const columns = [
  {
    accessorKey: "image",
    header: "آدرس عکس",
    cell: ({ row }) => {
      return (
        <img
          className="w-[80px] h-[60px] rounded-md text-center mx-auto"
          src={row.getValue("image")}
        ></img>
      );
    },
  },
  {
    accessorKey: "title",
    header: " عنوان دسته",
  },
  {
    accessorKey: "imageAlt",
    header: "آلت عکس",
  },
  {
    accessorKey: "typeofProduct",
    header: "زیردسته عکس",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("typeofProduct") === "gr" && "فایل گرافیکی"}
          {row.getValue("typeofProduct") === "book" && "کتاب"}
          {row.getValue("typeofProduct") === "app" && "اپلیکیشن"}
        </div>
      );
    },
  },
  {
    accessorKey: "shortDesc",
    header: "توضیحات خلاصه",
  },
  {
    accessorKey: "relatedProducts",
  },
  {
    accessorKey: "longDesc",
  },
  {
    accessorKey: "comments",
  },
  {
    accessorKey: "category",
  },
  {
    accessorKey: "features",
  },
  {
    accessorKey: "buyNumber",
  },
  {
    accessorKey: "pageView",
  },

  {
    accessorKey: "_id",
  },
  {
    accessorKey: "slug",
    header: "لینک",
  },
  {
    accessorKey: "mainFile",
  },
  {
    accessorKey: "price",
    header: "قیمت",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
  },
  {
    accessorKey: "published",
    header: "وضعیت",
    cell: ({ row }) => {
      return <div>{row.getValue("published") === true ? "روشن" : "خاموش"}</div>;
    },
  },
  {
    header: "اقدامات",
    id: "actions",
    cell: ({ row }) => {
      const { register, handleSubmit } = useForm();
      const [getid, setgetid] = useState([]);
      const [getfeatures, setgetfeatures] = useState([]);
      const [categoryitem, setcategoryitem] = useState([]);
      const [thisrel, setthisrel] = useState([]);
      const [open, setOpen] = useState(false);
      const queryClient = useQueryClient();
      const { toast } = useToast();
        const cookieval = Cookies.get("auth_cookie");

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };

      // allproducts

      const getallProduct = async () => {
        const resp = await axios.get(
          "https://nextapplicatin.iran.liara.run/api/products",configss
        );
        return resp;
      };

      const { data, isSuccess, isLoading } = useQuery(
        ["products"],
        getallProduct
      );
      // if (isSuccess) {
      //   console.log(data.data);
      // }
      // allproducts

      //category

      const getallCategories = useCallback(async () => {
        const resp = await axios.get(
          "https://nextapplicatin.iran.liara.run/api/categories",configss
        );
        return resp;
      });

      const query = useQuery(["categories"], getallCategories, {
        refetchOnWindowFocus: false,
      });

      //category

      // delete
      const deletedata = async () => {
        const response = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/delete-product/${row.getValue(
            "_id"
          )}`,{item:1},configss
        );
        return response;
      };

      const querydatadel = useMutation(deletedata, {
        onSuccess: () => {
          queryClient.invalidateQueries(["products"]);
          Swal.close();
        },
      });

      const delbanner = () => {
        querydatadel.mutateAsync(row.getValue("_id"));
      };
      // Delete

      // Submit
      const sendNewProduct = async (data) => {
        const resp = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/update-product/${row.getValue(
            "_id"
          )}`,
          data,
          configss
        );
        return resp;
      };

      const querySend = useMutation(sendNewProduct, {
        onSuccess: () => {
          queryClient.invalidateQueries(["products"]);
          setOpen(false);
          toast({
            title: "با موفقیت انجام شد",
          });
        },
      });

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
      // Submit

      useEffect(() => {
        setgetid(row.getValue("relatedProducts"));
        setgetfeatures(row.getValue("features"));
        setcategoryitem(row.getValue("category"));
      }, []);

      const getallrelid = (event, ids) => {
        let rel = [...getid];
        if (event.target.checked) {
          if (rel.includes(ids)) {
            return;
          } else {
            rel = [...rel, ids];
          }
        } else {
          rel.splice(getid.indexOf(ids), 1);
        }

        setgetid(rel);
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

      const checkcategory = (event, id) => {
        const gets = id.split("*");
        const newdata = { _id: gets[0], slug: gets[1], title: gets[2] };
        let cat = [...categoryitem];

        if (event.target.checked) {
          if (categoryitem.includes(newdata)) {
            return;
          } else {
            cat = [...cat, newdata];
          }
        } else {
          cat.splice(categoryitem.indexOf(newdata), 1);
        }
        setcategoryitem(cat);
      };


      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => setthisrel(row.getValue('category').map((cat) => cat._id))}
                >
                  ویرایش
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  Swal.fire({
                    title: "آیا اطمینان دارید؟",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "بله مطمئنم",
                    cancelButtonText: "لغو کردن",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                      delbanner();
                    },
                  });
                }}
              >
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="h-[500px] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-center">ویرایش بنر</DialogTitle>
            </DialogHeader>
            <form
              className="flex items-center justify-center flex-wrap w-full gap-[15px] mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="عنوان محصول"
                className="w-[47%] text-[13px] outline-none  border-[1px] border-gray-400 rounded-md p-3"
                {...register("title")}
                defaultValue={row.getValue("title")}
              />
              <input
                placeholder="اسلاگ محصول"
                className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("slug")}
                defaultValue={row.getValue("slug")}
              />
              <input
                placeholder="آدرس فایل محصول"
                className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("mainFile")}
                defaultValue={row.getValue("mainFile")}
              />
              <input
                placeholder="عکس محصول"
                className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("image")}
                defaultValue={row.getValue("image")}
              />
              <input
                placeholder="آلت عکس"
                className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("imageAlt")}
                defaultValue={row.getValue("imageAlt")}
              />
              <input
                placeholder="قیمت"
                className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("price")}
                defaultValue={row.getValue("price")}
              />

              <select
                className="w-[47%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("typeofProduct")}
                defaultValue={row.getValue("typeofProduct")}
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
                defaultValue={row.getValue("published")}
              >
                <option value="true">انتشار</option>
                <option value="false">پیشنویس</option>
              </select>

              <div className="w-[96%] flex items-center gap-4 text-[13px] outline-none border-[1px] border-gray-400 rounded-md p-3 flex-wrap ">
                <p>محصولات مرتبط: </p>
                <ul className="flex items-center gap-2 flex-wrap">
                  {isSuccess &&
                    data.data.map(
                      (item) =>
                        row.getValue("_id") !== item._id && (
                          <li
                            key={item._id}
                            className=" flex items-center gap-1 w-max"
                          >
                            {getid.includes(item._id) ? (
                              <input
                                className=" cursor-pointer"
                                type="checkbox"
                                defaultChecked
                                onChange={() => getallrelid(event, item._id)}
                              />
                            ) : (
                              <input
                                type="checkbox"
                                className=" cursor-pointer"
                                onChange={() => getallrelid(event, item._id)}
                              />
                            )}

                            {item.title}
                          </li>
                        )
                    )}
                </ul>
              </div>

              <div className="w-[96%]  text-[13px]  border-[1px] border-gray-400 rounded-md  py-3 flex items-center ">
                <ul className="flex items-center gap-2 px-2">
                  {getfeatures.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center gap-1 bg-gray-200 p-1 rounded-md w-max"
                    >
                      <p className="flex items-center justify-center relative top-[2px]">
                        {item}
                      </p>
                      <XMarkIcon
                        onClick={() => deletefetchers(index)}
                        className="w-4 font-bold cursor-pointer"
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
                    query.data.data.map((item) => (
                      <li
                        key={item._id}
                        className="flex items-center justify-center gap-1 bg-gray-200 p-1 px-2 rounded-md  "
                      >
                        {thisrel.includes(item._id) ? (
                          <input
                            onChange={() =>
                              checkcategory(
                                event,
                                `${item._id}*${item.slug}*${item.title}`
                              )
                            }
                            type="checkbox"
                            defaultChecked
                          />
                        ) : (
                          <input
                            onChange={() =>
                              checkcategory(
                                event,
                                `${item._id}*${item.slug}*${item.title}`
                              )
                            }
                            type="checkbox"
                          />
                        )}
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
                defaultValue={row.getValue("shortDesc")}
              />
              <textarea
                placeholder="توضیحات کامل"
                className="w-[96%] text-[13px] outline-none   border-[1px] border-gray-400 rounded-md p-3"
                {...register("longDesc")}
                defaultValue={row.getValue("longDesc")}
              />
              <Button
                disabled={querySend.isLoading}
                className="w-[96%]"
                type="submit"
              >
                ثبت محصول
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
