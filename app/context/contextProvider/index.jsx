"use client";

import Cookies from "js-cookie";
import { useQuery } from "react-query";
import axios from "axios";
import { AppContext } from "../appcontext";
import { useEffect, useState } from "react";

const ContextProvider = ({ children }) => {
  const [cartNum, setCartNum] = useState();
  const [nameuset, setNameuset] = useState();

  const cookieval = Cookies.get("auth_cookie");

  const config = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getauthdata = async () => {
    if (cookieval) {
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/cart-number`,
        config
      );
      return resp;
    }
  };
  const { data, isSuccess, isLoading } = useQuery(["cartttt"], getauthdata);

  const getauthdataname = async () => {
    if(cookieval){
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/get-part-user-data/info`,
        config
      );
        return resp;
    }
   
  };
  const query = useQuery(["info"], getauthdataname);

  useEffect(() => {
    if (cookieval && query.isSuccess &&query.data &&  query.data.data.username) {
      setNameuset(query.data.data.username);
    }
  }, [query]);

  useEffect(() => {
    if (isSuccess && data) {
      setCartNum(data.data.number);
    }
  }, [data]);



  return (
    <AppContext.Provider value={{ cartNum, setCartNum, isLoading, nameuset,setNameuset }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
