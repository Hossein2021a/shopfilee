"use client";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";

const Middlebanner = () => {
  const getAllMiddleBanner = async () => {
    const response = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/get-active-mid-bans"
    );
    return response;
  };

  const { data, isSuccess, isLoading } = useQuery(
    ["banner2"],
    getAllMiddleBanner
  );

  return (
    <section className=" w-full px-12 mx-auto mt-12">
      {isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}
      {isSuccess && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mx-auto w-auto ">
          {data.data.map(
            (item) =>
              item.situation && (
                <img
                key={item._id}
                  className="border-[1px] border-dashed h-auto p-3 shadow-lg  mx-auto rounded-md"
                  src={item.image}
                  alt="image"
                  width={500}
                  height={250}
                  quality={100}
                />
              )
          )}
        </div>
      )}
    </section>
  );
};

export default Middlebanner;
