import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './home.css'

class HomeView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }

        this.getAllPost = this.getAllPost.bind(this)
        this.handlePostClicked = this.handlePostClicked.bind(this)
    }

    componentDidMount() {
        this.getAllPost()
    }

    getAllPost() {
        fetch('http://localhost:5000/posts')
            .then(response => {
                console.log('response : ', response)
                if (!response.ok) {
                    throw new Error('HTTP Error ', response.status)
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    posts: data
                })
            })
            .catch(error => console.log(error))
    }

    handlePostClicked(data) {
        this.props.history.push({
            pathname: '/post/'+ data.id,
            state: data
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="post-container">
                    {this.state.posts.map((post,i) => {
                        return (
                            <div key={i} onClick={() => this.handlePostClicked(post)}>
                                <h2>{post.title}</h2>
                                <p>{post.author}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(HomeView)
