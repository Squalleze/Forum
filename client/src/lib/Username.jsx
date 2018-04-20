import React, { Component } from 'react';

import './Username.sass';

const rankColors = [
  { dark: 'inherit', light: 'inherit' },
  { dark: '#206694', light: '#3498db' },
  { dark: '#c27c0e', light: '#f1c40f' },
];

export default class Username extends Component {
  render() {
    let { user, showColor, isLink, ...props } = this.props;
    if (showColor) {
      const color = rankColors[user.permLevel];
      if (!props.style) props.style = {};
      props.style.color = color.light;
    }

    if (isLink) {
      const href = `/profile/${ encodeURIComponent(user.username) }`;
      return (
        <a href={ href } { ...props }>{ user.username }</a>
      );
    }
    return (
      <span { ...props }>{ user.username }</span>
    );
  }
}