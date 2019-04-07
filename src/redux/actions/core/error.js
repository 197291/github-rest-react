import * as consts from 'redux/constants';

export function showError(error) {
  return {
    type: consts.DISPLAY_ERROR,
    error
  };
}

export function hideError() {
  return {
    type: consts.HIDE_ERROR
  };
}