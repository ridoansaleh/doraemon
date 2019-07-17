import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH, POST_FORM_PATH, PASSWORD_GENERATOR_PATH } from '../../urls'

export default class HomeView extends Component {
    render() {
        return (
            <div>
                <p>Hello Ridoan</p>
                <ul>
                    <li>
                        <Link to={HOME_PATH}>Home</Link>
                    </li>
                    <li>
                        <Link to={POST_FORM_PATH}>Post Form</Link>
                    </li>
                    <li>
                        <Link to={PASSWORD_GENERATOR_PATH}>Password Generator</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
