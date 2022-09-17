import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getLists = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/lists.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/lists/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
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
    .catch((error) => reject(error));
});

const getListManga = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userListMangas.json?orderBy="listId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getLists,
  getSingleList,
  createList,
  updateList,
  deleteList,
  getListManga,
};
