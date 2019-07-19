import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './post.css';

class PostView extends Component {
  render() {
    const { state } = this.props.location;
    return (
      <div>
        <Navbar />
        <div className="post-detail-container">
          <h2>{state.title}</h2>
          <p>by {state.author}</p>
          <p>{state.body}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(PostView);
