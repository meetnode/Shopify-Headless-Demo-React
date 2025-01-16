import axios from "../axios/custom";
import client from "../config/storefront";
import {
  CUSTOMER_ACCESS_TOKEN,
  CUSTOMER_CREATE,
} from "../constants/customerQuery";

const customerApi = {
  async create(params: any) {
    const response = await client.request(CUSTOMER_CREATE, {
      variables: { input: params },
    });

    if (response.errors && response.errors?.message) {
      throw new Error(response.errors?.message || "Something went wrong2");
    }

    if (response.data?.customerCreate?.customerUserErrors?.length) {
      throw new Error(
        response.data.customerCreate.customerUserErrors[0].message ||
          "Something went wrong"
      );
    }
    return response;
  },
  async login(params: any) {
    const response = await client.request(CUSTOMER_ACCESS_TOKEN, {
      variables: {
        email: params.email,
        password: params.password,
      },
    });
    return response.data;
  },
};

export default customerApi;
