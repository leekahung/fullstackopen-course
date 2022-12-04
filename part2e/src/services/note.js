import axios from "axios";

const baseUrl = "http://localhost:3001/notes"

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  // hardcoded data not included in db.json
  const nonExisting = {
    "id": 10000,
    "content": "This note is not saved to server",
    "date": "2019-05-30T17:30:31.098Z",
    important: true,
  }

  return response.data.concat(nonExisting);
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
}

const noteServices = { getAll, create, update };

export default noteServices;