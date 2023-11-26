import Image from "next/image";

import {
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

export default function Blogbox({ image, title, date, comment, text }) {
  return (
    <div
      style={{ boxShadow: "0 0 7px 0 #eaeff4", width: "inherit" }}
      className=" rounded-md flex flex-col items-center  max-w-[350px] mb-[2rem] bg-white "
    >
      <div className="w-full p-2" >
        <img
        
          src={image}
          alt="image"
          width={250}
          height={250}
          className="p-2 border-dashed border-[1px] border-gray-300 rounded-md overflow-hidden w-full"
        />
      </div>

      <div className="flex flex-col w-full pt-2 p-4 pb-5 bg-sidepic bg-no-repeat bg-[length:25px]  relative top-1">
        <div
          href="#"
          className="text-14 text-center text-demibold mb-[1rem]  pb-4 text-title-color line-clamp-1 h-[25px]
      "
        >
          {title}
        </div>

        <div className="flex items-center justify-between w-full text-text-color border-t-[1px] border-gray-200 pt-[0.5rem] mb-[1rem]">
          <div className="flex items-center gap-2  ">
            <CalendarDaysIcon className="w-5 h-5 text-green-600" />
            <span className="text-[12px]">{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-green-600" />

            <span className="text-[13px]">{comment} دیدگاه</span>
          </div>
        </div>

        <div className="w-full border-gray-50 flex items-center justify-between  ">
          <div className=" w-full rounded-md shadow-sm  ">
            <p className=" w-full line-clamp-3 text-[11px] text-right  border-[1rem] border-transparent bg-gray-100 ">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
