import { useContext } from "react"
import { ChatContext } from "../../context/chatContext"
import "./index.css"

const Info = (props) => {
  const { dispatch } = useContext(ChatContext)
  const { data } = useContext(ChatContext)

  console.log(data)


  const handleReturn = () => {
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };

    dispatch({ type: "RESET_STATE", payload: INITIAL_STATE });
  }
    

  return (
    <div className="chat-info-container">
        <div className="chat-info-wrapper">
          <div className="contact-info">
            <button onClick={handleReturn} className="return-btn"><i className="bi bi-arrow-left"></i></button>
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