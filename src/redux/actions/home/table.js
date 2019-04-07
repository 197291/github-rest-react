import * as API from 'api';
import * as consts from 'redux/constants';
import { parser } from 'helpers';


export const getRepositories = (request) => (dispatch) => {
  API.getRepositories(request)
    .then(res => {
      dispatch({ 
        type: consts.GET_REPOSITORIES_SUCCESS,
        data: { ...res.data, ...parser(res.headers.link)} 
      });
    })
}