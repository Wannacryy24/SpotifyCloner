import React, { useContext, useEffect } from 'react'
import { TokenContext } from '../ContextAPI/Context';
import { useNavigate,useParams} from 'react-router-dom';
import './Search.css'
export default function SearchedComponent() {
    const { accessToken, searchQuery, setSearchQuery,  searchResults, setSearchResults ,playSong , setPlaySong,
        songId , setSongId} = useContext(TokenContext); 
    const {searchInput} = useParams();
    const navigate  = useNavigate();
    
    useEffect(() => {
        setSearchQuery(searchInput);

        const handleSearch = async () => {
          if (!accessToken) return;

          if (searchQuery.trim()=== "") {
            setSearchResults([]);
            return;
          }
          
          try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`,
              {
                method: "GET",
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              }
            );
            if (!response.ok) {
              throw new Error(`Search error: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data.tracks.items);
            setSearchResults(data.tracks.items);
          } catch (error) {
            setError(error.message);
          }
        };
        handleSearch();
      }, [searchQuery, accessToken, setSearchResults]); 
    

    const handlePlaySong = (id) => {
        navigate(`/song/${id}`);
    }
    
  return (
    <div className="search-results content">
        <div className="track-list">
            {searchResults.map((track) => (
              <div key={track.id} className="track hoverPointer" onClick={()=>handlePlaySong(track.id)}>
                <img src={track.album.images[0].url} alt={track.name} />
                <h3>{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                <button className="play-button">▶</button>
              </div>
            ))}
            {playSong &&  <Player id={songId} />}
        </div>
    </div>
  )
}
