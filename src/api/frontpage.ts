import axios from "../axios/custom";

const frontpageApi = {
  async banner() {
    const response = await axios.get("/home");
    return JSON.parse(response.data);
  },
};

export default frontpageApi;
