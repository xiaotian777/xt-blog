import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1500}
              transitionLeaveTimeout={1500}
              component="div">
            {React.cloneElement(this.props.children, { key: this.props.location.pathname})}
          </ReactCSSTransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;