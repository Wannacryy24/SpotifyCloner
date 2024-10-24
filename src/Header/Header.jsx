import React, { useContext } from 'react';
import './Header.css';
import { useNavigate } from 'react-router';
import { TokenContext } from '../ContextAPI/Context';

export default function Header() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(TokenContext);
  
  const handleToHome = () => {
    setSearchQuery('');
    navigate('/');
  };

  const handleSearch = (e) =>{
    const searchInput = e.target.value;
    if(searchInput === ''){
      navigate('/');
    }else{
      navigate(`/search/${searchInput}`);
    }
    setSearchQuery(e.target.value); 
  }
  
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo hoverPointer" onClick={handleToHome}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Logo"
            className="logo-img"
          />
        </div>
      </div>
      <div className="header-center">
        <div className="icon hoverPointer" onClick={handleToHome}>
          <i className="fas fa-home"></i>
        </div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch} 
            placeholder="What do you want to play?"
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <button className="signup-btn">Sign up</button>
        <button className="login-btn">Log in</button>
      </div>
    </header>
  );
}

