import {
  CHARACTER_ATTEMPT_FETCH,
  CHARACTER_ATTEMPT_FETCH_SUCCESS,
  CHARACTER_ATTEMPT_FETCH_FAIL,
} from '../../actions/characters';

let initialState = {
  data: {},
  fetchedData: {},

  attemptingFetch: false,
  fetchSuccess: false,
  fetchFail: false,
  fetchError: null,
};

export default function characters(state = initialState, action) {
  switch (action.type) {

    case CHARACTER_ATTEMPT_FETCH:
      return {
        ...state,
        attemptingFetch: true,
      };

    case CHARACTER_ATTEMPT_FETCH_SUCCESS:
      return {
        ...state,
        attemptingFetch: false,
        fetchSuccess: true,
        fetchFail: false,
        data: action.payload
      };

    case CHARACTER_ATTEMPT_FETCH_FAIL:
      return {
        ...state,
        attemptingFetch: false,
        fetchSuccess: false,
        fetchFail: true,
        fetchError: action.payload
      };

    default:
      return state;
  }
}
