import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPost } from '../../actions/postActions';
import PostDetail from './PostDetail';

class PostShowPage extends React.Component {

  componentDidMount() {
    this.props.fetchPost(this.props.params.post_id);
  }

  render() {
    const { post } = this.props.data;

    if (post) {
      return (
        <div className="page-transition">
          <PostDetail post={post} />
        </div>
      )
    }
    return <div className="page-transition"></div>
  }
  
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.posts.activePost
  };
}

export default connect(mapStateToProps, { fetchPost })(PostShowPage);