import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Username from './lib/Username';
import Page from './lib/Page';

import './Forum.sass';

function formatDate(date) {
  const now = new Date();

  if (now.getDay() - date.getDay() === 1)
    return (`Yesterday ${ date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }`);

  return (
    (now - date > 86400000)
      ? (date.toLocaleString([], { hour: '2-digit', minute: '2-digit' }))
      : (date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    );
}

function showDate(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return ( <time dateTime={ date.toISOString() }>{ formatDate(date) }</time> );
}

class Forum extends Page {
  state = { sections: null };
  componentWillMount() {
    super.componentWillMount();
    this.loadSections();
  }
  loadSections() {
    fetch('/api/sections')
      .then(res => res.json())
      .then((res) => {
        if (res.error) throw res;
        this.setState({ sections: res });
      })
      .catch(console.error);
  }
  renderTopic(topic) {
    if (!topic) return;
    const href = `/topic?t=${ topic.id }`;
    return (
      <article key={ topic.id } className='TopicThumb'>
        <header><a href={ href }>{ topic.title }</a></header>
        <footer className='small' style={{ color:'#2685bc' }}>
          {/* #{ topic.totalComments } -  */}
          { showDate(topic.lastComment.timestamp) }, <Username user={ topic.lastComment.author } isLink={ true } />
        </footer>
      </article>
    );
  }
  renderSubSection(section) {
    const href = `/section?s=${ section.id }`;
    return (
      <article key={ section.id } className='SubSection'>
        <header><a href={ href }>{ section.name }</a></header>
        <section>
          { this.renderTopic(section.lastTopic) }
          { this.renderSubSections(section.sections) }
        </section>
      </article>
    );
  }
  renderSubSections(sections) {
    return sections.map((section) => this.renderSubSection(section));
  }
  renderSection(section) {
    const href = `/section?s=${ section.id }`;
    return (
      <article key={ section.id } className='Section'>
        <header><a href={ href }>{ section.name }</a></header>
        <section>
          { this.renderTopic(section.lastTopic) }
          { this.renderSubSections(section.sections) }
        </section>
      </article>
    );
  }
  renderSections(sections) {
    if (!sections) return 'Loading...';
    return sections.map(this.renderSection.bind(this));
  }
  render() {
    return (
      <div>
        { this.renderHeader() }
        <div className='Grid'>
          <div className='Container' style={{ gridColumn: '3 / 9' }}>
            <div className='Container-body'>
              { this.renderSections(this.state.sections) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Forum />,
  document.getElementById('root')
);