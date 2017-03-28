import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';

import ArchivePage from './components/archive/ArchivePage';
import usersLoginPage from './components/users/userLoginPage';

import PostsListPage from './components/posts/PostsListPage';
import NewPostPage from './components/posts/NewPostPage';
import EditPostPage from './components/posts/EditPostPage';
import PostShowPage from './components/posts/PostShowPage';
import RequireAuth from './components/common/RequireAuth';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={PostsListPage} />
    <Route path="archive" component={ArchivePage} />
    <Route path="login" component={usersLoginPage} />

    <Route path="posts/new" component={RequireAuth(NewPostPage)} />
    <Route path="posts/:post_id" component={PostShowPage} />
    <Route path="posts/:post_id/edit" component={RequireAuth(EditPostPage)} />
  </Route>
);