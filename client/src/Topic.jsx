import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';
import Username from './lib/Username';

import './Topic.sass';

const dummy = {
  id: 0,
  username: 'Vinicius G',
  discriminator: '6495',
};

class Topic extends Page {
  render() {
    return (
      <div className='Topic'>
        { this.renderHeader() }
        <div className='Grid'>
          <article className='Container' style={{ gridColumn: '3 / 9' }}>
            <header className='Container-header'>
              <h6>Topic title</h6><small style={{color:'#98999b'}}>categories/off-topic</small>
            </header>
            <section>
              <article className='Comment'>
                <header>
                  <img src="https://cdn.discordapp.com/avatars/309887425826521088/ed6319a263e3288b0cfd9ac89b3329a2.png" alt="Avatar" className='Avatar size-4 d-block' />
                  <Username user={ dummy } className='h6' />
                  <small>10/10/2018 9:30 PM</small>
                </header>
                <div className='Comment-body Markdown'>
                  <h2>Sub-heading</h2>
                  <p>Paragraphs are separated
                  by a blank line.</p>
                  <p>Two spaces at the end of a line<br />
                  produces a line break.</p>
                  <p>Text attributes <em>italic</em>, 
                  <strong>bold</strong>, <code>monospace</code>.</p>
                  <p>Horizontal rule:</p>
                  <hr />
                  <p>Bullet list:</p>
                  <ul>
                  <li>apples</li>
                  <li>oranges</li>
                  <li>pears</li>
                  </ul>
                  <p>Numbered list:</p>
                  <ol>
                  <li>wash</li>
                  <li>rinse</li>
                  <li>repeat</li>
                  </ol>
                  <p>A <a href="http://example.com">link</a>.</p>
                  <p><img alt="Image" src="https://cdn.discordapp.com/avatars/309887425826521088/ed6319a263e3288b0cfd9ac89b3329a2.png" /></p>
                  <blockquote>
                  <p>Markdown uses email-style &gt; characters for blockquoting.</p>
                  </blockquote>
                  <p>Inline <abbr title="Hypertext Markup Language">HTML</abbr> is supported.</p>
                </div>
                <footer className='small'>Edited 10/10/2018 9:30 PM</footer>
              </article>
              <article className='Comment'>
                <header>
                  <img src="https://cdn.discordapp.com/avatars/309887425826521088/ed6319a263e3288b0cfd9ac89b3329a2.png" alt="Avatar" className='Avatar size-4 d-block' />
                  <Username user={ dummy } className='h6' />
                  <small>10/10/2018 9:30 PM</small>
                </header>
                <div className='Comment-body Markdown'>
                  <p>Nice...</p>
                </div>
                {/* <footer className='small'>Edited 10/10/2018 9:30 PM</footer> */}
              </article>
            </section>
          </article>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Topic />,
  document.getElementById('root')
);