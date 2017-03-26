import { getCharacters, getCharacterById } from '../../api';
import { formatResponse } from '../../api/utils';

export const CHARACTER_ATTEMPT_FETCH = 'CHARACTER_ATTEMPT_FETCH';
export const CHARACTER_ATTEMPT_FETCH_SUCCESS = 'CHARACTER_ATTEMPT_FETCH_SUCCESS';
export const CHARACTER_ATTEMPT_FETCH_FAIL = 'CHARACTER_ATTEMPT_FETCH_FAIL';

export const CHARACTER_ATTEMPT_FETCH_BY_ID = 'CHARACTER_ATTEMPT_FETCH_BY_ID';
export const CHARACTER_ATTEMPT_FETCH_BY_ID_SUCCESS = 'CHARACTER_ATTEMPT_FETCH_BY_ID_SUCCESS';
export const CHARACTER_ATTEMPT_FETCH_BY_ID_FAIL = 'CHARACTER_ATTEMPT_FETCH_BY_ID_FAIL';

function attemptingFetchCharacters() {
  return {
    type: CHARACTER_ATTEMPT_FETCH,
  };
}

function fetchCharactersSuccess(data) {
  return {
    type: CHARACTER_ATTEMPT_FETCH_SUCCESS,
    payload: data,
  };
}

function fetchCharactersFail(data) {
  return {
    type: CHARACTER_ATTEMPT_FETCH_FAIL,
    payload: data,
  };
}

export function attemptFetchCharacters(payload) {
  return (dispatch) => {
    dispatch(attemptingFetchCharacters(true));

    getCharacters(payload).then((response) => {
      return dispatch(fetchCharactersSuccess(formatResponse(response)));
    }).catch((error) => {
      return dispatch(fetchCharactersFail(error));
    });
  };
}

function attemptingFetchCharacterById() {
  return {
    type: CHARACTER_ATTEMPT_FETCH_BY_ID,
  };
}

function fetchCharacterByIdSuccess(data) {
  return {
    type: CHARACTER_ATTEMPT_FETCH_BY_ID_SUCCESS,
    payload: data,
  };
}

function fetchCharacterByIdFail(data) {
  return {
    type: CHARACTER_ATTEMPT_FETCH_BY_ID_FAIL,
    payload: data,
  };
}

export function attemptFetchCharacterById(payload) {
  return (dispatch) => {
    dispatch(attemptingFetchCharacterById(true));

    getCharacterById(payload).then((response) => {
      return dispatch(fetchCharacterByIdSuccess(formatResponse(response)));
    }).catch((error) => {
      return dispatch(fetchCharacterByIdFail(error));
    });
  };
}

