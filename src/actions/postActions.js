import * as types from './actionTypes';
import axios from 'axios';
import { ROOT_URL } from '../config/config';

/*
 * ===================================== 
 * Get List of posts
 * ===================================== 
 */
export function fetchPosts() {

  return (dispatch) => {
    dispatch(() => {type: types.FETCH_POSTS});
    let request = axios.get(`${ROOT_URL}/posts`);
    request.then((res) => {
      dispatch(fetchPostsSuccess(res.data.posts));
    }).catch((err) => {
      console.log(err);
    });
  }
  
}

function fetchPostsSuccess(posts) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    posts
  }
}


/*
 * ===================================== 
 * Create a post
 * ===================================== 
 */
export function createPost(post) {
  const data = new FormData();

  Object.keys(post).forEach((key) => {
    if (key !== 'uploads' && key !== 'hero_img') {
      data.append(key, post[key]);
    }
  });
  if (post.uploads) {
    post.uploads.forEach((file) => {
      data.append("uploads", file);
    });
  }
  if (post.hero_img) {
    data.append("hero_img", post.hero_img[0]);
  }
  
  return (dispatch) => {
    dispatch(() => {type: types.CREATE_POST});
    const tokenFromStorage = localStorage.getItem('auth-token');
    const request = axios({
      method: 'post',
      data: data,
      url: `${ROOT_URL}/posts`,
      headers: {
        'Content-Type': `form-data`,
        'x-auth': `${tokenFromStorage}`
      }
    });

    request.then((post) => {
      dispatch(createPostSuccess(post));
    }).catch(() => {
      dispatch(createPostFailure());
    })
  };
}

function createPostSuccess({data}) {
  return {
    type: types.CREATE_POST_SUCCESS,
    post: data
  }
}

function createPostFailure() {
  return {
    type: types.CREATE_POST_FAILURE
  }
}

/*
 * ===================================== 
 * Get a post by post_id
 * ===================================== 
 */
export function fetchPost(id) {
  return (dispatch) => {
    dispatch(() => {type: types.FETCH_POST});
    let request = axios.get(`${ROOT_URL}/posts/${id}`);
    request.then((res) => {
      dispatch(fetchPostSuccess(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }
}

function fetchPostSuccess({ post }) {
  return {
    type: types.FETCH_POST_SUCCESS,
    post
  }
}

function fetchPostFailure() {
  return {
    type: types.FETCH_POST_FAILURE
  }
}

/*
 * ===================================== 
 * Edit a post
 * ===================================== 
 */
export function editPost(post) {
  const data = new FormData();

  Object.keys(post).forEach((key) => {
    if (key !== 'uploads' && key !== 'hero_img') {
      data.append(key, post[key]);
    }
  });
  if (post.uploads) {
    post.uploads.forEach((file) => {
      data.append("uploads", file);
    });
  }
  if (post.hero_img) {
    data.append("hero_img", post.hero_img[0]);
  }
  
  return (dispatch) => {
    dispatch(() => {type: types.UPDATE_POST});
    const tokenFromStorage = localStorage.getItem('auth-token');
    const request = axios({
      method: 'PATCH',
      data: data,
      url: `${ROOT_URL}/posts/${post.post_id}`,
      headers: {
        'Content-Type': `form-data`,
        'x-auth': `${tokenFromStorage}`
      }
    });

    request.then((post) => {
      dispatch(editPostSuccess(post));
    }).catch(() => {
      dispatch(editPostFailure());
    })
  };
}

function editPostSuccess(post) {
  return {
    type: types.UPDATE_POST,
    post
  }
}

function editPostFailure() {
  return {
    type: types.UPDATE_POST_FAILURE
  }
}

/*
 * ===================================== 
 * DELETE A POST
 * ===================================== 
 */

export function deletePost(post_id) {
  
  return (dispatch) => {
    dispatch(() => {type: types.CREATE_POST});
    const tokenFromStorage = localStorage.getItem('auth-token');
    const request = axios({
      method: 'DELETE',
      url: `${ROOT_URL}/posts/${post_id}`,
      headers: {
        'x-auth': `${tokenFromStorage}`
      }
    });

    request.then(() => {
      dispatch(deletePostSuccess());
    }).catch((e) => {
      console.log(e);
      dispatch(deletePostFailure());
    })
  };
}

function deletePostSuccess() {
  return {
    type: types.DELETE_POST_SUCCESS
  }
}

function deletePostFailure() {
  return {
    type: types.DELETE_POST_FAILURE
  }
}