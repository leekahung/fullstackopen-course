import axios from "axios";

const baseUrl = "http://localhost:3001/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, {
    ...newObject,
    likes: 0,
  });
  return response.data;
};

const updateObject = async (objectToUpdate) => {
  const id = objectToUpdate.id;
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...objectToUpdate,
    likes: objectToUpdate.likes + 1,
  });
  return response.data;
};

const removeObject = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const blogService = { getAll, createNew, updateObject, removeObject };

export default blogService;
