"use client";
import LoginForm from "@/components/auth/loginform";
import Cookies from "js-cookie";
import { useQuery  , useQueryClient} from "react-query";
import axios from "axios";
import { redirect } from 'next/navigation';
import { useAppContext } from "@/app/context/appcontext";
import { useEffect } from "react";



const loginPage = () => {
  const getcookievalue = Cookies.get("auth_cookie");
  const {cartNum , setCartNum} = useAppContext()
  const queryClient = useQueryClient()

  const config = {
    headers: {
      auth_cookie: getcookievalue,
    },
  };
  const getauthdata = async () => {
    if(getcookievalue) {
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/get-user-data`,
        config
      );
      return resp;
    }

  };
  if(getcookievalue){
    const query = useQuery(["fdsas"], getauthdata ,{
      onSuccess : () => {
      queryClient.removeQueries({ queryKey: ['cartttt'] })
        
      }
    });
    if(query.isSuccess && query.data.data._id){
      redirect("/account/info")
    }
  }





  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default loginPage;
