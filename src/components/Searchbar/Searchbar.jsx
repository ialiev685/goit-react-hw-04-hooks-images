import React, { useState } from 'react';

import './Searchbar.scss';

const Searchbar =({onSubmit})=> {


  const [searchName, setSearchName] = useState('')

  const handleSubmit = e => {
    e.preventDefault();

   onSubmit(searchName);

   setSearchName('');
  };

  const handleChange = e => {
   
    setSearchName(e.target.value.trim())
  };


    return (
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button className="SearchForm-button" type="submit">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          value={searchName}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    );
  
}

export default Searchbar;