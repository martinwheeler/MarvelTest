import {
  TUTOR_ATTEMPTING_EDITPROFILE,
  TUTOR_EDITPROFILE_SUCCESS,
  TUTOR_EDITPROFILE_FAIL,
} from "../actions/characters";

let initialState = {
  data: {},
  fetchedData: {},
  passwordResponse: {},

  attemptingEdit: false,
  editSuccess: false,
  editFail: false,
  editError: null,
};

export default function tutorProfile(state = initialState, action) {
  switch (action.type) {

    case TUTOR_ATTEMPTING_EDITPROFILE:
      return {
        ...state,
        attemptingEdit: true,
      };

    case TUTOR_EDITPROFILE_SUCCESS:
      return {
        ...state,
        attemptingEdit: false,
        editSuccess: true,
        editFail: false,
        data: action.payload
      };

    case TUTOR_EDITPROFILE_FAIL:
      return {
        ...state,
        attemptingEdit: false,
        editSuccess: false,
        editFail: true,
        editError: action.payload
      };

    default:
      return state;
  }
}
