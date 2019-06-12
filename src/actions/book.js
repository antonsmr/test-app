import axios from 'axios';

import {
  FETCH_BOOKS_LIST_STARTED,
  FETCH_BOOKS_LIST_FINISHED,
  SET_FILTERED_BOOKS,
  UPDATE_BOOK,
  ADD_BOOK,
  REMOVE_BOOK,
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

export const updateBook = books => (dispatch) => {
  dispatch({
    type: UPDATE_BOOK,
    payload: books,
  });
};

export const addBook = book => (dispatch) => {
  dispatch({
    type: ADD_BOOK,
    payload: book,
  });
};

export const removeBook = bookId => (dispatch) => {
  dispatch({
    type: REMOVE_BOOK,
    payload: bookId,
  });
};

export default {
  fetchBooks,
  setFilteredBooks,
};
