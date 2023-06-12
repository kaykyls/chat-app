import React, { useRef, useState } from 'react'
import { auth } from "../../firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth";
import "./index.css"
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const passwordRef = useRef()

    const navigate = useNavigate()

    let err = false
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch(error) {
            setError(true)
            err = true
            console.log(error)
            if(error.message === "Firebase: Error (auth/user-not-found).") {
                setErrorMsg("User not found")
            } else if(error.message === "Firebase: Error (auth/wrong-password).") {
                setErrorMsg("The password is wrong")
            }
        }
        
        if(!err) {
            setError(false)
            setErrorMsg("")
            handleViewPassword(false)
            navigate("/")
        }
    }

    const handleViewPassword = (view) => {
        setViewPassword(view)

        if(view) {
          passwordRef.current.type = "text"
          return
        }
        passwordRef.current.type = "password"
        document.querySelector(".eye-button").classList.remove("hidden")
    }

    // const handleFocus = () => {
    //     document.querySelector(".eye-button").classList.remove("hidden")
    // }

    // const handleBlur = () => {
    //     console.log(viewPassword)
    //     if(viewPassword) return
    //     console.log("entrou")
    //     document.querySelector(".eye-button").classList.add("hidden")
    //     setViewPassword(false)
    // }

  return (
    <div className="login-content-grid">
        <div className='login-form-container'>
            <div className="form-wrapper">
                <span>Chat App</span>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='login-form' action="">
                    <div className="email-container">
                        <label htmlFor="email">E-mail</label>
                        <input id='email' className='email-input' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='youremail@example.com'/>
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Password</label>
                        <div className="password-div">
                            {/* <input ref={passwordRef} onFocus={handleFocus} onBlur={handleBlur} className='password-input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/> */}
                            <input id="password" ref={passwordRef} className='password-input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password'/>
                            <button type='button' className="eye-button">
                                {viewPassword ? <i onClick={() => handleViewPassword(false)} className="bi bi-eye-slash-fill"></i> : <i onClick={() => handleViewPassword(true)} className="bi bi-eye-fill"></i>}
                            </button>
                        </div>
                    </div>
                    {error && <span className='error-msg'>{errorMsg}</span>}
                    <span className='forgot-password-btn'><Link to={"/forgot-password"}>Forgot password?</Link></span>
                    <button className="signup-btn">
                        Sign In
                    </button>
                </form>
                <span className='signin-sign-up'>Don't have an account? <Link to={"/register"}>Sing Up</Link></span>
            </div>
        </div>
        <div className="login-image-div"></div>
    </div>
    
  )
}

export default Login