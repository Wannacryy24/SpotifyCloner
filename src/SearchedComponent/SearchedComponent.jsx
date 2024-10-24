import React, { useContext, useEffect } from 'react'
import { TokenContext } from '../ContextAPI/Context';
import { useNavigate } from 'react-router';

export default function SearchedComponent() {
    const { accessToken, searchQuery, searchResults, setSearchResults ,playSong , setPlaySong,
        songId , setSongId} = useContext(TokenContext); 
    const navigate  = useNavigate();
        const handlePlaySong = (id) => {
            navigate(`/song/${id}`);
            console.log('Id',id);
            // setSongId(id);
            // setPlaySong(true);
          }
        
  useEffect(() => {
    const handleSearch = async () => {
      if (!accessToken) return;
      if (searchQuery.trim() === "") {
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
        console.log(data.tracks.items);
        setSearchResults(data.tracks.items);
      } catch (error) {
        setError(error.message);
      }
    };
    handleSearch();
  }, [searchQuery, accessToken, setSearchResults]); 

  return (
    <div className="search-results content">
        <div className="track-list">
            {searchResults.map((track) => (
              <div key={track.id} className="track" onClick={()=>handlePlaySong(track.id)}>
                <img src={track.album.images[0].url} alt={track.name} />
                <h3>{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            ))}
            {playSong &&  <Player id={songId} />}
        </div>
    </div>
  )
}
