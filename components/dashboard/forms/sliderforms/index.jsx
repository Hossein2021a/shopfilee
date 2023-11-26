"use client";

import { Button } from "@/components/ui/button";
import NewBanner from "./newslider";
import AllBanner from "./allslider";
import { useState } from "react";


const  SliderMain = () => {
  const [detail, setdetail] = useState(<AllBanner />);




  return (
    <div className="w-[900px]">
      <section className=" flex justify-between items-center w-full">
        <h1 className=" text-blue-500 text-lg underline">اسلایدرهای صفحه اصلی</h1>
        <div className=" flex items-center gap-3">
          <Button onClick={()=> setdetail(<AllBanner />)}>مشاهده همه</Button>
          <Button onClick={()=> setdetail(<NewBanner />)}>اسلاید جدید</Button>
        </div>
      </section>
      <div className="w-full mt-8">{detail}</div>
    </div>
  );
};

export default SliderMain;
