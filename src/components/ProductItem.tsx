import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
}: {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
}) => {
  return (
    <div className="w-[350px] flex flex-col gap-2 justify-center max-md:w-[300px] border border-black rounded-sm p-5">
      <Link
        to={`/product/${id}`}
        className="w-full h-[400px] max-md:h-[200px] overflow-hidden"
      >
        <img src={`${image}`} alt={title} className="object-cover h-full w-full" />
      </Link>
      <Link
        to={`/product/${id}`}
        className="text-black text-center text-xl tracking-[1.02px] max-md:text-xl"
      >
        <h4>{title}</h4>
      </Link>
      <p className="text-black text-xl text-center font-bold max-md:text-xl">
      ₹{price}
      </p>
      <div className="w-full flex gap-1">
        <Link
          to={`/product/${id}`}
          className="text-white bg-secondaryBrown text-center text-lg font-normal tracking-[0.6px] leading-[72px] w-full h-10 flex items-center justify-center max-md:text-base"
        >
          View product
        </Link>
        <Link
          to={`/product/${id}`}
          className="bg-white text-black text-center text-lg border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] leading-[72px] w-full h-10 flex items-center justify-center max-md:text-base"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};
export default ProductItem;
