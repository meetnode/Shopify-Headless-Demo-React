import axios from "../axios/custom";

const headerApi = {
  async siteData() {
    const response = await axios.get("/");
    return JSON.parse(response.data);
  },
  async market() {
    const response = await axios.get("/market");
    return JSON.parse(response.data);
  },
};

export default headerApi;
