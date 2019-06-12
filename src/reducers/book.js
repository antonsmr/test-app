import {
  FETCH_BOOKS_LIST_STARTED,
  FETCH_BOOKS_LIST_FINISHED,
  SET_FILTERED_BOOKS,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  list: [],
  filteredBooks: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_BOOKS_LIST_STARTED:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_BOOKS_LIST_FINISHED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.payload,
      };
    case SET_FILTERED_BOOKS:
      return {
        ...state,
        filteredBooks: state.list.filter(
          book => book.title.toLowerCase().includes(action.payload.toLowerCase()),
        ),
      };
    default: return state;
  }
};
