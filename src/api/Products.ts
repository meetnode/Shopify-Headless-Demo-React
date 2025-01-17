import client from "../config/storefront";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "../constants/productQuery";

const productApi = {
  async all() {
    const { data } = await client.request(GET_ALL_PRODUCTS, {
      variables: { first: 10 },
    });

    return data.products.edges.map((item: any) => item.node);
  },
  async single(id: string | undefined) {
    const { data } = await client.request(GET_PRODUCT_BY_ID, {
      variables: { productId: `gid://shopify/Product/${id}` },
    });
    return data.product;
  },
};

export default productApi;
