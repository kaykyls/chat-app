import React from 'react'
import "./index.css"
import teste from "./teste.jpg"
import Messages from '../messages/Messages'

const Chat = (props) => {
  return (
    <div className='chat-bg'>
      <div className="chat-info-container">
        <div className="chat-info-wrapper">
          <div className="contact-info">
            <img src={teste} alt="" />
            <span>Manoel Gomes</span>
          </div>
          <div className="contact-buttons">
            <button>
              <i class="bi bi-camera-video-fill"></i>
            </button>
            <button>
              <i class="bi bi-telephone-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <Messages/>
    </div>
  )
}

export default Chat