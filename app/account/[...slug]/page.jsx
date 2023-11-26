"use client";
import MainAccount from "@/components/account/mainaccount/page";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Account = ({ params }) => {
  const queryClient = useQueryClient();
  const [cookieval, setcookieval] = useState(Cookies.get("auth_cookie"));
  const [cookieval2, setcookieval2] = useState(Cookies.get("auth_cookie"));

  const config = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getauthdata = async () => {
    if (cookieval) {
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/get-user-data`,
        config
      );
      return resp;
    }
  };
  const query = useQuery(["fdsas"], getauthdata);

  useEffect(() => {
    setcookieval2(Cookies.get("auth_cookie"));
  }, [Cookies.get("auth_cookie")]);

  useEffect(() => {
    if (cookieval !== cookieval2 || !cookieval) {
      Cookies.set("auth_cookie", "", { expires: 0 });
      redirect("/login");
    }
  }, [cookieval2]);




  //   if (query.isSuccess && query.data.data.router) {
  //     redirect("/login");
  //   }



  return (
    <div className="lg:mx-12 mx-4 my-12">
      
      <MainAccount params={params} />
    </div>
  );
};

export default Account;
