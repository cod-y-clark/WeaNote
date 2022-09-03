import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getManga = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/manga.json`)
    .then((response) => {
      if (response?.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleManga = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/manga/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createManga = (postObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/manga.json`, postObj)
    .then((response) => {
      const payload = { firebase: response.data.name };
      axios.patch(`${dbUrl}/manga/${response.data.name}.json`, payload).then(resolve);
    })
    .catch(reject);
});

const updateManga = (postObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/manga/${postObj.firebaseKey}.json`, postObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteManga = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/manga/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getManga,
  getSingleManga,
  createManga,
  updateManga,
  deleteManga,
};
