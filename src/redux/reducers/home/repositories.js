import * as consts from 'redux/constants';

const initialState = {
  repositories: {
    items: [],
  },
};

const repositories = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case consts.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: {
          items: state.repositories.items.concat(data.items),
          nextPage: data.next,
          lastPage: data.last,
        }
      };
    default:
      return state;
  }
};

export default repositories;
