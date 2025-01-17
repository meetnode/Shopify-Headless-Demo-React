import axios from "../axios/custom";
import client from "../config/storefront";
import { GET_PAGE_BY_HANDLE } from "../constants/pageQuery";

const aboutUsApi = {
  async all() {
    const response = await client.request(GET_PAGE_BY_HANDLE, {
      variables: { handle: "about-us" },
    });

    return response.data.pageByHandle.body;
  },
};

export default aboutUsApi;
