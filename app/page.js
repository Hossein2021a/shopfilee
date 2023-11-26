import Image from "next/image";
import MainSlider from "@/components/slider/page";
import ProSlider from "@/components/productslider/slider1";
import ProSlider2 from "@/components/productslider/slider2";
import Middlebanner from "@/components/middlebanner";
export default function Home() {
  return (
   
    <main className="w-full mx-auto">
      <section className="mt-12 md:mx-12 mx-3  ">
        <MainSlider />
      </section>

      <section className=" mt-12 bg-blue-400 md:px-12 px-4 py-12">
           <div className="">
             <div>
               <ProSlider />
             </div>
           </div>
         </section>

   

      <Middlebanner />
      
         <section className=" mt-12 bg-blue-400 md:px-12 px-4 py-12">
           <div className="">
             <div>
               <ProSlider2 />
             </div>
           </div>
         </section>


     </main>
  );
}
