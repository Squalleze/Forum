import React, { Component } from 'react';
import Username from './Username';

import './Header.sass';

export default class Header extends Component {
  state = {
    userDropDown: false
  };
  toggleUserDropDown = () => {
    this.setState((prev) => ({ userDropDown: !prev.userDropDown }));
  }
  // FIXME
  loggout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/token', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Token': token
      }
    })
      .then(() => {
        localStorage.clear();
        location.reload();
      })
      .catch((err) => console.error(err));
    // location.reload()
  }

  renderUser(account) {
    if (account) // if logged in
      return (
        <div className='d-flex UserMenu' onClick={ this.toggleUserDropDown }>
          <img src={ account.avatar } alt='[Avatar]' className='Avatar size-2' />
          <span style={{ marginLeft: '.5em' }}>
            <Username user={ account } />
            <br />
            <small style={{ color: '#2685bc' }}>PROFILE</small>
          </span>
        </div>
      );
    // if not logged
    return (
      <div className='d-flex UserMenu'>
        <a href='/signin'>Sign In</a>
      </div>
    );
  }
  render() {
    const { account } = this.props.data;
    return (
      <div className='Header'>
        <div style={{ flexGrow: '1' }}>
          <ul className='Navbar'>
            <li><a href="/">Home</a></li>
            <li><a href="/forum">Forum</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div style={{ position: 'relative' }}>
          { this.renderUser(account) }
          <div className='UserDropDown' style={{ display: (this.state.userDropDown ? 'block' : 'none') }}>
            <ul>
              <li>
                <a href="/" onClick={ this.loggout }>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}