"useclient";

import { useState } from "react";
import DashboardsideBtn from "./btn";

const DashboardSide = ({ setcontentChanger }) => {
  const [color, setcolor] = useState("midbaner");

  return (
    <div className=" w-[300px] bg-zinc-100 flex flex-col gap-3 p-4 sticky top-3 bottom-0 ">
      <DashboardsideBtn
        title="بنرهای تبلیغاتی"
        content={"midbaner"}
        setcontentChanger={setcontentChanger}
        color={color}
        setcolor={setcolor}
      />
      <DashboardsideBtn
        title="اسلایدرها"
        content={"slider"}
        setcontentChanger={setcontentChanger}
        color={color}
        setcolor={setcolor}
      />
      <DashboardsideBtn
        title="پست ها"
        content={"posts"}
        setcontentChanger={setcontentChanger}
        color={color}
        setcolor={setcolor}
      />
      <DashboardsideBtn
        title="دسته بندی ها"
        content={"category"}
        setcontentChanger={setcontentChanger}
        color={color}
        setcolor={setcolor}
      />
      <DashboardsideBtn
        title="محصولات"
        content={"products"}
        setcontentChanger={setcontentChanger}
        color={color}
        setcolor={setcolor}
      />
      <DashboardsideBtn
        title="کاربران"
        content={"users"}
        setcontentChanger={setcontentChanger}
        color={color}
        setcolor={setcolor}
      />
    </div>
  );
};

export default DashboardSide;
