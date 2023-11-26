"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationMenuDemo } from "../navbar/page";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Mobile from "../navbar/Mobile";
import { PhoneIcon } from "lucide-react";
import { useEffect, useRef, useState  } from "react";
import { useAppContext } from "@/app/context/appcontext";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryClient } from "react-query";

function Header() {
  const router = useRouter();
  const ref = useRef();


  const { cartNum, isLoading,nameuset } = useAppContext();
  const [open, setOpen] = useState(false);


  const [val, setval] = useState("");
  const inputSerach = (event) => {
    event.preventDefault();
    setval(event.target.value);
    if (event.key === "Enter") {
      if (event.target.value) {
        router.push(`/product?keyword=${event.target.value}&`);
      } else {
        return;
      }
      setOpen(false)
    }
  };

  const searchref = () => {
    if (ref.current.value) {
      router.push(`/product?keyword=${ref.current.value}&`);
    } else {
      return;
    }
    setOpen(false)

  };




  return (
    <header className="w-full my-2 md:my-6 shadow-md py-6 sm:pb-6 sm:py-0">
      <div className="flex items-center justify-between md:mx-12 mx-3 ">
        <div className="flex items-center md:gap-6 gap-3 flex-row-reverse ">
          <div className="flex items-center justify-center lg:hidden">
            <Mobile />
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <NavigationMenuDemo />
          </div>

          <Link href="/" className="hidden lg:block">
            <img
              priority
              width={44}
              height={45}
              quality={100}
              alt="لوگو"
              src="/logo3.svg"
            />
          </Link>

          <Link className="lg:hidden" href="/">
            <img
              priority
              width={34}
              height={34}
              quality={100}
              alt="لوگو"
              src="/logo2.svg"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center" >
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="select-none outline-none">
          
                <MagnifyingGlassIcon onClick={() => setOpen(true)} className="w-[20px] h-[20px] text-gray-500 select-none outline-none md:w-[26px] md:h-[26px]" />
              </DialogTrigger>
              <DialogContent className="h-[130px] flex items-center justify-center  border-[1px]">
              <input
              placeholder="جستجو بین محصولات (برای مثال کتاب)"
              className=" outline-none w-full text-[14px] px-4 border-[1px] h-[3rem] rounded-lg"
              type="text"
              name="form"
              onKeyUp={() => inputSerach(event)}
              ref={ref}
              defaultValue={val}
            />
               <div
              onClick={searchref}
              className="absolute cursor-pointer left-8 text-zinc-400"
            >
              <MagnifyingGlassIcon className="w-[26px] h-[26px] text-gray-500" />
            </div>
        
              </DialogContent>
            </Dialog>
          </div>
          <div onClick={() => router.push("/cart")} className=" relative border-l-[2px] cursor-pointer  border-gray-400 pl-4">
            <ShoppingBagIcon className="md:w-[26px] md:h-[26px] w-[20px] h-[20px] text-gray-500" />
            <span className=" text-[12px] absolute top-[-4px] right-[-4px] bg-rose-600 text-white w-4 h-4 text-center rounded-full">
            {isLoading ? (
                    <img
                      className=""
                      width={20}
                      height={20}
                      alt="loading"
                      src="/spin.gif"
                    />
                  ) : cartNum ? (
                    cartNum
                  ) : (
                    <p className="relative top-[-1px]">0</p>
                  )}
            </span>
          </div>

          <Link href="/login" className="text-[13px] text-gray-500 font-bold">
            {nameuset  ? nameuset : "ورود" }
          </Link>

          <Link href="/register">
            <Button className="text-[13px] bg-orange-600 h-[33px]">
              ثبت نام
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

