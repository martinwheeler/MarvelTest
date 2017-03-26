import { getComics, getComicById } from '../../api';
import { formatResponse } from '../../api/utils';

export const COMIC_ATTEMPT_FETCH = 'COMIC_ATTEMPT_FETCH';
export const COMIC_ATTEMPT_FETCH_SUCCESS = 'COMIC_ATTEMPT_FETCH_SUCCESS';
export const COMIC_ATTEMPT_FETCH_FAIL = 'COMIC_ATTEMPT_FETCH_FAIL';

export const COMIC_ATTEMPT_FETCH_BY_ID = 'COMIC_ATTEMPT_FETCH_BY_ID';
export const COMIC_ATTEMPT_FETCH_BY_ID_SUCCESS = 'COMIC_ATTEMPT_FETCH_BY_ID_SUCCESS';
export const COMIC_ATTEMPT_FETCH_BY_ID_FAIL = 'COMIC_ATTEMPT_FETCH_BY_ID_FAIL';

function attemptingFetchComics() {
  return {
    type: COMIC_ATTEMPT_FETCH,
  };
}

function fetchComicsSuccess(data) {
  return {
    type: COMIC_ATTEMPT_FETCH_SUCCESS,
    payload: data,
  };
}

function fetchComicsFail(data) {
  return {
    type: COMIC_ATTEMPT_FETCH_FAIL,
    payload: data,
  };
}

export function attemptFetchComics(payload) {
  return (dispatch) => {
    dispatch(attemptingFetchComics(true));

    getComics(payload).then((response) => {
      return dispatch(fetchComicsSuccess(formatResponse(response)));
    }).catch((error) => {
      return dispatch(fetchComicsFail(error));
    });
  };
}

function attemptingFetchComicById() {
  return {
    type: COMIC_ATTEMPT_FETCH_BY_ID,
  };
}

function fetchComicByIdSuccess(data) {
  return {
    type: COMIC_ATTEMPT_FETCH_BY_ID_SUCCESS,
    payload: data,
  };
}

function fetchComicByIdFail(data) {
  return {
    type: COMIC_ATTEMPT_FETCH_BY_ID_FAIL,
    payload: data,
  };
}

export function attemptFetchComicById(payload) {
  return (dispatch) => {
    dispatch(attemptingFetchComicById(true));

    getComicById(payload).then((response) => {
      return dispatch(fetchComicByIdSuccess(formatResponse(response)));
    }).catch((error) => {
      return dispatch(fetchComicByIdFail(error));
    });
  };
}

