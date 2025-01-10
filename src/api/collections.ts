import axios from "../axios/custom";

const collectionApi = {
  async all() {
    const response = await axios.get("/collections");
    const { data } = JSON.parse(response.data);
    const res = data.collections.edges.map((item: any) => item.node);
    return res;
  },
};

export default collectionApi;
