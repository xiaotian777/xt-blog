import React from 'react';
import { connect } from 'react-redux';

import EditPostForm from './EditPostForm';
import { fetchPost, editPost, deletePost } from '../../actions/postActions';

class NewPostPage extends React.Component {

  componentDidMount() {
    this.props.fetchPost(this.props.params.post_id);
  }

  constructor() {
    super();

    this.onEditPostFormSubmit = this.onEditPostFormSubmit.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.post && <EditPostForm post={this.props.post} onEditPostFormSubmit={this.onEditPostFormSubmit} />}
        <button onClick={this.onDeleteButtonClick.bind(this)}>Delete</button>
      </div>
    )
  }

  onEditPostFormSubmit(post) {
    this.props.editPost(post);
  }

  onDeleteButtonClick() {
    this.props.deletePost(this.props.params.post_id);
  }

}

function mapStateToProps(state) {
  return {
    post: state.posts.activePost.post
  }
};

export default connect(mapStateToProps, {editPost, fetchPost, deletePost})(NewPostPage);