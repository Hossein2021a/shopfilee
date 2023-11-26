import Link from "next/link";
import { ShoppingCartIcon , BookmarkIcon } from "@heroicons/react/24/outline";

export default function SingleProduct({
  image,
  title,
  featchers,
  time,
  price,
  link,
  secCat,
  favorits,
  favfunc,
  cartfunc
})

{
  return (
    <div
      style={{ boxShadow: "0 0 7px 0 #eaeff4", width: "inherit" }}
      className=" fullpro rounded-md flex flex-col items-center  w-[300px] mb-[2rem] bg-white "
    >
      <Link className="w-full" href={link}>
        <img
          className=" rounded-t-sm overflow-hidden w-full h-[180px] "
          src={`${image}`}
        />
      </Link>

      <div className="flex text-[13px] flex-col w-full p-4 pb-5 bg-sidepic bg-no-repeat bg-[length:25px]  relative top-1">
        <div className="flex items-center gap-2 justify-between mb-3">
        <Link
          href={link}
          className="text-12 text-right text-demibold line-clamp-1 text-title-color"
        >
          {title}
        </Link>
 

            <button onClick={favfunc} className=" bg-green-500 w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
              <BookmarkIcon className= {favorits ? "w-4 h-4 text-red-500 fill-red-500 font-bold" :
               "w-4 h-4 text-white  font-bold" } />
            </button>
        </div>
   

        <div className="flex items-center justify-between w-full text-text-color mb-[1rem]">
          <div className="flex flex-wrap items-center gap-2  ">
            {featchers}
          </div>
        </div>

        <div className="w-full text-[14px] border-t-[1px] border-gray-200 flex items-center justify-between py-2  ">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-blue-500">دسته بندی : {time}</span>
          </div>
          <div className="flex items-center gap-2 flex-row-reverse">
     
                 <button  onClick={cartfunc} className=" bg-green-500  px-2 py-2 flex items-center justify-center rounded-md cursor-pointer">
              <ShoppingCartIcon className="w-4 h-4 text-white font-bold" />
            </button>
          
            <span className={`text-[#52ac66] text-[12px]`}>{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
