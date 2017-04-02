import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1';

import NewPostForm from './NewPostForm';
import { createPost } from '../../actions/postActions';

class NewPostPage extends React.Component {

  constructor() {
    super();
    this.state = {
      post_id: uuidV1()
    };

    this.onNewPostFormSubmit = this.onNewPostFormSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <NewPostForm post_id={this.state.post_id} onNewPostFormSubmit={this.onNewPostFormSubmit} />
      </div>
    )
  }

  onNewPostFormSubmit(post) {
    post.post_id = this.state.post_id;
    this.props.createPost(post);
  }

}

export default connect(null, {createPost})(NewPostPage);