import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const removeCurrent = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const numberService = { getAll, createNew, removeCurrent };

export default numberService;
