import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newObject, config);
  return request.data;
};

const destruct = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, destruct, setToken };
