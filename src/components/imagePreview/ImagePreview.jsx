import React from 'react'
import "./index.css"

const ImagePreview = (props) => {
    if(!props.updatePic) {
        props.setText("")
    }

  return (
    <div className='image-modal'>
        <div className="image-container">
            <div className="image">
                <img src={URL.createObjectURL(props.img)} alt="" />
            </div>
           
            {!props.updatePic &&
            <div className="image-text">
                <span>Message:</span>
                <input defaultValue={props.text} type="text" />
            </div>
            }
            <div className="image-buttons">
                <button onClick={() => props.setImg(null)}>Cancel</button>
                <button onClick={(e) => props.updatePic ? props.handleUpdatePicture() : props.handleSubmit(e)}>{props.updatePic ? "Update" : "Send"}</button>
            </div>
        </div>
    </div>
  )
}

export default ImagePreview