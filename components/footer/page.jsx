
import Image from "next/image";

import {} from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <div className="flex flex-col md:pl-[2rem] md:pr-[2rem]   border-t-[1px] border-gray-200 max-w-[1500px] m-auto mt-[5rem]">
      <ul className=" flex flex-col md:flex-row  items-center gap-4 md:gap-0 w-full justify-center md:justify-between p-[1rem] border-b-[1px] border-gray-200">
        <li className="flex items-center gap-1">
          <img
            className="w-[90px]"
            alt="foot"
            src="/foot1.webp"
            height={150}
            width={150}
          />

          <div className="flex flex-col gap-1 text-center">
            <span className=" text-extrabold text-[16px] text-title-color">
              رتبه یک آموزش
            </span>
            <span className="text-[14px] w-[100%] text-text-color">
              معتبرترین وب سایت آموزشی کل کشور
            </span>
          </div>
        </li>

        <li className="flex items-center gap-1  text-center">
          <img
            className="w-[90px]"
            alt="foot"
            src="/foot2.webp"
            height={150}
            width={150}
          />

          <div className="flex flex-col gap-1  text-center">
            <span className=" text-extrabold text-[16px] text-title-color">
              رتبه یک آموزش
            </span>
            <span className="text-[14px] w-[100%] text-text-color">
              معتبرترین وب سایت آموزشی کل کشور
            </span>
          </div>
        </li>

        <li className="flex items-center gap-1  text-center">
          <img
            className="w-[90px]"
            alt="foot"
            src="/foot3.webp"
            height={150}
            width={150}
          />

          <div className="flex flex-col gap-1">
            <span className=" text-extrabold text-[16px] text-title-color">
              رتبه یک آموزش
            </span>
            <span className="text-[14px] w-[100%] text-text-color">
              معتبرترین وب سایت آموزشی کل کشور
            </span>
          </div>
        </li>
      </ul>

      <div className=" hidden lg:flex items-start w-full justify-between p-[2rem]  border-b-1 ">
        <div className="flex items-center w-1/2 justify-evenly">
          <ul className="flex flex-col gap-2 ">
            <p className=" text-extrabold text-title-color text-[16px]">
              امپراطور
            </p>
            <li className="">درباره ما</li>
            <li>تماس با ما</li>
            <li>چرا امپراطور</li>
            <li> بازگشت وجه</li>
            <li>مرکز پشتیبانی</li>
          </ul>

          <ul className="flex flex-col gap-2">
            <p className="text-extrabold text-title-color text-[16px]">
              خدمات مشتریان
            </p>
            <li>راهنمای خرید</li>
            <li>راهنمای مشتریان</li>
            <li>راهنمایی استرداد</li>
            <li>پرسش و پاسخ</li>
            <li>قوانین و مقررات</li>
          </ul>

          <ul className="flex flex-col gap-2">
            <p className="text-extrabold text-title-color text-[16px]">
              اطلاعات تکمیلی
            </p>
            <li>فروش سازمانی</li>
            <li>همکاری</li>
            <li>فرصت شغلی</li>
            <li>راهنمای سایت</li>
            <li>نقشه سایت</li>
          </ul>
        </div>

        <div className="w-1/2 flex flex-col gap-2">
          <div className=" flex  items-end flex-col gap-2">
      
            <p className=" text-[15px] text-text-color">
              تلفن پشتیبانی: 021۴۳۹۰۰۰۰۰
            </p>
            <p className="text-[15px] text-text-color">
              دفتر پشتیبانی: اکباتان، نبش اتوبان لشگری، کوی بیمه، خیابان بیمه
              چهارم، بن‌بست گل‌ها، پلاک 1
            </p>
          </div>
          <div className="hidden sm:flex  items-center justify-end gap-2">
            <img
              className="border-[1px] rounded-md w-[90px]  h-[90px] object-contain p-2"
              alt="foot"
              src="/fot7.svg"
              height={150}
              width={150}
            />
            <img
              className="border-[1px] rounded-md w-[90px]  h-[90px] object-contain p-2"
              alt="foot"
              src="/fot2.svg"
              height={150}
              width={150}
            />
            <img
              className="border-[1px] rounded-md w-[90px]  h-[90px] object-contain p-2"
              alt="foot"
              src="/fot1.png"
              height={150}
              width={150}
            />

            <img
              className="border-[1px] rounded-md w-[90px]  h-[90px] object-contain p-2"
              alt="foot"
              src="/fot3.png"
              height={150}
              width={150}
            />
            <img
              className="border-[1px] rounded-md w-[90px]  h-[90px] object-contain p-2"
              alt="foot"
              src="/fot5.png"
              height={150}
              width={150}
            />
            <img
              className="border-[1px] rounded-md w-[90px]  h-[90px] object-contain p-2"
              alt="foot"
              src="/fot4.png"
              height={150}
              width={150}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pr-[1rem] pl-[1rem] mb-4 md:mb-0">
        <p className="text-[14px] p-[2rem] text-center ">
          کلیه حقوق این سرویس (وب‌سایت و اپلیکیشن‌های موبایل) محفوظ و متعلق به
          این شرکت می‌باشد. (نسخه 2.7.5)
        </p>

        <div className="flex items-center gap-4 text-xl  text-title-color">
          
          {/* <SlSocialGoogle />
          <SlSocialInstagram />
          <SlSocialLinkedin />
          <SlSocialYoutube />
          <SlSocialTwitter /> */}
        </div>
      </div>

      <div></div>
    </div>
  );
}
