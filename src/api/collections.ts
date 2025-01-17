import client from "../config/storefront";
import { GET_ALL_COLLECTIONS } from "../constants/collectionQuery";

const collectionApi = {
  async all() {
    const { data } = await client.request(GET_ALL_COLLECTIONS);
    const response = data?.collections.edges.map((item: any) => item.node);
    return response;
  },
};

export default collectionApi;
