"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";

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
    accessorKey: "imageAlt",
    header: "آلت عکس",
  },
  {
    accessorKey: "_id",
  },
  {
    accessorKey: "link",
    header: "لینک",
  },
  {
    accessorKey: "date",
    header: "تاریخ ایجاد",
  },
  {
    accessorKey: "situation",
    header: "وضعیت",
    cell: ({ row }) => {
      return <div>{row.getValue("situation") === true ? "روشن" : "خاموش"}</div>;
    },
  },
  {
    header: "اقدامات",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      const { register, handleSubmit } = useForm();
      const [open, setOpen] = useState(false);
      const [load, setload] = useState(false);

      const cookieval = Cookies.get("auth_cookie");

      const configss = {
        headers: {
          auth_cookie: cookieval,
        },
      };

      const queryClient = useQueryClient();

      const postdata = async (data) => {
        const response = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/update-middle-banner/${row.getValue(
            "_id"
          )}`,
          data,
          configss
        );
        return response;
      };

      const querydata = useMutation(postdata, {
        onSuccess: () => {
          queryClient.invalidateQueries(["ban"]);
          setOpen(false);
          setload(false);
        },
      });

      const onSubmit = (data) => {
        const newdata = { ...data, goalID: row.getValue("_id") };
        querydata.mutateAsync(newdata);
        setload(true);
      };

      const deletedata = async () => {
        const response = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/delete-middle-banner/${row.getValue(
            "_id"
          )}`,{item:1} , configss
        );
        return response;
      };

      const querydatadel = useMutation(deletedata, {
        onSuccess: () => {
          queryClient.invalidateQueries(["ban"]);
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
                {" "}
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">ویرایش بنر</DialogTitle>
            </DialogHeader>
            <form
              className=" flex flex-col gap-4 justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                defaultValue={row.getValue("image")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("image", { required: true })}
              />
              <input
                defaultValue={row.getValue("imageAlt")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("imageAlt", { required: true })}
              />
              <input
                defaultValue={row.getValue("link")}
                className="p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("link", { required: true })}
              />
              <select
                defaultValue={row.getValue("situation")}
                className=" p-[10px] rounded-md text-[14px] outline-none border-[1px] border-zinc-500 w-[90%]"
                {...register("situation")}
              >
                <option value="true">روشن</option>
                <option value="false">خاموش</option>
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
