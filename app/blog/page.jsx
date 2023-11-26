"use client";

import Blogbox from "@/components/productslider/Singleblogbox";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect, useState } from "react";

const Blog = ({ searchParams }) => {
  const [keyword, setkeyword] = useState(
    searchParams.keyword ? `keyword=${searchParams.keyword}&` : ""
  );

  const queryClient = useQueryClient();

  const { ref, inView } = useInView({
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  });

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects"],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `https://nextapplicatin.iran.liara.run/api/search-posts?${keyword}pn=${pageParam}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["projects"]);
      window.scrollTo(0, 0);
    };
  }, [keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        fetchNextPage();
      }, 300);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [inView]);

  const handleinput = (e) => {
    e.preventDefault();
    if (e.key == "Enter") {
      setkeyword(`keyword=${e.target.value}&`);
    }
  };

  return (
    <div className=" mt-12  mx-12  flex justify-center items-center flex-col  ">
      <div className="w-[98%] mx-auto flex items-center justify-center">
        <input
          onKeyUp={handleinput}
          className=" px-4 outline-none w-[99%] border-[1px] border-gray-400 rounded-md text-[13px] py-4"
          type="text"
          placeholder="جستجو در مقالات ... "
        />
      </div>

      {status === "loading" ? (
        <div className=" w-fit mx-auto items-center text-center flex justify-center ">
          <img width={120} height={120} alt="loading" src="/spin.gif" />
        </div>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div className=" ">
          {data.pages.map((group, index) => (
            <div key={index} className="grid grid-cols-1 w-[98%] mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-12 ">
              {group.allPosts.map((item, i) => (
                <div key={i} className="">
                  {item.published && (
                    <div className="mx-auto">
                      <Link href={`/blog/${item.slug}`}>
                        <Blogbox
                          key={item._id}
                          image={item.image}
                          title={item.title}
                          date={item.createdAt}
                          teacherName="محمد علی"
                          comment={item.comments.length}
                          text="اگر می‌خواهید خواننده متن فارسی‌تان را کنار نگذارد و آن را تا انتها بخواهند، از ویرایش و بازخوانی متن غافل نشوید. سرویس ویرایش و بازخوانی متون فارسی شبکه مترجمین ایران این‌جا است تا متون فارسی‌تان را خوانش‌پذیر کند.
              "
                        />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="w-fit mx-auto">
        <button
          ref={ref}
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <div className=" w-fit mx-auto items-center text-center flex justify-center ">
              <img width={120} height={120} alt="loading" src="/spin.gif" />
            </div>
          ) : hasNextPage ? (
            "مورد دیگری وجود ندارد"
          ) : (
            <div className=" w-fit mx-auto items-center text-center flex justify-center ">
              <img width={120} height={120} alt="loading" src="/spin.gif" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Blog;
