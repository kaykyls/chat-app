import React, { useContext } from 'react'
import teste from "./teste.jpg"
import "./index.css"
import { AuthContext } from '../../context/authContext'

const Message = (props) => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='message'>
      <div className={props.isContactMessage ? "contact-message" : "user-message"}>
        <img className='chat-image' src={teste} alt="" />
        <div className="text-bg">
          <span className='text'>
            la ele
          </span>
        </div>
      </div>
    </div>
  )
}

export default Message