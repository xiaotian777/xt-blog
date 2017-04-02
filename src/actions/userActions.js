import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import { ROOT_URL } from '../config/config';


function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    authInfo: {      
      isFetching: true,
      isAuthenticated: false
    }
  }
}

function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    authInfo: {
      isFetching: false,
      isAuthenticated: true
    }
  }
}

function loginError() {
  return {
    type: LOGIN_FAILURE,
    authInfo: {
      isFetching: false,
      isAuthenticated: false
    }
  }
}

export function loginUser(cred) {
  return (dispatch) => {
    const request = axios.post(`${ROOT_URL}/users/login`, cred);
    dispatch(requestLogin());
    request
      .then((res) => {
        const token = res.headers['x-auth'];
        localStorage.setItem('auth-token', token);
        dispatch(receiveLogin());
      })
      .catch((err) => {
        dispatch(loginError());
      });
  }
}