"use client";
import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "react-query";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Allbanner() {
  const cookieval = Cookies.get("auth_cookie");

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getallPosts = async () => {
    const resp = await axios.get(
      "https://nextapplicatin.iran.liara.run/api/posts",configss
    );
    return resp;
  };

  const { data, isSuccess , isLoading } = useQuery(["posts"], getallPosts);

  // if (isSuccess) {
  //   console.log(data);
  // }


  return (
    <div className="container  p-0  lg:py-10">
      {isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      )}

      {isSuccess && <DataTable columns={columns} data={data.data} />}
    </div>
  );
}
