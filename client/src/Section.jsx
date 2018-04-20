import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';
import Username from './lib/Username';

import './Section.sass';

function showDate(date) {
  const now = Date.now();
  if (!(date instanceof Date)) date = new Date(date);
  const str = (
    (now - date > 86400000)
      ? (date.toLocaleString())
      : (date.toLocaleTimeString())
    ).replace(/:\d{1,2} /, ' ');

  return ( <time dateTime={ date.toISOString() }>{ str }</time> );
}

const url = new URL(location.href);

class Section extends Page {
  state = { topics: [], parents: [], id: 0 };
  loadSection() {
    fetch(`/api/section?id=${ url.searchParams.get('s') }`)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw res;
        this.setState(res);
      })
      .catch(console.error);
  }
  componentWillMount() {
    super.componentWillMount();
    this.loadSection();
  }
  renderSectionPath = (section) => {
    const href = `/section?s=${ section.id }`;
    return (<a href={ href } key={ section.id }>/{ section.name }</a>)
  }
  renderPath(path) {
    return ( <small style={{ color:'#98999b' }}>{ path.map(this.renderSectionPath) }</small> );
  }
  renderTopic(topic) {
    const href = `/topic?t=${ topic.id }`;
    return (
      <article key={ topic.id } className='TopicThumb'>
        <header><a href={ href }>{ topic.title }</a></header>
        <footer className='small' style={{ color: '#2685bc' }}>
          #{ topic.totalComments } - { showDate(topic.lastComment.timestamp) }, <Username user={ topic.lastComment.author } isLink={ true } /> - Started by <Username user={ topic.author } isLink={ true } /> on { showDate(topic.timestamp) }
        </footer>
        {/*  20:30, Laisprd - Started by Jvinipr on 19/03/2014 18:58  */}
      </article>
    );
  }
  renderTopics(topics) {
    return topics.map(
      this.renderTopic.bind(this) // :: = .bind(this)
    );
  }
  render() {
    const href_newtopic = `/newtopic?s=${ this.state.id }`;
    return (
      <div>
        { this.renderHeader() }
        <div className='Grid'>
          <article className='Container' style={{ gridColumn: '3 / 9' }}>
            <header className='Container-header' style={{ display: 'flex' }}>
              <div className='' style={{ flexGrow: '1' }}>
                <h6>{ this.state.name }</h6>
                { this.renderPath(this.state.parents) }
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a href={ href_newtopic } className='Button bg-success'>Create topic</a>
              </div>
            </header>
            <section className='Container-body'>
              { this.renderTopics( this.state.topics ) }
            </section>
          </article>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Section />,
  document.getElementById('root')
);