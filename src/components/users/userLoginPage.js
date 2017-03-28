import React from 'react';
import { Link, IndexLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/userActions';
import LoginForm from './LoginForm';

class UsersLoginPage extends React.Component {

  render() {
    return (
      <div>
        <LoginForm onLoginFormSubmit={this.onLoginFormSubmit.bind(this)} />
      </div>
    );
  }

  onLoginFormSubmit(cred) {
    this.props.loginUser(cred);
  }
}

export default connect(null, {loginUser})(UsersLoginPage);