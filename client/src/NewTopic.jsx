import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';

import './NewTopic.sass';

class NewTopic extends Page {
  render() {
    return (
      <div>
        { this.renderHeader() }
        <div className='Grid'>
          <div className='Container' style={{ gridColumn: '3 / 9' }}>
            <div className='Container-header'>
              <h6>New Topic</h6>
            </div>
            <div className='Container-body'>
              <input type='text' placeholder='Title' />
              <textarea style={{ resize: 'vertical', minHeight: '2em' }}></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <NewTopic />,
  document.getElementById('root')
);