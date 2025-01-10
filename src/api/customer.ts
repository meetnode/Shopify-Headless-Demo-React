import axios from "../axios/custom";

const customerApi = {
  async create(params: any) {
    const response = await axios.post("/customer", params);
    return response;
  },
  async login(params: any) {
    const response = await axios.post(
      "/customer-login",
      {
        email: params.email,
        password: params.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },
};

export default customerApi;
