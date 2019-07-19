import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { HOME_PATH, POST_FORM_PATH, PASSWORD_GENERATOR_PATH } from '../urls';

export default class Navbar extends Component {
  render() {
    return (
      <div className="menu-container">
        <ul>
          <li>
            <Link to={HOME_PATH}>Home</Link>
          </li>
          <li>
            <Link to={POST_FORM_PATH}>New Post</Link>
          </li>
          <li>
            <Link to={PASSWORD_GENERATOR_PATH}>Password Generator</Link>
          </li>
        </ul>
      </div>
    );
  }
}
