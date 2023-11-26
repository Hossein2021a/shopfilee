"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

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
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

;
export const columns = [
  {
    accessorKey: "username",
    header: "نام کاربری",
  },
  {
    accessorKey: "activeCode",
   
  },
  {
    accessorKey: "emailSend",
   
  },
  {
    accessorKey: "displayname",
    header: "نام نمایشی",
  },
  {
    accessorKey: "userisActive",
    header: "فعال/غیرفعال",
    cell: ({ row }) => {
      return <div>
        {row.getValue("userisActive") ? "فعال" : "غیرفعال" }
      </div>;
    },
  },
  {
    accessorKey: "viewed",
    header: "کاربر جدید",
    cell: ({ row }) => {
      return <div>
        {row.getValue("viewed") ? "خیر" : "بله" }
      </div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "زمان ثبت نام",
  },

  {
    accessorKey: "_id",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    header: "اقدامات",
    id: "actions",
    cell: ({ row }) => {
      const { register, handleSubmit } = useForm();
      const [open, setOpen] = useState(false);
      const [load, setload] = useState(false);
      const cookieval = Cookies.get("auth_cookie");

      const configss = {
        headers: {
          auth_cookie: cookieval,
        },
      }

      const queryClient = useQueryClient();

      const postdata = async (data) => {
        const response = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/update-user/${row.getValue("_id")}`,
          data,configss
        );
        return response;
      };

      const querydata = useMutation(postdata, {
        onSuccess: () => {
          queryClient.invalidateQueries(["cat"]);
          setOpen(false);
          setload(false);
        },
      });

      const onSubmit = (data) => {
        querydata.mutateAsync(data);
        setload(true);
      };

      const deletedata = async () => {
        const response = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/delete-user/${row.getValue(
            "_id"
          )}`,{item:1},configss
        );
        return response;
      };

      const querydatadel = useMutation(deletedata, {
        onSuccess: () => {
          queryClient.invalidateQueries(["cat"]);
          Swal.close();
        },
      });

      const delbanner = () => {
        querydatadel.mutateAsync(row.getValue("_id"));
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
                <DropdownMenuItem>ویرایش</DropdownMenuItem>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">ویرایش کاربر</DialogTitle>
            </DialogHeader>
            <form
              className=" flex flex-col gap-4 justify-center items-center overflow-auto max-h-[450px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]">نام نمایشی : </lable>
              <input
                defaultValue={row.getValue("displayname")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("displayname", { required: true })}
              />
                <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]">نام کاربری : </lable>
              <input
                defaultValue={row.getValue("username")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("username", { required: true })}
              />
               <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]"> کد فعالسازی : </lable>
              <input
                defaultValue={row.getValue("activeCode")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("activeCode", { required: true })}
              />
                     <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]"> کاربر فعال  : </lable>
               <select
                defaultValue={row.getValue("userisActive")}
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("userisActive")}
              >
                <option value="true">فعال</option>
                <option value="false">غیرفعال</option>
              </select>
              <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]">  ایمیل : </lable>
              <input
                defaultValue={row.getValue("email")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("email", { required: true })}
              />
               <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]">  دریافت ایمیل تبلیغاتی : </lable>
              <select
                defaultValue={row.getValue("emailSend")}
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("emailSend")}
              >
                <option value="true">فعال</option>
                <option value="false">غیرفعال</option>
              </select>
              <lable className="text-right w-[87%] text-rose-800 text-[13px] leading-[0px]">  تایید شده توسط مدیر : </lable>
              <select
                defaultValue={row.getValue("viewed")}
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("viewed")}
              >
                <option value="true">دیده شده</option>
                <option value="false">دیده نشده</option>
              </select>
   
              <Button
                disabled={load}
                className=" w-[90%] bg-green-600 hover:opacity-[0.9] hover:bg-green-600 transition"
                type="submit"
              >
                ویرایش
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
