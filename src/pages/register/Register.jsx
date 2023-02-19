import React, { useState } from 'react'
import "./register.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
        <div className="content-grid">
            <div className='form-container'>
                <div className="form-wrapper">
                    <span>Chat App</span>
                    <h1>Create new account</h1>
                    <form onSubmit={handleSubmit} className='form' action="">
                        <div className="name">
                            <input type="text" placeholder='First name'/>
                            <input type="text" placeholder='Last name'/>
                        </div>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email'/>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/>
                        {/* <div className="file">
                            <label htmlFor="input"><span className="material-symbols-outlined">add_a_photo</span><p>Add a photo</p></label>
                            <input type="file" id="input"/>
                        </div> */}
                        <button className="signup-btn">
                            Sign Up
                        </button>
                    </form>
                    <span className='signin'>Already a member? <a href='/'>Sing In</a></span>
                </div>
            </div>
            <div className="image-div"></div>
        </div>
    
  )
}

export default Register