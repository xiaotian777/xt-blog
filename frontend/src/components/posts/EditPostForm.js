import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Uploader from './Uploader';

class EditPostForm extends React.Component {

  render() {
    const { handleSubmit, onEditPostFormSubmit, post } = this.props;
    return (
      <div className="new-post-form">
        <form onSubmit={handleSubmit(onEditPostFormSubmit)}>
          <div>
            <label htmlFor="Title">Title</label>
            <Field name="title" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="body">Content</label>
            <Field name="body" component="textarea"/>
          </div>
          <div>
            <label htmlFor="uploads">Files</label>
            <Field
              name="uploads"
              component={Uploader}
            />
          </div>
          <div>
            <label htmlFor="hero_img">Hero Image</label>
            <Field
              name="hero_img"
              component={Uploader}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

EditPostForm = reduxForm({
  form: 'EditPostForm',
})(EditPostForm);

EditPostForm = connect(
  state => ({
    
    initialValues: {
      title: state.posts.activePost.post.title,
      body: state.posts.activePost.post.body,
      category: state.posts.activePost.post.category,
      post_id: state.posts.activePost.post.post_id
    } 
  })
)(EditPostForm);


export default EditPostForm;