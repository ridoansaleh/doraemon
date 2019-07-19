import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './not_found.css'
import { HOME_PATH } from '../../urls'

class NotFoundView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className='not-found-container'>
                    <p className='not-found-title'>404</p>
                    <p className='not-found-content'>Page Not Found</p>
                    <Link to={HOME_PATH}>
                        <button type="button" className='back-btn'>Back Home</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFoundView
