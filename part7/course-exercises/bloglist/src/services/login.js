import axios from "axios";

const baseUrl = "http://localhost:8888/api/login";

const loginUser = async (loginCredentials) => {
  const response = await axios.post(baseUrl, loginCredentials);
  return response.data;
};

const loginService = { loginUser };

export default loginService;
