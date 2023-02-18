import React from 'react'
import "./index.css"

const Contact = (props) => {
  return (
    <div className='chat'>
      <img className='contact-image' src={props.img} alt="" />
      <div className="last-message">
        <h3 className='contact-name'>
          {props.contactName}
        </h3>
        <p>{props.lastMessage}</p>
        <span className='last-message-time'>{props.time}</span>
      </div>
    </div>
  )
}

export default Contact