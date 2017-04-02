import React from 'react';
//import Remarkable from 'remarkable';
import marked from 'marked';
import hljs from 'highlight.js';

import Link from 'react-router';

class MarkdownTOC extends React.Component {

  render() {

    console.log(this.props.toc);
    return (
      <div>
        <div>TOC</div>
        {this.renderTOC(this.props.toc)}
      </div>
    );
  }

  renderTOC(toc) {
    for (let i = 0; i < toc.length; i++) {
    }
    return toc.map((list) => {
      return <div>{list}</div>
    });
  }

}

export default MarkdownTOC;