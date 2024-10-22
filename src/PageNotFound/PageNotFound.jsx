import { useNavigate } from 'react-router'
import './PageNotFound.css'

export default function PageNotFound() {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/');
    }
    return(
        <>
            <div className="pageNotFound">
                <div className="pageNotFound-wrapper">
                    <div className="pageNotFound-icon-div">
                        <img src="/spotify_icon.svg" alt="" />
                    </div>
                    <div className='pageNotFound-div-content'>
                        <h1>Page not found</h1>
                        <p>We can’t seem to find the page you are looking for.</p>
                    </div>
                    <div className="pageNotFound-button-div">
                        <button className='return-to-home' onClick={handleClick}>HOME</button>
                        <p>Help</p>
                    </div>
                </div>
            </div>
        </>
    )
}