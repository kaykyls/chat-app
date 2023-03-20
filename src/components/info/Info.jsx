import teste from "./teste.jpg"

const Info = (props) => {

  return (
    <div className="chat-info-container">
        <div className="chat-info-wrapper">
          <div className="contact-info">
            <img src={props.img} alt="" />
            <span>{props.name}</span>
          </div>
          <div className="contact-buttons">
            <button>
              <i className="bi bi-camera-video-fill"></i>
            </button>
            <button>
              <i className="bi bi-telephone-fill"></i>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Info