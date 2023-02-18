import React from 'react'
import "./index.css"

const Input = () => {
  return (
    <div className='input-container'>
      <div className="input-wrapper">
        <input type="text" placeholder='Type a message...'/>
        <div className="input-buttons">
          <button>
            <i class="bi bi-paperclip"></i>
          </button>
          <button>
            <i class="bi bi-camera-fill"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Input