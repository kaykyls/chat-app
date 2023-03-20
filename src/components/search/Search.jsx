import React, { useState, useContext } from 'react'
import { auth } from '../../firebase'
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from '../../context/authContext';

import "./index.css"

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [loader, setLoader] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if(username === "")
    return

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );


    try {
      setLoader(true)
      const querySnapshot = await getDocs(q)
      setLoader(false)

      if(!querySnapshot.docs.length)
      setUser(null)

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log("entrou")
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid

    try{
      const res = await getDoc(doc(db, "chats", combinedId))

      if(!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
      }
    } catch(error) {
      console.log(error)
    }

    setUser(null)
    setUsername("")
  }

  return (
    <div className='search-form-container'>
      <form onSubmit={(e) => handleSearch(e)} className='search-form' action="">
        <label className='search-input-label' htmlFor="search-input"><span className="material-symbols-outlined">search</span></label>
        <input value={username} onChange={(e) => handleChange(e)} placeholder='Search...' type="text" name="" id="search-input" />
      </form>
      {loader && <div className='loader-container'><div className="loader"><div></div><div></div><div></div><div></div></div></div>}
      {user && 
      // users.forEach((user) => {
        <div className="searched-user" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <span>{user.displayName}</span>
        </div>
      }
    </div>
  )
}

export default Search