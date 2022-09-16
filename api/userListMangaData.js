import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserListManga = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userListMangas.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getSingleUserListManga = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userListMangas/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createUserListManga = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/userListMangas.json`, postObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/userListMangas/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateUserListManga = (postObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/userListMangas/${postObj.firebaseKey}.json`, postObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteUserListManga = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/userListMangas/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getUserListManga,
  getSingleUserListManga,
  createUserListManga,
  updateUserListManga,
  deleteUserListManga,
};
