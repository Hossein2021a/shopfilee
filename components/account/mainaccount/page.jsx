"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Info from "./info/page";
import Favorits from "./favorits/page";
import Comments from "./comments/page";
import File from "./file/page";
import Orders from "./orders/page";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const MainAccount = ({ params }) => {
  const [detail, setdetail] = useState(<Info />);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params.slug[0] === "info") {
      setdetail(<Info />);
    } else if (params.slug[0] === "favorits") {
      setdetail(<Favorits />);
    } else if (params.slug[0] === "comments") {
      setdetail(<Comments />);
    } else if (params.slug[0] === "file") {
      setdetail(<File />);
    } else {
      setdetail(<Orders />);
    }
  }, [params.slug[0]]);

  return (
    <div>
      <div className="lg:hidden block">
        <Sheet className="w-full " open={open} onOpenChange={setOpen}>
          <SheetTrigger className="text-center w-full py-4 ">
            <div className="bg-rose-700 text-white w-fit px-3 mx-auto flex items-center justify-center py-2 rounded-md">
              <span className="ml-4">دیدن منو ها</span>
              <span>
                <AdjustmentsHorizontalIcon className="w-[25px]" />
              </span>
            </div>
          </SheetTrigger>
          <SheetContent>
            <ul className="flex flex-col justify-center items-center gap-3">
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/info">اطلاعات</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/favorits">علاقه ها</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/file">فایل ها</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/comments">دیدگاه ها</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/orders">سفارشات</Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-center">
        <nav className="hidden lg:block w-[20%] ml-8">
          <div className=" sticky top-3">
            <ul className="flex flex-col justify-center gap-3">
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/info">اطلاعات</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/favorits">علاقه ها</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/file">فایل ها</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/comments">دیدگاه ها</Link>
              </li>
              <li className="w-[250px] bg-rose-500 text-white text-center rounded-md py-3">
                <Link href="/account/orders">سفارشات</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="lg:w-[80%] w-full">
          <div>{detail}</div>
        </main>

        <div></div>
      </div>
    </div>
  );
};

export default MainAccount;
