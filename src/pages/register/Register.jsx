import React from 'react'
import "./register.css"

const Register = () => {
  return (
    <div className="content-grid">
       <div className='form-container'>
            <div className="form-wrapper">
                <span>Chat App</span>
                <h1>Create new account</h1>
                <form className='form' action="">
                    <div className="name">
                        <input type="text" placeholder='First name'/>
                        <input type="text" placeholder='Last name'/>
                    </div>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <div className="file">
                        <label htmlFor="input"><span class="material-symbols-outlined">add_a_photo</span><p>Add a photo</p></label>
                        <input type="file" id="input"/>
                    </div>
                    <button className="signup-btn">
                        Sign Up
                    </button>
                </form>
                <span className='signin'>Already a member? <a href='/'>Sing In</a></span>
            </div>
        </div>
        <div className="image-div">
        </div>
    </div>
    
  )
}

export default Register