import './Login.css'; 

export default function Login() {
  return (
    <div className="login-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify Logo" />
      <h1>Log in to Spotify</h1>

      <a href="#" className="login-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" />
        Continue with Google
      </a>

      <a href="#" className="login-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
        Continue with Facebook
      </a>

      <a href="#" className="login-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
        Continue with Apple
      </a>

      <a href="#" className="login-button">
        Continue with phone number
      </a>
    </div>
  );
};


