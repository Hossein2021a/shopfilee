"use client";

import { Button } from "@/components/ui/button";
import NewBanner from "./newusers";
import AllBanner from "./allusers";
import { useState } from "react";


const UsersForm = () => {
  const [detail, setdetail] = useState(<AllBanner />);


  return (
    <div className=" mr-6">
    <section className=" flex justify-between items-center  ">
        <h1 className=" text-blue-500 text-lg underline"> کاربران</h1>
        <div className=" flex items-center gap-3">
          <Button onClick={()=> setdetail(<AllBanner />)}>مشاهده همه</Button>
        </div>
      </section>
      <div className="w-full mt-8">{detail}</div>
    </div>
  );
};

export default UsersForm;
