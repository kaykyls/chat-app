import React from 'react'
import "./index.css"

const Search = () => {
  return (
    <div className='search-form-container'>
      <form className='search-form' action="">
        <label className='search-input-label' htmlFor="search-input"><span class="material-symbols-outlined">search</span></label>
        <input placeholder='Search...' type="text" name="" id="search-input" />
      </form>
    </div>
  )
}

export default Search