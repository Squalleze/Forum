import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Page from './lib/Page';

import './Register.sass';

const PATTERN_USERNAME = /^[a-z]([ _-]?[a-z0-9]+)+$/i;

const ERR_USERNAME_SIZE = 'Invalid username size',
      ERR_USERNAME_SHORT = 'Username too short',
      ERR_USERNAME_LONG = 'Username too long',
      ERR_USERNAME_INVALID = 'Username contains invalid chars',
      ERR_USERNAME_TAKEN = 'Username already in use',
      ERR_PASSWORD_SIZE = 'Invalid password size',
      ERR_PASSWORD_SHORT = 'Password too short',
      ERR_PASSWORD_LONG = 'Password too long',
      ERR_PASSWORD_MATCH = 'Passwords must match',
      ERR_UNKNOWN = 'Unknown error'
      ;

class Register extends Page {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
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
            case 'ERR_PASSWORD_SIZE': return { errorUsername: ERR_PASSWORD_SIZE };
            case 'ERR_USERNAME_TAKEN': return { errorUsername: ERR_USERNAME_TAKEN };
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
          password = form.password.value,
          passwordRepeat = form.passwordRepeat.value;
    
    this.checkError(username, password, passwordRepeat);    
  }

  checkError(username, password, passwordRepeat) {
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
    else if (password !== passwordRepeat)
      errorPassword = ERR_PASSWORD_MATCH;

    this.setState({
      username, password, passwordRepeat,
      errorPassword, errorUsername
    });
    return !(errorUsername || errorPassword);
  }
  submitForm(data) {
    return fetch(
      '/api/register',
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
            <h5>Register</h5>
            <form action='#'>
              <span>Username</span>
              <input type='text' name='username' value={ this.state.username } />
              { this.renderUsernameError() }
              <span>Password</span>
              <input type='password' name='password' value={ this.state.password } />
              <input type='password' name='passwordRepeat' value={ this.state.passwordRepeat } />
              { this.renderPasswordError() }
              <button type='submit'>Register</button>
              <a href="/signin">Already have an account</a>
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
    <Register />,
    document.getElementById('root')
  );