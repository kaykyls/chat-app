import React, { useState } from 'react'
import { auth } from "../../firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth";
import "./index.css"
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch(error) {
            setError(true)
            console.log(error)
        }
        

        console.log(error)
        if(!error)
        navigate("/")
    }

  return (
    <div className="login-content-grid">
        <div className='login-form-container'>
            <div className="form-wrapper">
                <span>Chat App</span>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='form' action="">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email'/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/>
                    <span><a href="/">Forgot password?</a></span>
                    <button className="signup-btn">
                        Sign In
                    </button>
                </form>
                <span className='signin'>Don't have an account? <Link to={"/register"}>Sing Up</Link></span>
            </div>
        </div>
        <div className="login-image-div"></div>
    </div>
    
  )
}

export default Login