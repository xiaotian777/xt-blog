import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Uploader from './Uploader';

class NewPostForm extends React.Component {

  render() {
    const { handleSubmit, onNewPostFormSubmit } = this.props;
    return (
      <div className="new-post-form">
        <form onSubmit={handleSubmit(onNewPostFormSubmit)}>
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

NewPostForm = reduxForm({
  form: 'NewPostForm' // a unique name for this form
})(NewPostForm);

export default NewPostForm;