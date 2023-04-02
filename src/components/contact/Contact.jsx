import React from 'react'
import "./index.css"
import account from "./account.jpg"

const Contact = (props) => {
  console.log(props.img)

  return (
    <div className='chat'>
      <img className='contact-image' src={props.img === null ? account : props.img} alt="" />
      <div className="last-message">
        <h3 className='contact-name'>
          {props.contactName}
        </h3>
        <p>{props.lastMessage}</p>
        <span className='last-message-time'>{}</span>
      </div>
    </div>
  )
}

export default Contact