import * as types from '../actions/actionTypes';
import merge from 'lodash/merge';

const INITIAL_STATE = {
  userAuthInfo: {
    isFetching: false,
    isAuthenticated: localStorage.getItem('auth-token') ? true : false
  }
};

export default function usersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return authHelper(state, action);
    case types.LOGIN_SUCCESS:
      return authHelper(state, action);
    case types.LOGIN_FAILURE:
      return authHelper(state, action);
  }

  return state;
}

function authHelper(state, action) {
  return {
    ...state,
    userAuthInfo: {
      ...state.userAuthInfo,
      isFetching: action.authInfo.isFetching,
      isAuthenticated: action.authInfo.isAuthenticated
    }
  }
};