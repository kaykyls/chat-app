import React, { useRef, useState } from 'react'
import "./index.css"
import { updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [err, setErr] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [file, setFile] = useState(null)
    const [displayName, setDisplayName] = useState("")
    const [url, setUrl] = useState(null)

    const navigate = useNavigate()

    console.log(file)

    const checkPassword = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const fullName = firstName + " " + lastName
        setDisplayName(fullName)

        if(password !== checkPassword.current.value) {
            alert("Passwords do not match")
            return
        }

        if(password.length < 8) {
            alert("Your password must have 8 characters or more")
            return
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            console.log(user)

            const imageRef = ref(storage, "image");
            uploadBytes(imageRef, file)
              .then(() => {
                getDownloadURL(imageRef)
                  .then((url) => {
                    setUrl(url);
                  })
                  .catch((error) => {
                    console.log(error.message, "error getting the image url");
                  });
                setFile(null);
              })
              .catch((error) => {
                console.log(error.message);
            });

            updateProfile(user, {
              displayName: displayName, photoURL: url
            }).then(() => {
              // Profile updated!
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
          });

            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

    return (
        <div className="content-grid">
            <div className='form-container'>
                <div className="form-wrapper">
                    <span>Chat App</span>
                    <h1>Create new account</h1>
                    <form onSubmit={handleSubmit} className='form' action="">
                      {/* <img src={url} alt="" /> teste */}
                        <div className="name">
                            <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First name'/>
                            <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last name'/>
                        </div>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email'/>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/>
                        <input ref={checkPassword} type="password" placeholder='Confirm password'/>
                        <div className="file">
                            <label htmlFor="input"><span className="material-symbols-outlined">add_a_photo</span><p>Add a photo</p></label>
                            <input onChange={(e) => setFile(e.target.files[0])} type="file" id="input"/>
                        </div>
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