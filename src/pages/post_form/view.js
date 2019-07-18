import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import './post_form.css'
import postsData from '../../data.json'

export default class PostFormView extends Component {
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

    handleSubmit(event) {
        event.preventDefault();
        const { title, content, author } = this.state
        if (title && content && author) {
            let id = this.generateId(postsData)
            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
                        isSubmissionSucceed: true
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
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
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
                            <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
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
