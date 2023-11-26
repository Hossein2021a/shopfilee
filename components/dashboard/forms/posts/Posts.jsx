"use client";

import { Button } from "@/components/ui/button";
import NewPost from "./newpost";
import AllPosts from "./allposts";
import { useState } from "react";


const Posts = () => {
  const [detail, setdetail] = useState(<AllPosts />);

  return (
    <div className=" mr-6">
    <section className=" flex justify-between items-center  ">
      <h1 className=" text-blue-500 text-lg underline text-[10px] md:text-[14px]">پست ها</h1>
        <div className=" flex items-center gap-3">
          <Button onClick={()=> setdetail(<AllPosts />)}>مشاهده همه</Button>
          <Button onClick={()=> setdetail(<NewPost />)}>پست جدید</Button>
        </div>
      </section>
      <div className="w-full mt-8">{detail}</div>
    </div>
  );
};

export default Posts;
