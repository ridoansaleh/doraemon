import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import './password-generator.css';

class PasswordGeneratorView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
    };

    this.generatePassword = this.generatePassword.bind(this);
    this.getRandomValue = this.getRandomValue.bind(this);
  }

  getRandomValue(length, characters) {
    let result = '';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generatePassword(event) {
    event.preventDefault();

    const NUMBER_LIST = '0123456789';
    const ALPHABET_LIST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const SPECIAL_CHARS_LIST = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

    let result = '';
    let numbers = this.getRandomValue(4, NUMBER_LIST);
    let alphabet = this.getRandomValue(4, ALPHABET_LIST);
    let specialChars = this.getRandomValue(4, SPECIAL_CHARS_LIST);

    result = numbers + alphabet + specialChars;

    this.setState({
      password: result,
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="form-container">
          <form onSubmit={this.generatePassword}>
            <input
              type="text"
              className="password-form-field"
              name="title"
              value={this.state.password}
              disabled
            />
            <input type="submit" className="password-form-btn" value="Generate Password" />
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordGeneratorView;
