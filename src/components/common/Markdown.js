import React from 'react';
//import Remarkable from 'remarkable';
import marked from 'marked';
import hljs from 'highlight.js';

import Link from 'react-router';

import MarkdownTOC from './MarkdownTOC';

class Markdown extends React.Component {

  render() {
    const content = this.props.content;
    const html = this.renderMD(content);
    // const toc = this.genToc(html);
    const parsedBody ={__html:  html}; 

    return (
      <div>
        {/*<MarkdownTOC toc={toc} />*/}
        <div className="markdown" dangerouslySetInnerHTML={parsedBody} />
      </div>
    );
  }

  renderMD(content) {

    marked.setOptions({
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
      }
    });

    const renderer = new marked.Renderer();

    let i = 0;
    renderer.heading = function (text, level) {
      var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      i++;
      return `<h${level}><span id="${i}-${text}">${text}</span></h${level}>`
    };

    const html = marked(content, { renderer })

    return html;
  }

  genToc(html) {
    const rx = /<h[1-6]>(.*?)<\/h[1-6]>/g;
    const findAllTitle = html.match(rx);
    const toc = findAllTitle.map((h) => {
      let temp = h.replace(/<span id="/, '<Link to="/"><a h1ref="#');
      let result = temp.replace(/<\/span>/, '</a></Link>');
      return result;
    });

    return toc;
  }

}

export default Markdown;