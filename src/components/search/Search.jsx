import React, { useState } from 'react'
import { auth } from '../../firebase'
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";
import "./index.css"

const Search = () => {
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState([])

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
// inicializar la aplicación de administración de Firebase
    admin.initializeApp();

    // obtener una lista de todos los usuarios
    admin.auth().listUsers()
      .then((userRecords) => {
        userRecords.forEach((user) => {
          console.log(user.toJSON());
        });
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });

        // try {
        //   const listUsersResult = await getAuth().listUsers();
        //   listUsersResult.users.forEach((user) => {
        //     if(user.displayName === username) {
        //       setUsers(user)
        //     }
        //     console.log(user)
        //   })
        //   } catch (error) {
        //     console.log('Error listing users:', error);
        // }
  }

  return (
    <div className='search-form-container'>
      <form onSubmit={(e) => handleSearch(e)} className='search-form' action="">
        <label className='search-input-label' htmlFor="search-input"><span className="material-symbols-outlined">search</span></label>
        <input value={username} onChange={(e) => handleChange(e)} placeholder='Search...' type="text" name="" id="search-input" />
      </form>
      {users && 
      users.forEach((user) => {
        <div className="searched-user">
          <img src={user.photoURL} alt="" />
          <span>{user.displayName}</span>
        </div>
      })}
    </div>
  )
}

export default Search