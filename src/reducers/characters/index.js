import * as actions from '../../actions/characters';

const initialState = {
  data: {},
  dataById: {},

  attemptingFetch: false,
  fetchSuccess: false,
  fetchFail: false,
  fetchError: null,

  attemptingFetchById: false,
  fetchSuccessById: false,
  fetchFailById: false,
  fetchErrorById: null,
};

export default function characters(state = initialState, action) {
  switch (action.type) {

    case actions.CHARACTER_ATTEMPT_FETCH:
      return {
        ...state,
        attemptingFetch: true,
      };

    case actions.CHARACTER_ATTEMPT_FETCH_SUCCESS:
      return {
        ...state,
        attemptingFetch: false,
        fetchSuccess: true,
        fetchFail: false,
        data: action.payload,
      };

    case actions.CHARACTER_ATTEMPT_FETCH_FAIL:
      return {
        ...state,
        attemptingFetch: false,
        fetchSuccess: false,
        fetchFail: true,
        fetchError: action.payload,
      };

    case actions.CHARACTER_ATTEMPT_FETCH_BY_ID:
      return {
        ...state,
        attemptingFetchById: true,
      };

    case actions.CHARACTER_ATTEMPT_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        attemptingFetchById: false,
        fetchSuccessById: true,
        fetchFailById: false,
        dataById: action.payload,
      };

    case actions.CHARACTER_ATTEMPT_FETCH_BY_ID_FAIL:
      return {
        ...state,
        attemptingFetchById: false,
        fetchSuccessById: false,
        fetchFailById: true,
        fetchErrorById: action.payload,
      };

    default:
      return state;
  }
}
