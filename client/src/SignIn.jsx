import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';

import './SignIn.sass';

const PATTERN_USERNAME = /^[a-z]([ _-]?[a-z0-9]+)+$/i;

const ERR_USERNAME_SIZE = 'Invalid username size',
      ERR_USERNAME_SHORT = 'Username too short',
      ERR_USERNAME_LONG = 'Username too long',
      ERR_USERNAME_INVALID = 'Username contains invalid chars',
      ERR_USERNAME_NOTFOUND = 'Username does not exist',
      ERR_PASSWORD_WRONG = 'Password incorrect',
      ERR_PASSWORD_SHORT = 'Password too short',
      ERR_PASSWORD_LONG = 'Password too long',
      ERR_UNKNOWN = 'Unknown error'
      ;

class SignIn extends Page {
  state = {
    username: '',
    password: '',
    errorUsername: null,
    errorPassword: null
  }
  onLogin = (token) => {
    localStorage.setItem('token', token);
    location.href = '/';
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordRepeat } = this.state;
    if (!this.checkError(username, password, passwordRepeat)) return;

    this.submitForm({ username, password })
      .then((resp) => {
        if (resp.error) {
          switch (resp.error) {
            case 'ERR_USERNAME_SIZE': return { errorUsername: ERR_USERNAME_SIZE };
            case 'ERR_USERNAME_INVALID': return { errorUsername: ERR_USERNAME_INVALID };
            case 'ERR_USERNAME_NOTFOUND': return { errorUsername: ERR_USERNAME_NOTFOUND };
            case 'ERR_PASSWORD_SIZE':
            case 'ERR_PASSWORD_WRONG': return { errorPassword: ERR_PASSWORD_WRONG };
            default:
              console.log(resp);
              return { errorUsername: ERR_UNKNOWN, errorPassword: ERR_UNKNOWN };
          }
        }
        this.onLogin(resp.token);
      })
      .then((state) => this.setState(state))
      ;
  }
  onChange = (e) => {
    const form = e.target.form;
    const username = form.username.value,
          password = form.password.value;
    
    this.checkError(username, password);    
  }

  checkError(username, password) {
    let errorUsername = null, errorPassword = null;
    
    if (username.length < 2)
      errorUsername = ERR_USERNAME_SHORT;
    else if (username.length > 12)
      errorUsername = ERR_USERNAME_LONG;
    else if (!PATTERN_USERNAME.test(username))
      errorUsername = ERR_USERNAME_INVALID;

    if (password.length < 8)
      errorPassword = ERR_PASSWORD_SHORT;
    else if (password.length > 512)
      errorPassword = ERR_PASSWORD_LONG;

    this.setState({
      username, password,
      errorPassword, errorUsername
    });
    return !(errorUsername || errorPassword);
  }
  submitForm(data) {
    return fetch(
      '/api/token',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json());
  }

  renderUsernameError() {
    if (!this.state.errorUsername) return;
    return (
      <small>{ this.state.errorUsername }</small>
    );
  }
  renderPasswordError() {
    if (!this.state.errorPassword) return;
    return (
      <small>{ this.state.errorPassword }</small>
    );
  }
  render() {
    return (
      <div className='Page'>
        { this.renderHeader() }
        <div className='Grid'>
          <div className='Form' onChange={ this.onChange } onSubmit={ this.onSubmit }>
            <h5>Sign In</h5>
            <form action='#'>
              <span>Username</span>
              <input type='text' name='username' value={ this.state.username } />
              { this.renderUsernameError() }
              <span>Password</span>
              <input type='password' name='password' value={ this.state.password } />
              { this.renderPasswordError() }
              <button type='submit'>Sign In</button>
              <a href="/register">Need an account?</a>
            </form>
          </div>
          <div className='Container' />
        </div>
      </div>
    );
  }
}

if (localStorage.getItem('token'))
  location.href = '/';
else
  ReactDOM.render(
    <SignIn />,
    document.getElementById('root')
  );