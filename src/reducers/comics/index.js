import * as actions from '../../actions/comics';

let initialState = {
  data: {},

  attemptingFetch: false,
  fetchSuccess: false,
  fetchFail: false,
  fetchError: null,
};

export default function comics(state = initialState, action) {
  switch (action.type) {

    case actions.COMIC_ATTEMPT_FETCH_BY_ID:
    case actions.COMIC_ATTEMPT_FETCH:
      return {
        ...state,
        attemptingFetch: true,
      };

    case actions.COMIC_ATTEMPT_FETCH_BY_ID_SUCCESS:
    case actions.COMIC_ATTEMPT_FETCH_SUCCESS:
      return {
        ...state,
        attemptingFetch: false,
        fetchSuccess: true,
        fetchFail: false,
        data: action.payload
      };

    case actions.COMIC_ATTEMPT_FETCH_BY_ID_FAIL:
    case actions.COMIC_ATTEMPT_FETCH_FAIL:
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
