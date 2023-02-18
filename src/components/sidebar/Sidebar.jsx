import React from 'react'
import "./index.css"
import Search from '../search/Search'
import Chats from '../chats/Chats'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar