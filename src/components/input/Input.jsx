import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { ChatContext } from '../../context/chatContext'
import { v4 as uuid} from "uuid"
import { db, storage } from "../../firebase.js"
import "./index.css"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
  const {currentUser} = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(img) {
      const storageRef = ref(storage, uuid())

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            setText("")
            setImg(null);
          });
        }
      ); 

    } else {
      if(text === "")
      return

      await updateDoc(doc(db,"chats",data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text,
          senderId: currentUser.uid,
          date:Timestamp.now()
        })
      })  
      setText("")
      setImg(null);
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })
  }

  return (
    <div className='input-container'>
      <form onSubmit={(e) => handleSubmit(e)} className="input-wrapper">
        <input value={text} onChange={(e) => {setText(e.target.value)}} type="text" placeholder='Type a message...'/>
        <div className="input-buttons">
          <label htmlFor="file">
              <i className="bi bi-paperclip"></i>          
          </label>
          <input type="file" id='file' name='file'/>
          <button>
            <i className="bi bi-camera-fill"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Input