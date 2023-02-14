import React from 'react'
import "./login.css"

const Login = () => {
  return (
    <div className="login-content-grid">
        <div className='login-form-container'>
            <div className="form-wrapper">
                <span>Chat App</span>
                <h1>Login</h1>
                <form className='form' action="">
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <span><a href="/">Forgot password?</a></span>
                    <button className="signup-btn">
                        Sign In
                    </button>
                </form>
                <span className='signin'>Don't have an account? <a href='/'>Sing Up</a></span>
            </div>
        </div>
        <div className="login-image-div"></div>
    </div>
    
  )
}

export default Login