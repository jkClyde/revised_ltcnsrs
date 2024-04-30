import { SET_MARKED } from 'store/reducers/actions';

export const setMark = (data) => {
  return {
    type: SET_MARKED,
    payload: data
  };
};
