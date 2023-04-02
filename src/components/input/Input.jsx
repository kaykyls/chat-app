import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { ChatContext } from '../../context/chatContext'
import { v4 as uuid} from "uuid"
import { db, storage } from "../../firebase.js"
import ImagePreview from '../imagePreview/ImagePreview'
import "./index.css"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
  const {currentUser} = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  console.log(img)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const storageRef = ref(storage, uuid())
    const uploadTask = uploadBytesResumable(storageRef, img);

    console.log(uploadTask.on)

    try {
      if (img) {
        await new Promise((resolve, reject) => {
          uploadTask.on(
            (error) => {
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
              setText("");
              setImg(null);
              resolve();
            }
          );
        });
      } else {
        if (text === "") {
          return;
        }
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        setText("");
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
    } catch (error) {
      console.log(error)
    }
    
    setImg(null);
  }

  return (
    <div className='input-container'>
      <form onSubmit={(e) => handleSubmit(e)} className="input-wrapper">
        <input value={text} onChange={(e) => {setText(e.target.value)}} type="text" placeholder='Type a message...'/>
        <div className="input-buttons">
          <label htmlFor="file">
              <i className="bi bi-paperclip"></i>          
          </label>
          <input value={""} onChange={(e) => setImg(e.target.files[0])} type="file" id='file' name='file'/>
          <button>
            <i className="bi bi-camera-fill"></i>
          </button>
        </div>
      </form>
      {img && <ImagePreview img={img} handleSubmit={handleSubmit} setImg={setImg} text={text} setText={setText}/>}
    </div>
  )
}

export default Input