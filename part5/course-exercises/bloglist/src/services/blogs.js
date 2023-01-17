import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const updateObject = async (blogObject) => {
  const id = blogObject.id;
  const response = await axios.put(`${baseUrl}/${id}`, blogObject);
  return response.data;
};

const removeObject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = { getAll, createNew, updateObject, removeObject, setToken };

export default blogService;
