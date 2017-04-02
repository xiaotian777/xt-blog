import React from 'react';
import { IndexLink, Link } from 'react-router';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setHeaderNarrow: false
    };

    this._handleWaypointEnter = this._handleWaypointEnter.bind(this);
    this._handleWaypointLeave = this._handleWaypointLeave.bind(this);
  }

  render() {
    let headerClass = classNames({
      "site-header": true,
      "site-header--narrow": this.state.setHeaderNarrow
    });
    let logoClass = classNames({
      "site-header__logo": true,
      "site-header__logo--narrow": this.state.setHeaderNarrow
    });
    return (
      <div>
        <header className={headerClass}>
          <div className="wrapper">
            <Link to="/">
              <h1 className={logoClass}>
                <span className="site-header__logo__firstword">XT</span> DEV
              </h1>
            </Link>
            <nav className="primary-nav">
              <IndexLink to="/" activeClassName="active">Home</IndexLink>
              ||
              <IndexLink to="/archive" activeClassName="active">Archive</IndexLink>
              ||
              <IndexLink to="/posts/new" activeClassName="active">New Post</IndexLink>
            </nav>
          </div>
        </header>
        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
          topOffset="-150px"
        />
      </div>
    );
  }

  _handleWaypointEnter() {
    this.setState({
      setHeaderNarrow: false
    });
  }

  _handleWaypointLeave() {
    this.setState({
      setHeaderNarrow: true
    });
  }
}

export default Header;