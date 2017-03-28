import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
  render() {
    const { handleSubmit, onLoginFormSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
        <div>
          <label htmlFor="Email">Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <div>
          <label htmlFor="password">Last Name</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm);

export default LoginForm;