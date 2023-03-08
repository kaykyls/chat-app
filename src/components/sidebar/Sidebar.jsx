import React, { useContext, useState } from 'react'
import "./index.css"
import Search from '../search/Search'
import Chats from '../chats/Chats'
import teste from "./teste.jpg"
import { auth } from '../../firebase'
import { signOut } from "firebase/auth";
import { AuthContext } from '../../context/authContext'

const Sidebar = () => {
  const [dropdownIsDown, setDropdownIsDown] = useState(false)

  const {currentUser} = useContext(AuthContext)

  console.log(currentUser)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleDisplayDropdown = () => {
    if(dropdownIsDown) {
      setDropdownIsDown(false)
      return
    }
    setDropdownIsDown(true)
  }
  
  return (
    <div className='sidebar'>
      <div className="user-info">
        <div className="user-name-pic">
          <img src={currentUser.photoURL} alt="" />
          <span className='user-name'>
            {currentUser.displayName}
          </span>
        </div>
        <div className="edit-user-info">
          <button onClick={handleDisplayDropdown}><i className="bi bi-three-dots-vertical"></i></button>
        </div>
        {dropdownIsDown && <div className="dropdown">
          <div className="option" onClick={handleSignOut}>
            <i className="bi bi-box-arrow-right"></i>
            <span>sign out</span>
          </div>
        </div>}
      </div>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar