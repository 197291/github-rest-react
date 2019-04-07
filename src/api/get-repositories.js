import api from './api';
import { cancelRequest } from 'helpers';

let cancellationToken = null;

export const getRepositories = ({ query = 'language:javascript', sort = 'stars', order='desc', perPage = 100, page = 1 }) => {
  cancelRequest(cancellationToken);

  const options = {
    params: {
      q: query,
      sort,
      order,
      per_page: perPage,
      page
    }
  };

  options.cancelToken = new api.CancelToken((token) => {
    cancellationToken = token;
  });

  return api.get('/search/repositories', options)
    .then((response) => response);
};
