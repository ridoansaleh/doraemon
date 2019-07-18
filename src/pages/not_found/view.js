import React, { Component } from 'react'
import Navbar from '../../components/Navbar'

export default class NotFoundView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <p>404 | Not Found Page</p>
            </div>
        )
    }
}
