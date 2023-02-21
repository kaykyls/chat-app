import React, { useRef, useState } from 'react'
import "./index.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const [err, setErr] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [file, setFile] = useState(null)
    const [displayName, setDisplayName] = useState("")

    console.log(file)

    const checkPassword = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setDisplayName(firstName + lastName)

        if(password !== checkPassword.current.value) {
            alert("diferente")
            return
        }

        if(password.length < 8) {
            alert("Your password must have 8 characters or more")
            return
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "users", res.user.uid),{
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                    });
                }
            )

        } catch(err) {
            setErr(true)
        }
    }

    return (
        <div className="content-grid">
            <div className='form-container'>
                <div className="form-wrapper">
                    <span>Chat App</span>
                    <h1>Create new account</h1>
                    <form onSubmit={handleSubmit} className='form' action="">
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
                    <span className='signin'>Already a member? <a href='/'>Sing In</a></span>
                </div>
            </div>
            <div className="image-div"></div>
        </div>
    
  )
}

export default Register