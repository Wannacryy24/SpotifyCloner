import Button from '../Minicomponents/Button';
import Li from '../Minicomponents/Licomp';
import './Sidebar.css';

export default function Sidebar(){
   
    const sideLinks = [
        'Legal',
        'Safety & Privacy Center',
        'Privacy Policy',
        'Cookies',
        'About Ads',
        'Accessibility',
        'Cookies',
      ];
    
      return (
        <div className="container">
          <div className="sidebar">
            <div className="library">
            <div><i className="fas fa-book"></i>  Your Library</div> 
              <i className="fas fa-plus"></i>
            </div>
            <div className="playlist-section">
              <p>Create your first playlist</p>
              <p>It's easy, we'll help you</p>
              <Button
                text="Create playlist"
                className="create-playlist-btn"
              />
            </div>
            <div className="legal-links">
              <ul>
                {sideLinks.map((link, index) => (
                  <Li key={index} text={link} />
                ))}
              </ul>
              <Button
                text="English"
                className="language-btn"
                icon="fas fa-globe"
              />
            </div>
          </div>
    
          <div className="content"></div>
        </div>
      );
}