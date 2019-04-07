import * as consts from 'redux/constants';

export function startLoading(error) {
  return {
    type: consts.START,
    error
  };
}

export function failLoading() {
  return {
    type: consts.FAIL
  };
}

export function successLoading() {
  return {
    type: consts.SUCCESS
  };
}