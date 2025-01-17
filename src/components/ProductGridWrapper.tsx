import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";
import productApi from "../api/Products";

// Assuming the Product type looks something like this:
interface Product {
  id: string;
  title: string;
  price: string; // price is a string in your object, we will convert it to number
  category?: string;
  image: { src: string; alt?: string };
}

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  category,
  page,
  limit,
  children,
}: {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[]; // Accepts a single child or an array of children
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { totalProducts } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  const getSearchedProducts = useCallback(
    async (query: string, sort: string, page: number) => {
      if (!query || query.length === 0) {
        query = "";
      }

      // Fetching products from the API
      const allProducts = await productApi.all();
      let searchedProducts = allProducts.filter(
        (product: Product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.title
      );

      // Filter by category if provided
      if (category) {
        searchedProducts = searchedProducts.filter((product: Product) => {
          return product.category === category;
        });
      }

      // Update total products in the Redux store
      if (totalProducts !== searchedProducts.length) {
        dispatch(setTotalProducts(searchedProducts.length));
      }

      // Sort the products based on the sort criteria
      if (sort === "price-asc") {
        searchedProducts = searchedProducts.sort(
          (a: Product, b: Product) => parseFloat(a.price) - parseFloat(b.price)
        );
      } else if (sort === "price-desc") {
        searchedProducts = searchedProducts.sort(
          (a: Product, b: Product) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
      // else if (sort === "popularity") {
      //   searchedProducts = searchedProducts.sort(
      //     (a: Product, b: Product) => b.popularity - a.popularity // Make sure the 'popularity' field exists in your product
      //   );
      // }

      // Limit the number of products displayed based on page/limit
      if (limit) {
        console.log(searchedProducts, "searchedProducts");
        setProducts(searchedProducts.slice(0, limit));
        dispatch(setShowingProducts(searchedProducts.slice(0, limit).length));
      } else if (page) {
        setProducts(searchedProducts.slice(0, page * 9)); // Adjust according to pagination
        dispatch(
          setShowingProducts(searchedProducts.slice(0, page * 9).length)
        );
      } else {
        setProducts(searchedProducts);
        dispatch(setShowingProducts(searchedProducts.length));
      }
    },
    [category, totalProducts, dispatch]
  );

  useEffect(() => {
    getSearchedProducts(searchQuery || "", sortCriteria || "", page || 1);
  }, [searchQuery, sortCriteria, page, getSearchedProducts]);

  // Clone children and pass products as props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && products.length > 0) {
      return React.cloneElement(child, { products });
    }
    return null;
  });

  return childrenWithProps;
};

export default ProductGridWrapper;
