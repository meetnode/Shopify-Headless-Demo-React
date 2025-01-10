import { useEffect, useState, Fragment } from "react";
import CategoryItem from "./CategoryItem";
import collectionApi from "../api/collections";

const CategoriesSection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    collectionApi.all().then((res) => setCollections(res));
  }, []);

  const ItemsCollections = () => {
    return (
      collections.length &&
      collections.map((item: any, index) => {
        return (
          <Fragment key={index}>
            <CategoryItem
              categoryTitle={item.title}
              image={item.image.url}
              link="special-edition"
            />
          </Fragment>
        );
      })
    );
  };

  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-24">
      <h2 className="text-black text-3xl font-normal tracking-[1.56px] max-sm:text-4xl mb-12">
        Our Collections
      </h2>
      <div className="flex justify-between flex-wrap gap-y-10">
        <ItemsCollections />
      </div>
    </div>
  );
};
export default CategoriesSection;
