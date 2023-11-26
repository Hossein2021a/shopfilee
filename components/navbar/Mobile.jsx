import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const components = [
  {
    title: "طراحی جلد کتاب",
    href: "/product?pn=1&category=book-shelf",
  },
  {
    title: "کتاب گرافیکی",
    href: "/product?pn=1&category=boog-gr",
  },
  {
    title: "اپلیکیشن ppt",
    href: "/product?pn=1&category=app-ppt",
  },
  {
    title: "اپلیکیشن گرافیکی",
    href: "/product?pn=1&category=app-gr",
  },
  {
    title: "سربرگ گرافیکی",
    href: "//product?pn=1&category=cr-gr",
  },
  {
    title: "پوستر گرافیکی",
    href: "/product?pn=1&category=poster-gr",
  },
];




function Mobile() {
  const [open, setOpen] = useState(false);



  return (
    <div className="flex items-center justify-center">
      <Sheet open={open} onOpenChange={setOpen} className="overflow-auto">
        <SheetTrigger>
          <div className="flex">
            <ul className="flex gap-[7px] flex-col items-center">
              <li className="md:w-[30px] w-[27px] md:h-[3px] h-[2px] bg-gray-500 rounded-md"></li>
              <li className="md:w-[30px] w-[27px] md:h-[3px] h-[2px] bg-gray-500 rounded-md"></li>
              <li className="md:w-[30px] w-[27px] md:h-[3px] h-[2px] bg-gray-500 rounded-md"></li>
            </ul>
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className=" w-full text-center mb-6">ژاکـــــت</div>

          {/* <div className="w-full flex flex-col items-start gap-9 mb-6 ">
            <div className="w-full flex items-center relative">
              <input
                placeholder="جستجو بین محصولات ..."
                className=" outline-none w-full text-[14px] px-4 border-[1px] h-[3rem] rounded-lg"
                autoFocus = {true}
              
              />
            </div>
          </div> */}
          <Accordion type="single" collapsible className="w-full">
          <AccordionItem className="border-b-[1px] border-gray-200 pb-2 "  onClick={() => setOpen(false)}  value="item-1">
              <Link href="/">صفحه اصلی</Link>
            </AccordionItem>

            <AccordionItem className="border-b-[1px] border-gray-200 "   value="item-8">
              <AccordionTrigger>دسته بندی ها</AccordionTrigger>
              <AccordionContent>
                <ul className="px-4 flex flex-col  gap-3">
                    <Link onClick={() => setOpen(false)} href="/product?pn=1&type=app&">
                      <li className="border-b-[1px] border-gray-200 pb-4">اپلیکیشن</li>
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/product?pn=1&type=gr&" >
                      <li className="border-b-[1px] border-gray-200 pb-4">گرافیک</li>
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/product?pn=1&type=book&" >
                      <li className="">کتاب</li>
                    </Link>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>


            <AccordionItem className="border-b-[1px] border-gray-200 "   value="item-2">
              <AccordionTrigger>زیر دسته ها</AccordionTrigger>
              <AccordionContent>
                <ul className="px-4 flex flex-col  gap-3">
                  {components.map((item , index) => (
                    <Link className="last:border-b-[0px] border-b-[1px] border-gray-200 pb-4 " onClick={() => setOpen(false)} key={index} href={`${item.href}`}>
                      <li >{item.title}</li>
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-b-[1px] border-gray-200 py-4 "  onClick={() => setOpen(false)}  value="item-14">
              <Link href="/blog">وبلاگ</Link>
            </AccordionItem>

            <AccordionItem className="border-b-[1px] border-gray-200 py-4 "  onClick={() => setOpen(false)}  value="item-15">
              <Link href="/product?orderby=none&pn=1&type=&minP=0&">محصولات</Link>
            </AccordionItem>

            <AccordionItem className="border-b-[1px] border-gray-200 py-4 "  onClick={() => setOpen(false)}  value="item-16">
              <Link href="/dashboard">داشبورد</Link>
            </AccordionItem>

            
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Mobile;
