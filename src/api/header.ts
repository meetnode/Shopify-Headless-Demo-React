import axios from "../axios/custom";
import client from "../config/storefront";
import { SHOP_DETAILS } from "../constants/headerQuery";

const headerApi = {
  async siteData() {
    const response = await client.request(SHOP_DETAILS)
    return response.data.shop
  },
};

export default headerApi;
