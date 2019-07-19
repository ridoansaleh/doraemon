import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import './post_form.css'
import { BACKEND_API_URL } from '../../urls'

class PostFormView extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            content: '',
            author: '',
            isFormValid: true,
            isSubmissionSucceed: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.generateId = this.generateId.bind(this)
        this.getAllPosts = this.getAllPosts.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    generateId(data) {
        let id = 1
        const posts = data.posts || []
        let newPosts = []
        if (posts.length > 0) {
            newPosts = posts.map(post => post.id)
            id = Math.max(...newPosts) + 1
        }
        return id
    }

    async getAllPosts() {
        let res =  await fetch(BACKEND_API_URL, {
            mode: 'cors'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP Error ', response.status)
                }
                return response.json()
            })
            .then(data => {
                return data
            })
            .catch(error => console.log(error))
        return res
    }

    async handleSubmit(event) {
        event.preventDefault();

        let postsData = require('../../data.json')

        if (process.env.NODE_ENV === 'production') {
            postsData = {
                posts: await this.getAllPosts()
            }
        }
        const { title, content, author } = this.state
        
        if (title && content && author) {
            let id = this.generateId(postsData)
            fetch(BACKEND_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    id,
                    author,
                    title,
                    body: content
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('HTTP Error ', response.status)
                    }
                    return response.json()
                })
                .then(data => {
                    this.setState({
                        isSubmissionSucceed: true,
                        title: '',
                        content: '',
                        author: ''
                    })
                })
                .catch(error => console.log(error))
        } else {
            this.setState({
                isFormValid: false
            })
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="form-container">
                    <h2>Add a Post</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <div className="title-text">Title</div>
                            <br/>
                            <input type="text" className='post-form-field' name="title" value={this.state.title} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <label>
                            <div className="title-text">Content</div>
                            <br/>
                            <textarea name="content" value={this.state.content} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <label>
                            <div className="title-text">Author</div>
                            <br/>
                            <input type="text" className='post-form-field' name="author" value={this.state.author} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <input type="submit" className='post-form-btn' value="Submit" />
                        {this.state.isSubmissionSucceed &&
                            (
                                <div className='success-box'>
                                    Data berhasil disimpan
                                </div>
                            )
                        }
                        {!this.state.isFormValid &&
                            (
                                <div className='error-box'>
                                    Input tidak boleh ada yang kosong
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default PostFormView
