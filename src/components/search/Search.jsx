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
  const { currentUser } = useContext(AuthContext)

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
      
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
  
      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          console.log(doc.data())
        });
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='search-form-container'>
      <form onSubmit={(e) => handleSearch(e)} className='search-form' action="">
        <label className='search-input-label' htmlFor="search-input"><span className="material-symbols-outlined">search</span></label>
        <input value={username} onChange={(e) => handleChange(e)} placeholder='Search...' type="text" name="" id="search-input" />
      </form>
      {user && 
      // users.forEach((user) => {
        <div className="searched-user">
          <img src={user.photoURL} alt="" />
          <span>{user.displayName}</span>
        </div>
      }
    </div>
  )
}

export default Search