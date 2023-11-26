"use client";

import { Button } from "@/components/ui/button";
import NewProduct from "./newproduct";
import AllProduct from "./allProducts";
import { useState } from "react";


const Products = () => {
  const [detail, setdetail] = useState(<AllProduct />);

  return (
    <div className=" mr-6">
    <section className=" flex justify-between items-center  ">
        <h1 className=" text-blue-500 text-lg underline">محصولات</h1>
        <div className=" flex items-center gap-3">
          <Button onClick={()=> setdetail(<AllProduct />)}>مشاهده همه</Button>
          <Button onClick={()=> setdetail(<NewProduct />)}>محصول جدید</Button>
        </div>
      </section>
      <div className="w-full mt-8">{detail}</div>
    </div>
  );
};

export default Products;
