import { combineReducers } from 'redux';

const INITIAL_STATE = {
  books: [],
};

const BookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'Fetch_Book':
      return {
        ...state,
        books: action.payload
      };
  default:
    return state
  }
};

export default combineReducers({
  bookReducer: BookReducer,
});