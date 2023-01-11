import axios from "axios";

const baseUrl = "http://localhost:3002/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const noteObject = { content, important: false };
  const response = await axios.post(baseUrl, noteObject);
  return response.data;
};

const updateObject = async (noteObject) => {
  const updatedObject = {
    ...noteObject,
    important: !noteObject.important,
  };
  const id = noteObject.id;
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const noteService = { getAll, createNew, updateObject };

export default noteService;
