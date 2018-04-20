import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';

import './Blog.sass';

class Blog extends Page {
  render() {
    return (
      <div>
        { this.renderHeader() }
      </div>
    );
  }
}

ReactDOM.render(
  <Blog />,
  document.getElementById('root')
);