import React from 'react';
import Remarkable from 'remarkable';

import Markdown from '../common/Markdown';
import { ROOT_URL } from '../../config/config';


class PostDetail extends React.Component {
  render() {
    const { title, body, _createdAt, category, post_id, assets_url, hero_url } = this.props.post;
    return (
      <div className="post-detail">
        <div className="post-detail__header">
          { hero_url && <img className="post-detail__header__hero-img" src={`${ROOT_URL}/${hero_url}`} /> }
          <h1 className="post-detail__header__title"><i className="ion-ios-ionic-outline"></i> {title}</h1>
          <div className="post-detail__header__date"><i className="ion-ios-calendar-outline"></i> {new Date(_createdAt).toISOString().slice(0,10)}</div>
        </div>
        <div className="post-detail__body">
          <div className="wrapper wrapper--full-width">
            <Markdown content={body} />
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetail;