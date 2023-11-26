"use client";

import { Button } from "@/components/ui/button";

const DashboardsideBtn = ({
  title,
  content,
  setcontentChanger,
  color,
  setcolor,
}) => {


  const scrolltop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  return (
    <Button
    className ={color === content ? 'bg-rose-500 hover:bg-rose-500 h-12' : " h-12" }
      onClick={() => {
        setcontentChanger(content);
        setcolor(content);
        scrolltop()
      }}
    >
      {title}
    </Button>
  );
};

export default DashboardsideBtn;
