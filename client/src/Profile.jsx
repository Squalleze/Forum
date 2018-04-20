import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';

import './Profile.sass';

class Profile extends Page {
  render() {
    return (
      <div>
        { this.renderHeader() }
      </div>
    );
  }
}

ReactDOM.render(
  <Profile />,
  document.getElementById('root')
);