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

import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

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
    accessorKey: "slug",
    header: "اسلاگ",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
  },
  {
    accessorKey: "shortDesc",
    header: "خلاصه مقاله",
  },
  {
    accessorKey: "published",
    header: "وضعیت",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("published") === true ? (
            <div
              className="bg-green-500 text-sm text-white 
      py-1 rounded-md"
            >
              منتشر شده
            </div>
          ) : (
            <div className="bg-rose-500 text-white py-1 rounded-md text-sm">
              پیش نویس
            </div>
          )}
        </div>
      );
    },
  },
  {
    header: "اقدامات",
    id: "actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();

  const cookieval = Cookies.get("auth_cookie");

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };

      const deletepost = async () => {
        const response = await axios.post(
          `https://nextapplicatin.iran.liara.run/api/delete-post/${row.getValue(
            "_id"
          )}`,{item:1},configss
        );
        return response;
      };

      const querydatadel = useMutation(deletepost, {
        onSuccess: () => {
          queryClient.invalidateQueries(["posts"]);
          Swal.close();
        },
      });

      const delpost = () => {
        querydatadel.mutateAsync(row.getValue("_id"));
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
                    delpost();
                  },
                });
              }}
            >
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
