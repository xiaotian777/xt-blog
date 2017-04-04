import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions/postActions';
import { Link } from 'react-router';
import { ROOT_URL } from '../../config/config';

class PostsListPage extends React.Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return ( 
      <div className="page-transition">
        <div className="large-hero"></div>
        <div className="post-list-container">
          {this.genPostList()}
        </div>
      </div>
    )
  }

  genPostList() {
    const { posts } = this.props;
    if (posts) {
      return posts.map(post => (
        
          <div className="post-list-item" key={post.post_id}>
            <Link to={"posts/" + post.post_id}>
              <div>
                <div className="post-list-item__img">
                  {post.hero_url && <img src={`${ROOT_URL}/${post.hero_url}`} />}
                </div>

                <div className="post-list-item__right">
                  <h2 className="post-list-item__title">{post.title}</h2>
                  <div className="post-list-item__date">
                    <i className="ion-ios-calendar-outline"></i>  
                    {new Date(post._createdAt).toISOString().slice(0,10)}
                  </div>
                  <i className="ion-ios-arrow-thin-right post-list-item__readmore"></i>
                </div>
              </div>
            </Link>
          </div>
      ));
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.postsList.posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostsListPage);