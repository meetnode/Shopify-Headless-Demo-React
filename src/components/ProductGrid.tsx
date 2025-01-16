import React from "react";
import ProductItem from "./ProductItem";
import { nanoid } from "nanoid";

const ProductGrid = ({ products }: { products?: Product[] }) => {
  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl flex flex-wrap items-center gap-y-8 gap-x-8 mx-auto mt-8 max-xl:justify-start px-5 max-[400px]:px-3"
    >
      {products &&
        products.map((product: Product) => {
          return (
            <ProductItem
              key={nanoid()}
              id={product.id}
              variantId={product.variants[0].id}
              image={product.images[0].src}
              title={product.title}
              category={product.category}
              price={product.variants[0].price}
              popularity={product.popularity}
              compareAtPrice={product.variants[0].compare_at_price}
              stock={product.variants[0].inventory_quantity}
            />
          );
        })}
    </div>
  );
};

export default React.memo(ProductGrid);
