import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createReportedManga = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/reportedManga.json`, postObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/reportedManga/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

export default createReportedManga;
