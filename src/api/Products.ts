import axios from "../axios/custom";

const productApi = {
  async all() {
    const response = await axios.get("/products");
    return JSON.parse(response.data);
  },
  async single(id: string|undefined) {
    const response = await axios.get(`/products/${id}`);
    return JSON.parse(response.data);
  },
};

export default productApi;
