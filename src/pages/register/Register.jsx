import React, { useRef, useState } from 'react'
import "./index.css"
import { updateProfile } from "firebase/auth";
import { storage, db } from "../../firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { query, collection, getDocs } from "firebase/firestore";

const Register = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [file, setFile] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const [viewPassword, setViewPassword] = useState(false)
    const [viewCheckPassword, setViewCheckPassword] = useState(false)
    const [username, setUsername] = useState("")

    const navigate = useNavigate()
    const checkPassword = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const fullName = firstName + " " + lastName

        if(password !== checkPassword.current.value) {
            setError(true)
            setErrorMsg("Passwords do not match")
            return
        }

        if(password.length < 8) {
            setError(true)
            setErrorMsg("Your password must have 8 characters or more")
            return
        }

        const q = query(
          collection(db, "users")
        );
  
        const querySnapshot = await getDocs(q)
  
        let err = false

        querySnapshot.forEach((doc) => {
          if(doc.data().username == username) {
            console.log("entrou")
            setErrorMsg("Username already in use")
            setError(true)
            err = true
            return
          }
        })

        if(err) return

        handleViewPassword(false)
        handleViewCheckPassword(false)

        setError(false)
        setErrorMsg("")

        // let err = false
        const auth = getAuth();
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
        
          const date = new Date().getTime();
          
          const imageRef = ref(storage, `${fullName} ${date}`);

          await uploadBytes(imageRef, file);

          let photoURL = null
          if(file) {
            const url = await getDownloadURL(imageRef);
            photoURL = url
          }

          await updateProfile(user, {
            displayName: fullName, photoURL
          });

          await setDoc(doc(db, "userChats", user.uid), {});

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: fullName,
            username,
            email: user.email,
            photoURL
          });
        
          navigate("/login");
        } catch (error) {
          setError(true);
          if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            setErrorMsg("Email already in use");
            console.log(error)
          } else {
            console.log(error);
          }
        }
    }

    const handleViewPassword = (view) => {
      setViewPassword(view)
      
      if(view) {
        passwordRef.current.type = "text"
        return
      }
      passwordRef.current.type = "password"
    }

    const handleViewCheckPassword = (view) => {
      setViewCheckPassword(view)
      
      if(view) {
        checkPassword.current.type = "text"
        return
      }
      checkPassword.current.type = "password"
    }

    const handleFocus = (e) => {
      // e.target.parentNode.style = "border: 2px solid #000; border-radius: 1rem"
    }

    const handleBlur = (e) => {
      // e.target.parentNode.style = ""
    }

    return (
        <div className="content-grid">
            <div className='form-container'>
                <div className="form-wrapper">
                    <span>Chat App</span>
                    <h1>Create new account</h1>
                    <form onSubmit={handleSubmit} className='register-form' action="">
                        <div className="name">
                          <div className="first-name">
                            <label htmlFor="first-name">First name</label>
                            <input id="first-name" onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" placeholder='Ex: John' required/>
                          </div>
                          <div className="last-name">
                            <label htmlFor="last-name">Last name</label>
                            <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder='Ex: Williams'/>
                          </div>
                        </div>
                        <div className="username-wrapper">
                          <label htmlFor="username-input">Username</label>
                          <input id='username-input' value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Ex: johnwilliams'/>
                        </div>
                        <div className="email-wrapper">
                          <label htmlFor="email-input">Email</label>
                          <input id='email-input' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Ex: email@example.com' required/>
                        </div>
                        
                        <div className="password-wrapper">
                          <label htmlFor="password-input">Password</label>
                          <div className="password-div">
                            <input id="password-input" onBlur={(e) => handleBlur(e)} onFocus={(e) => handleFocus(e)} ref={passwordRef} className='register-password-input' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter 8 Characters or more' required/>
                            <button type='button' className="eye-button">
                              {viewPassword ? <i onClick={() => handleViewPassword(false)} className="bi bi-eye-slash-fill"></i> : <i onClick={() => handleViewPassword(true)} className="bi bi-eye-fill"></i>}
                            </button>
                          </div>
                        </div>
                        <div className="password-wrapper">
                          <label htmlFor="check-password-input">Confirm Password</label>
                          <div className="password-div">
                            <input id='check-password-input' className='register-password-input' ref={checkPassword} type="password" placeholder='Enter 8 Characters or more' required/>
                            <button type='button' className="eye-button">
                              {viewCheckPassword ? <i onClick={() => handleViewCheckPassword(false)} className="bi bi-eye-slash-fill"></i> : <i onClick={() => handleViewCheckPassword(true)} className="bi bi-eye-fill"></i>}
                            </button>
                          </div>
                        </div>                     
                        {error && <span className='error-msg'>{errorMsg}</span>}
                        <button className="signup-btn">
                            Sign Up
                        </button>
                    </form>
                    <span className='signin'>Already a member? <Link to={"/login"}>Sing In</Link></span>
                </div>
            </div>
            <div className="image-div"></div>
        </div>
    
  )
}

export default Register