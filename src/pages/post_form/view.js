import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import './post_form.css'

export default class PostFormView extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            content: '',
            author: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log('e : ', event.target)
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, content, author } = this.state
        if (title && content && author) {
            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 66,
                    author,
                    title,
                    body: content
                })
            })
                .then(response => {
                    console.log('response : ', response)
                    if (!response.ok) {
                        throw new Error('HTTP Error ', response.status)
                    }
                    return response.json()
                })
                .then(data => {
                    console.log('post results : ', data)
                    // this.setState({
                    //     posts: data
                    // })
                })
                .catch(error => console.log(error))
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
                            Content<br/>
                            <textarea name="content" value={this.state.content} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <label>
                            Author<br/>
                            <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}
