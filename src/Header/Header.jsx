import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router';

export default function Header() {
  // const [showLogin , setShowLogin] = useState(false);
  const navigate = useNavigate();
    const handletoHome = ()=>{
    navigate('/');
    console.log('clicked');
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo"
        onClick={handletoHome}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Logo"
            className="logo-img"
          />
        </div>
        
      </div>

      <div className="header-center">
      <div className="icon">
          <i className="fas fa-home"></i>
        </div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="What do you want to play?"
            className="search-input"
          />
          <i className="fas fa-box-open"></i>
        </div>
      </div>

      <div className="header-right">
        <button className="signup-btn">Sign up</button>
        <button className="login-btn">Log in</button>
      </div>
    </header>
  );
}


