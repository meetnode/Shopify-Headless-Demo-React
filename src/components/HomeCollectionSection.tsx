import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

const HomeCollectionSection = () => {
  return (
    <div>
      <div className="max-w-screen-2xl flex items-center justify-between mx-auto mt-16 px-5 max-[400px]:px-3">
        <h2 className="text-black text-3xl font-normal tracking-[1.56px] max-sm:text-4xl">
          Featured products
        </h2>
      </div>
      <ProductGridWrapper limit={8}>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;
