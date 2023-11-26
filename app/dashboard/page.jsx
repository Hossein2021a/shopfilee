"use client";

import Cookies from "js-cookie";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../not-found";

import Maindashboard from "@/components/dashboard/maindashboard";

const page = () => {
  const [cookieval, setcookieval] = useState(Cookies.get("auth_cookie"));

  const router = useRouter();
  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getadmib = async () => {
    const resp = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-user-admin-data`,
      configss
    );
    return resp;
  };
  const { data, isSuccess } = useQuery(["getadmin"], getadmib, {
    onError: () => {
      router.push("/");    },
    onSuccess : (data) => {
      if(!data.data._id)
      router.push("/");
    }
  });
 



  return (
    <div>
      {isSuccess && data.data._id && <Maindashboard />}
    </div>
  );
};

export default page;
