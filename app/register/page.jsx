"use client";
import RegisterForm from "@/components/auth/registerform";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import axios from "axios";
import { redirect } from "next/navigation";

const RegistePage = () => {
  const getcookievalue = Cookies.get("auth_cookie");

  const config = {
    headers: {
      auth_cookie: getcookievalue,
    },
  };
  const getauthdata = async () => {
    if (getcookievalue) {
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/get-user-data`,
        config
      );
      return resp;
    }
  };
  if (getcookievalue) {
    const query = useQuery(["fdsas"], getauthdata);
    if (query.isSuccess && query.data.data._id) {
      redirect("/account/info");
    }
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegistePage;
