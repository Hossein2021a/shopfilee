"use client";

import { Button } from "@/components/ui/button";
import NewBanner from "./newbanner";
import AllBanner from "./allbanner";
import { useState } from "react";


const MiddleBannerForm = () => {
  const [detail, setdetail] = useState(<AllBanner />);




  return (
    <div className=" mr-6">
      <section className=" flex justify-between items-center  ">
        <h1 className=" text-blue-500 text-lg underline text-[10px] md:text-[14px]">بنرهای تبلیغاتی</h1>
        <div className=" flex items-center gap-3">
          <Button onClick={()=> setdetail(<AllBanner />)}>مشاهده همه</Button>
          <Button onClick={()=> setdetail(<NewBanner />)}>بنر جدید</Button>
        </div>
      </section>
      <div className="w-full mt-8">{detail}</div>
    </div>
  );
};

export default MiddleBannerForm;
