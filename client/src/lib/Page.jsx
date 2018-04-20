import React, { Component } from 'react';

import Header from './Header';

export default class Page extends Component {
  data = {
    account: null,
    token: localStorage.getItem('token'),
    url: new URL(location.href)
  };
  updateData(data) {
    this.data = { ...this.data, ...data };
    this.forceUpdate();
  }
  updateAccount() {
    if (!this.data.token) Promise.reject('No token');
    return fetch('/api/users/@me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Token': this.data.token }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw res;
        this.updateData({ account: res });
      });
  }
  renderHeader() {
    return ( <Header data={ this.data } /> );
  }
  componentWillMount() {
    this.updateAccount()
      .catch(console.error);
  }
}