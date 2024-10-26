import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../ContextAPI/Context';
import { useNavigate, useParams } from 'react-router-dom';
import './singleartist.css'; 

export default function SingleArtistDetails() {
    const [error, setError] = useState(null);
    const {accessToken} = useContext(TokenContext);
    const {artistId} = useParams();
    const [artistData , setArtistData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!accessToken) return;
       const fetchSingleArtistDetails = async () => { 
                try {
                    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Songs fetching error: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data.tracks);
                    // console.log(data.tracks[0].artists[0].name);
                    setArtistData(data.tracks);
                    setSelectedAlbumSongs(data.items);
                } catch (error) {
                    setError(error.message);
                }
            };
            if (artistId) {
                fetchSingleArtistDetails();
            }
    },[artistId,accessToken]);

    const handlePlaySong = (id)=>{
        navigate(`/song/${id}`);
    }
  return (
    <div className='content'>
        {/* <h1>{artistData && artistData[0].artists[0].name}</h1> */}
        <div className='singleArt-cont'>
        {
            artistData.map((singleItem, index)=>(
                <div className='singleArtist' key={singleItem.id}  onClick={()=>handlePlaySong(singleItem.id)}>
                     <img src={singleItem.album.images[0].url}  />
                   
                    <p>{singleItem.name}</p>
                    <p>{singleItem.duration_ms}</p>
                    
                </div>
            ))
       }
       </div>
    </div>
  )
}
