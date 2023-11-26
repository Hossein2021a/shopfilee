import Link from "next/link";

const Breadcrump = ({firststage , lastone}) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex gap-1 items-center ">
        <Link href='/'>خانه</Link>
        <span>/</span>
      </div>
      <div className="flex gap-1 items-center ">
        <div>{firststage}</div>
        <span>/</span>
      </div>
      <div className="flex gap-1 items-center ">
        <div>{lastone}</div>
      </div>
    </div>
  );
};

export default Breadcrump;
