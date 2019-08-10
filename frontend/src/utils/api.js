import config from 'configuration/config';
import axios from 'axios';

export function getHomecards() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.BACKEND}${config.ENDPOINTS.HOMECARDS}`)
      .then((response) => {
        resolve(response.data.homecards);
      })
      .catch(reject);
  });
}
