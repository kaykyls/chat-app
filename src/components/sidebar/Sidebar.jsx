import React, { useContext, useState } from 'react'
import "./index.css"
import Search from '../search/Search'
import Chats from '../chats/Chats'
import { auth } from '../../firebase'
import { signOut } from "firebase/auth";
import { AuthContext } from '../../context/authContext'
import { ChatContext } from '../../context/chatContext'
import { storage } from "../../firebase.js"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import ImagePreview from '../imagePreview/ImagePreview'
import { useEffect } from 'react'
import { query, collection, where, getDocs } from 'firebase/firestore'
import UsernamePreview from '../usernamePreview/UsernamePreview'

const Sidebar = () => {
  const { data } = useContext(ChatContext)

  const [dropdownIsDown, setDropdownIsDown] = useState(false)
  const [imgURL, setImgURL] = useState("")
  const [userName, setUserName] = useState("")
  const [file, setFile] = useState(null)
  const [changeUsername, setChangeUsername] = useState(false)
  const [username, setUsername] = useState("")

  const {currentUser} = useContext(AuthContext)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleDisplayDropdown = () => {
    if(dropdownIsDown) {
      setDropdownIsDown(false)
      return
    }
    setDropdownIsDown(true)
  }
  
  const handleUpdatePicture = async () => {
    try {
      ///////////////
      const date = new Date().getTime();
      const imageRef = ref(storage, `${currentUser.userName} ${date}`);

      await uploadBytes(imageRef, file);

      let photoURL = null
      if(file) {
        const url = await getDownloadURL(imageRef);
        photoURL = url
      }

      await updateProfile(currentUser, {
        photoURL: photoURL
      });

      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL: photoURL
      })

    } catch (error) {
      console.log(error)
    }

    setFile(null)
  }

    const handleSetUserName = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setUserName(doc.data().username)
      })
    }

  const handleChangeUsername = async () => {
    changeUsername ? setChangeUsername(false) : setChangeUsername(true)

    const q = query(
      collection(db, "users")
    );

    const querySnapshot = await getDocs(q)

    let err = false

    querySnapshot.forEach((doc) => {
      if(doc.data().username == username) {
        console.log("entrou")
        err = true
        return
      }
    })

    if(err) return
  }

  useEffect(() => {
    handleSetUserName()
  }, [])

  console.log(currentUser.uid)

  return (
    <div className={`sidebar${data.chatId !== "null" ? " hidden" : ""}`}>
      <div className="user-info">
        <div className="user-name-pic">
          <img src={currentUser.photoURL} alt="" />
          <div className="user-name">
            <span>
              {currentUser.displayName}
            </span>
            <span>
              {userName && `@${userName}`}
            </span>
          </div>
        </div>
        <div className="edit-user-info">
          <button onClick={handleDisplayDropdown}><i className="bi bi-three-dots-vertical"></i></button>
        </div>
        {dropdownIsDown && <div className="dropdown">
          <div className="option" onClick={handleSignOut}>
            <i className="bi bi-box-arrow-right"></i>
            <span>sign out</span>
          </div>
          <div className="option" onClick={handleUpdatePicture}>
            <i className="bi bi-image"></i>
            <label htmlFor="update-pic-input">
              <span>Update profile picture</span>
            </label>
            <input value={""} onChange={(e) => setFile(e.target.files[0])} type="file" name='update-pic-input' id='update-pic-input'/>
          </div>
          <div className="option" onClick={handleChangeUsername}>
            <span>@</span>
            <span>Change Username</span>
          </div>
        </div>}
      </div>
      {file && <ImagePreview setImg={setFile} handleUpdatePicture={handleUpdatePicture} img={file} updatePic={true}/>}
      {changeUsername && <UsernamePreview/>}
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar