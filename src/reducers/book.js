import {
  FETCH_BOOKS_LIST_STARTED,
  FETCH_BOOKS_LIST_FINISHED,
  SET_FILTERED_BOOKS,
  UPDATE_BOOK,
  ADD_BOOK,
  REMOVE_BOOK,
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
    case UPDATE_BOOK:
      return {
        ...state,
        list: action.payload,
      };
    case ADD_BOOK:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case REMOVE_BOOK:
      return {
        ...state,
        list: state.list.filter(l => l.id !== action.payload),
      };
    default: return state;
  }
};
