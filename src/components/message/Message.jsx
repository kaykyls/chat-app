import React from 'react'
import teste from "./teste.jpg"
import "./index.css"

const Message = (props) => {
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