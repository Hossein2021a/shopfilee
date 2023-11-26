import Cookies from "js-cookie";
import axios from "axios";
import { useQuery, useQueryClient  ,useMutation } from "react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"

const Favorits = () => {
  const cookieval = Cookies.get("auth_cookie");
  const queryClient = useQueryClient();
  const { toast } = useToast()

  const configss = {
    headers: {
      auth_cookie: cookieval,
    },
  };
  const getauthdata = async () => {
    if (cookieval) {
      const resp = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/get-part-user-data/favorits`,
        configss
      );
      return resp;
    }
  };
  const query4 = useQuery(["infotel"], getauthdata, {
    refetchOnWindowFocus: false,
  });

  // if (query4.isSuccess) {
  //   console.log(query4.data.data);
  // }

  useEffect(() => {
    return () => {
      queryClient.removeQueries("infotel");
    };
  }, []);



  const getcookie = Cookies.get("auth_cookie")

  const config = {
    headers: {
      auth_cookie:getcookie 
    },
  };

  const senddelletefavoritProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/favorits-product`,
      body,
      config,
    );
    return resp
  };

  const query3 = useMutation(senddelletefavoritProduct , {
    onSuccess : (data) => {
      toast({
        title: "موفقیت",
        description: data && data.data.msg
      })
      queryClient.removeQueries("infotel")
    },

    onError : (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err && err.response.data.msg
      })
    }
  })
  const addtoFav = (ids) => {
    const data = {
      method : "remove",
      goalFavProductId : ids
    }
    if(getcookie){
      query3.mutateAsync(data)
    }else{
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید ..."
      })
    }
  }

  return (
    <div>
      {query4.isLoading && (
        <div className=" flex items-center justify-center p-12">
          <img width={120} priority height={120} alt="loading" src="/spin.gif" />
        </div>
      )}
      {query4.isSuccess && (
        <ul>
          {query4.data.data.length < 1 && <div>محصولی در علاقه مندی ها وجود ندارد</div>}
          {query4.data.data.map((item) => (
            <li className="flex md:flex-row flex-col gap-4 mb-4 bg-gray-200 py-4 px-5 rounded-md items-center ">
              <div>
                <img
                  className="w-auto h-auto rounded-md "
                  width={340}
                  height={0}
                  quality={100}
                  alt="afs"
                  priority
                  src={item.image}
                />
              </div>
              <div className="flex  flex-col items-center w-full mx-auto gap-4 ">
                <div className="flex justify-between items-center w-full text-[15px] font-bold  text-gray-700">
                  <p className="text-center w-full">{item.title}</p>
                  <p className="bg-green-500 text-white rounded-md p-2 text-[12px]">{item.typeofProduct == 'app' && "اپلیکیشن" || item.typeofProduct == 'gr' && "گرافیک" || item.typeofProduct == 'book' && "کتاب" }</p>
                </div>

                <p className="text-[13px] w-[80%] mx-auto">{item.shortDesc}</p>

                <div className="flex justify-between items-center  text-[14px] w-[80%]">
                  <p>تعداد خرید : {item.buyNumber}</p>

                  <p>قیمت : {item.price}</p>
                </div>

                <div className=" flex items-center justify-center border-t-[1px] pt-2 border-gray-500 w-full">
                  <p className="ml-2">ویژگی ها : </p>
                  <ul className=" flex items-center gap-4 text-[14px]">
                    {item.features.map((item)=>(
                      <li> * {item}</li>
                    ))}
               
                  </ul>
                </div>

                <Button onClick={() => addtoFav(item._id)} className="w-full ">حذف</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorits;
