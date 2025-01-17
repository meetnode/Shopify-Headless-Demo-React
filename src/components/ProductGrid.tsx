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
              variantId={product.variants.edges[0].node.id}
              image={product.images.edges[0].node.src}
              title={product.title}
              category={product.category}
              price={product.variants.edges[0].node.price.amount}
              popularity={product.popularity}
              compareAtPrice={product.variants.edges[0].node.compareAtPrice.amount}
              stock={product.variants.edges[0].node.inventory_quantity}
            />
          );
        })}
    </div>
  );
};

export default React.memo(ProductGrid);
