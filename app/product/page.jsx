import Shop from "./shop";


const Product = ({ searchParams  }) => {

  return (
    <div>
      {<Shop url={searchParams}  />}
    </div>
  );
};

export default Product;
