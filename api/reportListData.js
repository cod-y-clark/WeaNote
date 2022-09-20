import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getReportLists = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/reportLists.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleReportList = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/reportLists/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createReportList = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/reportLists.json`, postObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/reportLists/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateReportList = (postObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/reportLists/${postObj.firebaseKey}.json`, postObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getReportLists, getSingleReportList, createReportList, updateReportList,
};
