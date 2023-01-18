import axios from "axios";

const baseUrl = "http://localhost:3002/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObject);
  return response.data;
};

const updateObject = async (objectToUpdate) => {
  const updatedObject = {
    ...objectToUpdate,
    votes: objectToUpdate.votes + 1,
  };
  const id = objectToUpdate.id;
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const anecdoteService = { getAll, createNew, updateObject };

export default anecdoteService;
