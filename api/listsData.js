import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getLists = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/lists.json`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/lists/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createList = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/lists.json`, postObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/lists/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateList = (postObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/lists/${postObj.firebaseKey}.json`, postObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/lists/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getLists,
  getSingleList,
  createList,
  updateList,
  deleteList,
};
