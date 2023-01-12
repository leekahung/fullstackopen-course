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

const numberService = { getAll, createNew };

export default numberService;
