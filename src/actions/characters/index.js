export const CHARACTER_ATTEMPT_FETCH = '';
export const CHARACTER_ATTEMPT_FETCH_SUCCESS = '';
export const CHARACTER_ATTEMPT_FETCH_FAIL = '';

import { getCharacters } from '../../api';

export function attemptFetchCharacters(payload) {
  return (dispatch, getState) => {
    dispatch(attemptingFetchCharacters(true));

    return getCharacters(payload).then(response => {
      return dispatch(fetchCharactersSuccess(response));
    }).catch((error) => {
      return dispatch(fetchCharactersFail(error));
    });
  }
}

export function attemptingFetchCharacters() {
  return {
    type: CHARACTER_ATTEMPT_FETCH
  }
}

export function fetchCharactersSuccess(data) {
  return {
    type: CHARACTER_ATTEMPT_FETCH_SUCCESS,
    payload: data
  }
}

export function fetchCharactersFail(data) {
  return {
    type: CHARACTER_ATTEMPT_FETCH_FAIL,
    payload: data
  }
}