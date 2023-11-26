"use client";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleProduct from "@/components/productslider/SingleProduct";
import Breadcrump from "@/components/Breadcrunb/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const Shop = ({ url }) => {
  const router = useRouter();
  const maxref = useRef();
  const minref = useRef();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);


  const [keyword, setkeyword] = useState(
    url.keyword ? `keyword=${url.keyword}&` : ""
  );
  const [orderby, setorderby] = useState(
    url.orderby ? `orderby=${url.orderby}&` : ""
  );
  const [pn, setpn] = useState(url.pn ? `pn=${url.pn}&` : "");
  const [type, settype] = useState(url.type ? `type=${url.type}&` : "");
  const [maxP, setmaxP] = useState(url.maxP ? `maxP=${url.maxP}&` : "");
  const [minP, setminP] = useState(url.minP ? `minP=${url.minP}&` : "");
  const [category, setcategory] = useState(
    url.category ? `category=${url.category}` : ""
  );

  const queries = `${keyword ? keyword : ""}${orderby ? orderby : ""}${
    pn ? pn : ""
  }${type ? type : ""}${minP ? minP : ""}${maxP ? maxP : ""}${
    category ? category : ""
  }`;
  const backurl = `https://nextapplicatin.iran.liara.run/api/search-products?${queries}`;
  const mainurl = `/product?${queries}`;

  const getallproductkey = async () => {
    const res = await axios.get(backurl);
    return res;
  };
  const queryClient = useQueryClient();
  const query = useQuery(["keywords"], getallproductkey, {
    refetchOnWindowFocus: false,
  });

  const getallcat = async () => {
    const res = await axios.get(
      `https://nextapplicatin.iran.liara.run/api/get-active-categories`
    );
    return res;
  };
  const query1 = useQuery(["categories"], getallcat, {
    refetchOnWindowFocus: false,
  });

  // if (query1.isSuccess) {
  //   console.log(query1.data.data);
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    router.push(mainurl);
    setOpen(false)

    return () => {
      queryClient.removeQueries("keywords");
      window.scrollTo(0, 0);
    };
  }, [keyword, orderby, pn, type, minP, maxP, category]);

  useEffect(() => {
    if (url.keyword) {
      setkeyword(`keyword=${url.keyword}&`);
      setpn("pn=1&");
    }

    if (url.type || url.category) {
      setpn("pn=1&");
    }
  }, [url.keyword, url.type, url.category]);

  const handleOrder = (e) => {
    setorderby(`orderby=${e.target.value}&`);
  };

  const handleproduct = (e) => {
    settype(`type=${e.target.value}&`);
  };

  const handlePrice = () => {
    if (maxref.current.value != "") {
      setmaxP(`maxP=${maxref.current.value}&`);
    }
    if (minref.current.value != "") {
      setminP(`minP=${minref.current.value}&`);
    }
  };

  const categoryHandler = (v) => {
    v.preventDefault();
    if (v.target.checked) {
      if (category.length > 0) {
        setcategory(`${category},${v.target.value}`);
      } else {
        setcategory(`category=${v.target.value}`);
      }
    } else {
      const numofcama = category.split(",").length - 1;

      let a = category.includes(`,${v.target.value}`)
        ? category.replace(`,${v.target.value}`, "")
        : numofcama == 0
        ? ""
        : category.replace(`${v.target.value},`, "");
      console.log(numofcama);

      setcategory(a);
    }

    // console.log(category);
  };

  const getcookie = Cookies.get("auth_cookie");

  const config = {
    headers: {
      auth_cookie: getcookie,
    },
  };

  const sendfavoritProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/favorits-product`,
      body,
      config
    );
    return resp;
  };

  const query3 = useMutation(sendfavoritProduct, {
    onSuccess: (data) => {
      toast({
        title: "موفقیت",
        description: data && data.data.msg,
      });
    },

    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err && err.response.data.msg,
      });
    },
  });
  const addtoFav = (ids) => {
    const data = {
      method: "push",
      newFavProduct: ids,
    };
    if (getcookie) {
      query3.mutateAsync(data);
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید ...",
      });
    }
  };

  //cart

  const sendCartProduct = async (body) => {
    const resp = await axios.post(
      `https://nextapplicatin.iran.liara.run/api/cart-manager`,
      body,
      config
    );
    return resp;
  };

  const query4 = useMutation(sendCartProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cartttt"] });

      toast({
        title: "موفقیت",
        description: data && data.data.msg,
      });
    },

    onError: (err) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: err && err.response.data.msg,
      });
    },
  });

  const addtocart = (ids) => {
    const data = {
      method: "push",
      newCartProduct: ids,
    };
    if (getcookie) {
      query4.mutateAsync(data);
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اپتدا وارد شوید ...",
      });
    }
  };

  return (
    <div className="lg:px-12 px-4 py-12 w-full">
      <div className="sm:hidden">
      <Sheet className="w-full" open={open} onOpenChange={setOpen}>
        <SheetTrigger className="text-center w-full py-4 ">
          <div className="bg-rose-700 text-white w-fit px-3 mx-auto flex items-center justify-center py-2 rounded-md">
            <span> جستجوی پیشرفته</span>
            <span>
              <AdjustmentsHorizontalIcon className="w-[25px]" />
            </span>
          </div>
        </SheetTrigger>
        <SheetContent>
        <aside className="lg:w-[30%] mt-8   border-[1px] px-4 py-2 rounded-md h-fit">
          <div className=" border-b-[1px] py-4">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              مرتب سازی براساس :
            </p>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2 border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="none"
                  checked={url.orderby == "none"}
                  id="none"
                />
                <Label className="text-[12px]" htmlFor="none">
                  جدیدترین
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="price"
                  id="price"
                  checked={url.orderby == "price"}
                />
                <Label className="text-[12px]" htmlFor="price">
                  ارزانترین
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="buynumber"
                  id="buynumber"
                  checked={url.orderby == "buynumber"}
                />
                <Label className="text-[12px]" htmlFor="buynumber">
                  پرفروش ترین
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="pageView"
                  id="pageView"
                  checked={url.orderby == "pageView"}
                />
                <Label className="text-[12px]" htmlFor="pageView">
                  پربازدیدترین
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className=" border-b-[1px] py-4">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              نوع محصول :
            </p>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2 border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value=""
                  checked={url.type == ""}
                  id="all"
                />
                <Label className="text-[12px]" htmlFor="all">
                  همه
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value="gr"
                  id="gr"
                  checked={url.type == "gr"}
                />
                <Label className="text-[12px]" htmlFor="price">
                  گرافیک
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value="app"
                  id="app"
                  checked={url.type == "app"}
                />
                <Label className="text-[12px]" htmlFor="buynumber">
                  اپلیکیشن
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value="book"
                  id="book"
                  checked={url.type == "book"}
                />
                <Label className="text-[12px]" htmlFor="pageView">
                  کتاب
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="py-4 border-b-[1px]">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              مرتب سازی براساس قیمت:
            </p>

            <div className="flex gap-6 w-fit justify-center items-center mx-auto">
              <input
                defaultValue={url.minP ? url.minP : 0}
                ref={minref}
                placeholder="از : "
                className="border-[1px] text-[13px] border-gray-500 w-[100px] px-2 py-[6px] rounded-md"
                type="number"
                min={0}
              />
              <input
                min={0}
                ref={maxref}
                placeholder="تا :"
                className="border-[1px]  text-[13px] w-[100px] px-2  border-gray-500 rounded-md py-[6px]"
                type="number"
                defaultValue={url.maxP ? url.maxP : ""}
              />
            </div>

            <Button
              onClick={handlePrice}
              className="flex w-[88%] text-[13px] items-center justify-center mt-4 mx-auto h-9"
            >
              اعمال فیلتر
            </Button>
          </div>

          <div className="py-4 ">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              مرتب سازی براساس دسته بندی:
            </p>

            <div className="flex w-full  px-4 justify-center items-center mx-auto">
              <ul className="flex w-full items-start flex-col h-[150px] overflow-auto justify-start gap-4 ">
                {query1.isSuccess &&
                  query1.data.data.map((item) => (
                    <li
                      className="flex items-center justify-end  cursor-pointer gap-4 "
                      key={item._id}
                    >
                      <input
                        onClick={categoryHandler}
                        value={item.slug}
                        id={item.slug}
                        type="checkbox"
                        checked={
                          url.category && url.category.includes(item.slug)
                        }
                      />
                      <Label
                        htmlFor={item.slug}
                        className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.title}
                      </Label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>
        </SheetContent>
      </Sheet>
      </div>


      <div className="w-full flex gap-6 ">
        <aside className="lg:w-[30%] sticky top-3 w-[40%] border-[1px] px-4 py-2 rounded-md h-fit hidden sm:block">
          <div className=" border-b-[1px] py-4">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              مرتب سازی براساس :
            </p>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2 border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="none"
                  checked={url.orderby == "none"}
                  id="none"
                />
                <Label className="text-[12px]" htmlFor="none">
                  جدیدترین
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="price"
                  id="price"
                  checked={url.orderby == "price"}
                />
                <Label className="text-[12px]" htmlFor="price">
                  ارزانترین
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="buynumber"
                  id="buynumber"
                  checked={url.orderby == "buynumber"}
                />
                <Label className="text-[12px]" htmlFor="buynumber">
                  پرفروش ترین
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleOrder}
                  value="pageView"
                  id="pageView"
                  checked={url.orderby == "pageView"}
                />
                <Label className="text-[12px]" htmlFor="pageView">
                  پربازدیدترین
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className=" border-b-[1px] py-4">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              نوع محصول :
            </p>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2 border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value=""
                  checked={url.type == ""}
                  id="all"
                />
                <Label className="text-[12px]" htmlFor="all">
                  همه
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value="gr"
                  id="gr"
                  checked={url.type == "gr"}
                />
                <Label className="text-[12px]" htmlFor="price">
                  گرافیک
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value="app"
                  id="app"
                  checked={url.type == "app"}
                />
                <Label className="text-[12px]" htmlFor="buynumber">
                  اپلیکیشن
                </Label>
              </div>
              <div className="flex items-center space-x-2  border-[1px] rounded-md py-2 justify-center">
                <RadioGroupItem
                  onClick={handleproduct}
                  value="book"
                  id="book"
                  checked={url.type == "book"}
                />
                <Label className="text-[12px]" htmlFor="pageView">
                  کتاب
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="py-4 border-b-[1px]">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              مرتب سازی براساس قیمت:
            </p>

            <div className="flex gap-6 w-fit justify-center items-center mx-auto">
              <input
                defaultValue={url.minP ? url.minP : 0}
                ref={minref}
                placeholder="از : "
                className="border-[1px] text-[13px] border-gray-500 w-[100px] px-2 py-[6px] rounded-md"
                type="number"
                min={0}
              />
              <input
                min={0}
                ref={maxref}
                placeholder="تا :"
                className="border-[1px]  text-[13px] w-[100px] px-2  border-gray-500 rounded-md py-[6px]"
                type="number"
                defaultValue={url.maxP ? url.maxP : ""}
              />
            </div>

            <Button
              onClick={handlePrice}
              className="flex w-[88%] text-[13px] items-center justify-center mt-4 mx-auto h-9"
            >
              اعمال فیلتر
            </Button>
          </div>

          <div className="py-4 ">
            <p className="mb-3 text-[14px] text-gray-800 text-center bg-gray-100 rounded-md py-1">
              مرتب سازی براساس دسته بندی:
            </p>

            <div className="flex w-full gap-6 px-4 justify-center items-center mx-auto">
              <ul className="flex w-full items-start flex-col h-[150px] overflow-auto justify-start gap-4">
                {query1.isSuccess &&
                  query1.data.data.map((item) => (
                    <li
                      className="flex items-center justify-end gap-2 cursor-pointer"
                      key={item._id}
                    >
                      <input
                        onClick={categoryHandler}
                        value={item.slug}
                        id={item.slug}
                        type="checkbox"
                        checked={
                          url.category && url.category.includes(item.slug)
                        }
                      />
                      <Label
                        htmlFor={item.slug}
                        className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.title}
                      </Label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="w-full">
          {query.isLoading ? (
            <div className="w-[70%] mx-auto items-center text-center">
              <img width={120} height={120} alt="loading" src="/spin.gif" />
            </div>
          ) : (
            <div className="w-full">
              <ul className="grid  md:grid-cols-2  lg:grid-cols-3 gap-4 ">
                {query.isSuccess &&
                  query.data.data.allProducts.map((item) => (
                    <li
                      className="flex items-center justify-center"
                      key={item._id}
                    >
                      <SingleProduct
                        image={item.image}
                        title={item.title}
                        featchers={item.features.map((fet, index) => (
                          <span
                            key={index}
                            className="text-[12px] bg-gray-200 px-3 py-2 rounded-md"
                          >
                            {fet}
                          </span>
                        ))}
                        price={item.price + " " + "تومان"}
                        cartfunc={() => addtocart(item._id)}
                        link={"/product/" + item.slug}
                        time={
                          (item.typeofProduct === "book" && "کتاب") ||
                          (item.typeofProduct === "app" && "اپلیکیشن") ||
                          (item.typeofProduct === "gr" && "گرافیک")
                        }
                        secCat={item.category.map((cat) => (
                          <span className="text-12 bg-gray-200 py-2 px-3 rounded-md text-[11px] text-black">
                            {cat}
                          </span>
                        ))}
                        favfunc={() => addtoFav(item._id)}
                      />
                    </li>
                  ))}
              </ul>

              <ul className="flex items-center justify-center ">
                {query.isSuccess &&
                  query.data.data.btns &&
                  query.data.data.btns.length > 1 &&
                  query.data.data.btns.map((item, index) => (
                    <li
                      onClick={() => {
                        setpn(`pn=${Number(item) + 1}&`);
                      }}
                      key={index}
                      className={
                        url.pn && url.pn == item + 1
                          ? "bg-orange-400 cursor-pointer border-[1px] rounded-md px-3 py-1 text-white"
                          : "bg-gray-400 cursor-pointer border-[1px] rounded-md px-3 py-1 text-white"
                      }
                    >
                      {item + 1}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
