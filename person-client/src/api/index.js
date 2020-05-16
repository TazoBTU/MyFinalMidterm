import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    'Content-type': 'application/json',
  },
});

const getAll = (filter) => {

  const queryString = Object.keys(filter).reduce(
    (acc, key) => (acc += `${key}=${filter[key]}&`),
    '?'
  );
  return api.get(`/persons${queryString}`);
};

const create = (data) => {
  return api.post('/persons/store', data);
};

const update = (id, data) => {
  return api.put(`/persons/${id}/update`, data);
};

const remove = (id) => {
  return api.delete(`/persons/${id}/delete`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
