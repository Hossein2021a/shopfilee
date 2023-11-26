"use client";

import { Button } from "@/components/ui/button";
import NewBanner from "./newcategory";
import AllBanner from "./allcategory";
import { useState } from "react";


const CategoryForm = () => {
  const [detail, setdetail] = useState(<AllBanner />);

  return (
    <div className=" mr-6">
    <section className=" flex justify-between items-center  ">
      <h1 className=" text-blue-500 text-lg underline text-[10px] md:text-[14px]">بنرهای تبلیغاتی</h1>
        <div className=" flex items-center gap-3">
          <Button onClick={()=> setdetail(<AllBanner />)}>مشاهده همه</Button>
          <Button onClick={()=> setdetail(<NewBanner />)}>دسته بندی جدید</Button>
        </div>
      </section>
      <div className="w-full mt-8">{detail}</div>
    </div>
  );
};

export default CategoryForm;
