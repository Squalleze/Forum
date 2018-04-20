import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';

import './Index.sass';

class Index extends Page {
  render() {
    return (
      <div>
        { this.renderHeader() }
        <div>
          <img src="https://discordapp.com/assets/e0c782560fd96acd7f01fda1f8c6ff24.svg" alt="Shit!" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);