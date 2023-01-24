import axios from "axios";

const baseUrl = "http://localhost:8888/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const checkToken = async (id, localToken) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    params: { loginToken: localToken },
  });
  return response.status;
};

const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const updateObject = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const userService = { getAll, getUser, createNew, checkToken, updateObject };

export default userService;
