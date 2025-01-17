import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
  StandardSelectInput,
} from "../components";
import { useParams } from "react-router-dom";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import toast from "react-hot-toast";
import productApi from "../api/Products";

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    backgroundImage: "",
    backgroundPosition: "0% 0%",
  });
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (singleProduct && selectedVariant) {
      const data = singleProduct.images.edges.find(
        ({ node: item }) => item.id == selectedVariant.image.id
      );
      if (data) setSelectedImage(data.node.src);
    }
  }, [selectedVariant]);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await productApi.single(params.id);
        const product = response;

        setSingleProduct(product);
        if (product.images && product.images.edges.length > 0) {
          setSelectedImage(product.images.edges[0].node.src);
        }
        if (product.variants && product.variants.edges.length > 0) {
          setSelectedVariant(product.variants.edges[0].node);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await productApi.all();
        setProducts(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: `url(${
        selectedImage || singleProduct?.images?.edges[0].node?.src
      })`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle((prev) => ({ ...prev, display: "none" }));
  };

  const handleAddToCart = () => {
    if (singleProduct && selectedVariant) {
      dispatch(
        addProductToTheCart({
          id: selectedVariant.id,
          image: selectedImage || singleProduct.images.edges[0].node.src,
          title: singleProduct.title,
          category: singleProduct.productType,
          price: selectedVariant.price,
          quantity,
          stock:
            selectedVariant.quantityAvailable < 0
              ? 0
              : selectedVariant.quantityAvailable,
        })
      );
      toast.success("Product added to the cart");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        {/* Main Product Image Section */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4 relative">
            <div
              className="w-full aspect-square h-[600px] overflow-hidden relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={selectedImage || singleProduct?.images?.edges[0].node?.src}
                className="object-cover w-full h-full"
                alt={singleProduct?.title}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  ...zoomStyle,
                  backgroundSize: "200%", // Adjust for zoom level
                }}
              ></div>
            </div>

            <div className="flex gap-2 overflow-x-auto h-32">
              {singleProduct?.images.edges?.map((image: any, index: number) => (
                <div
                  key={index}
                  className={`w-24 h-24 cursor-pointer border-2 ${
                    selectedImage === image.node.src
                      ? "border-secondaryBrown"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image.node.src)}
                >
                  <img
                    src={image.node.src}
                    className="object-cover w-full h-full"
                    alt={`${singleProduct?.title} - ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full flex flex-col gap-5 pt-9 sticky top-0 h-fit">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-thin">{singleProduct?.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">
                {singleProduct?.productType || ""}
              </p>
              <p className="text-base font-bold">
                {selectedVariant?.compareAtPrice && (
                  <span className="line-through text-sm me-2 font-thin">
                    ₹{selectedVariant?.compareAtPrice?.amount}
                  </span>
                )}
                ₹{selectedVariant?.price?.amount || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <SelectInputUpgrade
              selectList={singleProduct?.variants.edges.map(
                ({ node: variant }: any) => ({
                  id: variant.id,
                  value: variant.title,
                })
              )}
              value={selectedVariant?.id || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const variantId = e.target.value;
                const variant = singleProduct?.variants.edges.find(
                  ({ node: v }: any) => v.id == variantId
                );
                setSelectedVariant(variant.node);
              }}
            />
            <QuantityInputUpgrade
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(() => parseInt(e.target.value))
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
            {singleProduct?.metafield?.value && (
              <p className="text-secondaryBrown text-sm text-right">
                Delivery estimated on{" "}
                {formatDate(singleProduct?.metafield?.value)}
              </p>
            )}
          </div>
          <div>
            <Dropdown open={true} dropdownTitle="Description">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    singleProduct?.description || "No description available",
                }}
              />
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div>
        <h2 className="text-black/90 text-3xl mt-12 mb-8 max-lg:text-4xl">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-between items-center gap-8 mt-12 max-xl:justify-start max-xl:gap-5">
          {products.slice(0, 3).map((product: Product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              image={product.images?.edges[0].node?.src || ""}
              title={product.title}
              category={product.product_type}
              price={product.variants?.edges[0].node?.price.amount || "N/A"}
              compareAtPrice={
                product.variants?.edges[0].node?.compareAtPrice.amount
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
