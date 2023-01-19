import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newObject = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const updateObject = async (objectToUpdate) => {
  const id = objectToUpdate.id;
  const updatedObject = {
    ...objectToUpdate,
    votes: objectToUpdate.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const anecdoteService = { getAll, createNew, updateObject };

export default anecdoteService;
