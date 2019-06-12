import axios from 'axios';

import {
  FETCH_BOOKS_LIST_STARTED,
  FETCH_BOOKS_LIST_FINISHED,
  SET_FILTERED_BOOKS,
} from './types';

export const fetchBooksListStart = () => (dispatch) => {
  dispatch({
    type: FETCH_BOOKS_LIST_STARTED,
  });
};

export const fetchBooksListFinished = payload => (dispatch) => {
  dispatch({
    type: FETCH_BOOKS_LIST_FINISHED,
    payload,
  });
};

export const fetchBooks = () => (dispatch) => {
  dispatch(fetchBooksListStart());

  axios.get('books.json').then((result) => {
    const books = result.data;

    dispatch(fetchBooksListFinished(books));
  });
};

export const setFilteredBooks = query => (dispatch) => {
  dispatch({
    type: SET_FILTERED_BOOKS,
    payload: query,
  });
};

export default {
  fetchBooks,
  setFilteredBooks,
};
