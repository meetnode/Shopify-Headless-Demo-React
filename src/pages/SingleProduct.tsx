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
      const data = singleProduct.images.find((item) =>
        item.variant_ids.includes(selectedVariant.id)
      );
      if (data) setSelectedImage(data);
    }
  }, [selectedVariant]);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await productApi.single(params.id);
        const product = response.data;

        setSingleProduct(product);
        if (product.images && product.images.length > 0) {
          setSelectedImage(product.images[0].src);
        }
        if (product.variants && product.variants.length > 0) {
          setSelectedVariant(product.variants[0]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await productApi.all();
        setProducts(response.data);
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
        selectedImage.src || singleProduct?.images?.[0]?.src
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
          image: singleProduct.image.src,
          title: singleProduct.title,
          category: singleProduct.product_type,
          price: selectedVariant.price,
          quantity,
          stock:
            selectedVariant.inventory_quantity < 0
              ? 0
              : selectedVariant.inventory_quantity,
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
                src={selectedImage.src || singleProduct?.images?.[0]?.src}
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
              {singleProduct?.images?.map((image: any, index: number) => (
                <div
                  key={index}
                  className={`w-24 h-24 cursor-pointer border-2 ${
                    selectedImage.src === image.src
                      ? "border-secondaryBrown"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
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
                {singleProduct?.product_type || ""}
              </p>
              <p className="text-base font-bold">
                {selectedVariant?.compare_at_price && (
                  <span className="line-through text-sm me-2 font-thin">
                    ₹{selectedVariant?.compare_at_price}
                  </span>
                )}
                ₹{selectedVariant?.price || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <SelectInputUpgrade
              selectList={singleProduct?.variants.map((variant: any) => ({
                id: variant.id,
                value: variant.title,
              }))}
              value={selectedVariant?.id || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const variantId = e.target.value;
                const variant = singleProduct?.variants.find(
                  (v: any) => v.id == variantId
                );
                setSelectedVariant(variant);
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
                    singleProduct?.body_html || "No description available",
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
              image={product.images?.[0]?.src || ""}
              title={product.title}
              category={product.product_type}
              price={product.variants?.[0]?.price || "N/A"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
