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

const updateObject = async (anecdoteObject) => {
  const id = anecdoteObject.id;
  const updatedAnecdote = {
    ...anecdoteObject,
    votes: anecdoteObject.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};

const anecdoteService = { getAll, createNew, updateObject };

export default anecdoteService;
