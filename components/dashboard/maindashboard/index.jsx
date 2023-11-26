"use client";

import DashboardSide from "@/components/dashboard/dashboard-side";
import { useEffect, useState } from "react";
import SliderForms from "../forms/sliderforms";
import MiddleBannerForm from "../forms/midlebannersform";
import Posts from "../forms/posts/Posts";
import CategoryForm from "../forms/category";
import Products from "../forms/products/Products";
import UsersForm from "../forms/users";


const Maindashboard = () => {
  const [contentChanger, setcontentChanger] = useState("midbaner");
  const [detail, setdetail] = useState(<MiddleBannerForm />);


  

  useEffect(() => {
    if (contentChanger === "midbaner") {
      setdetail(<MiddleBannerForm />);
    } else if (contentChanger === "posts") {
      setdetail(<Posts />);
    } else if (contentChanger === "category") {
      setdetail(<CategoryForm />);
    } else if (contentChanger === "products") {
      setdetail(<Products />);
    } else if (contentChanger === "users") {
      setdetail(<UsersForm />);
    } else {
      setdetail(<SliderForms />);
    }
  }, [contentChanger]);

  return (
    <div className="lg:flex lg:px-12 px-4 mt-12">
      <div className="lg:block hidden">
        <DashboardSide setcontentChanger={setcontentChanger} />
      </div>
      <div className="w-full">{detail}</div>
    </div>
  );
};

export default Maindashboard;
