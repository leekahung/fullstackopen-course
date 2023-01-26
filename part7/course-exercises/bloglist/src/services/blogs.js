import axios from "axios";

const baseUrl = "http://localhost:8888/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (id, newComment) => {
  const response = await axios.put(`${baseUrl}/${id}`, newComment);
  return response.data;
};

const updateObject = async (objectToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };

  const id = objectToUpdate.id;
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { likes: objectToUpdate.likes + 1 },
    config
  );
  return response.data;
};

const removeObject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = {
  getAll,
  createNew,
  createComment,
  updateObject,
  removeObject,
  setToken,
};

export default blogService;
