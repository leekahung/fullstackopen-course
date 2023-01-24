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

const updateObject = async (id, objectToUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...objectToUpdate,
    likes: objectToUpdate.likes + 1,
  });
  return response.data;
};

const blogService = { getAll, createNew, updateObject };

export default blogService;
