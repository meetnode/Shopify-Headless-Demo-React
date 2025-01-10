import axios from "../axios/custom";

const aboutUsApi = {
  async all() {
    const response = await axios.get("/aboutus");
    const { data } = JSON.parse(response.data);
    return data;
  },
};

export default aboutUsApi;
