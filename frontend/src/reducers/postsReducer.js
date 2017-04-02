import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  newPost: { post: null, error: null, loading: false },
  postsList: { postsList: { posts: [], error: null, loading: false} },
  activePost: { post: null, error: null, loading: false },
  updatePost: { post: null, error: null, loading: false}
}

export default function postsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {

    case types.FETCH_POSTS:
      return { ...state, postsList: { posts: [], error: null, loading: true } };
    case types.FETCH_POSTS_SUCCESS:
      return { ...state, postsList: { posts: action.posts, error: null, loading: false } };
    case types.FETCH_POSTS_FAILURE:
      return { ...state, postsList: { posts: null, error: true, loading: false } };

    case types.CREATE_POST:
      return { ...state, newPost: { ...state.newPost, loading: true } };
    case types.CREATE_POST_SUCCESS:
      return { ...state, newPost: { ...state.newPost, post: action.post, error: null, loading: false } };
    case types.CREATE_POST_FAILURE:
      return { ...state, newPost: { ...state.newPost, post: null, error: true, loading: false } };

    case types.FETCH_POSTS:
      return { ...state, activePost: { ...state.activePost, loading: true } };
    case types.FETCH_POST_SUCCESS:
      return { ...state, activePost: { ...state.activePost, post: action.post, error: null, loading: false } };
    case types.FETCH_POST_FAILURE:
      return { ...state, activePost: { ...state.activePost, post: null, loading: true } };
    
    case types.UPDATE_POST:
      return { ...state, updatePost: { ...state.updatePost, loading: true} };
    case types.UPDATE_POST_SUCCESS:
      return { ...state, updatePost: { ...state.updatePost, post: action.post, error: null, loading: false } };
    case types.UPDATE_POST_FAILURE:
      return { ...state, updatePost: { ...state.updatePost, post: null, error: true, loading: false } };

    default:
      return state;
  }
}