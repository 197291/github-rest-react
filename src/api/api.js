import axios from 'axios';
import queryString from 'query-string';
import { isNil, omitBy, flow } from 'lodash';

import { BASE_URL } from 'redux/constants';
import { showError } from 'redux/actions';

const processConfig = (config) => {

  const _config = {
    ...config,
    // withCredentials: true,
    paramsSerializer: flow((params) => omitBy(params, isNil), queryString.stringify),
  };

  return _config;
};

class Api {

  static store = null;

  constructor() {
    if (Api._instance) {
      throw new Error('Instantiation failed: use Api.getInstance() instead of new.');
    }
  }

  get(url, config) {
    return new Promise((resolve, reject) => {
      axios.get(this.getUrl(url), processConfig(config))
        .then((data) => resolve(data))
        .catch((error) => {
          this.store.dispatch(showError(error));
          return reject(error);
        });
    });
  }

  put(url, payload = {}, config) {
    return  new Promise((resolve, reject) => {
      axios.put(this.getUrl(url), payload, processConfig(config))
        .then(({data}) => resolve(data))
        .catch((error) => {
          this.store.dispatch(showError(error));
          return reject(error);
        });
    });
  }

  post(url, payload, config) {
    return  new Promise((resolve, reject) => {
      axios.post(this.getUrl(url), payload, processConfig(config))
        .then(({data}) => resolve(data))
        .catch((error) => {
          this.store.dispatch(showError(error));
          return reject(error);
        });
    });
  }

  delete(url, config) {
    return new Promise((resolve, reject) => {
      axios.delete(this.getUrl(url), processConfig(config))
        .then(({data}) => resolve(data))
        .catch((error) => {
          this.store.dispatch(showError(error));
          return reject(error);
        });
    });
  }

  get CancelToken() {
    return axios.CancelToken;
  }

  getUrl(url) {
    return (!(url.includes('.json') || url.includes('' + BASE_URL)) ? BASE_URL : '') + url;
  }
}

const api = new Api();

export default api;