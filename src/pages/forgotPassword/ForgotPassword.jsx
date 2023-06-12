import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

const ForgotPassword = () => {
    return (
        <div className='forgot-password-container'>
            <div className="forgot-password-wrapper">
                <h1>Forgot Password</h1>
                <p>Enter the email address associated with your account.</p>
                <form action="" className="fp-email-form">
                    <div className="fp-email-container">
                        <label htmlFor="fp-email">E-mail</label>
                        <input id='fp-email' className='fp-email-input' type="email" placeholder='youremail@example.com'/>
                    </div>
                    <button className="fp-email-btn">Send</button>
                </form>
                <div>
                    <span>Don't have an account? <Link to={"/register"}>Sign Up</Link></span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword