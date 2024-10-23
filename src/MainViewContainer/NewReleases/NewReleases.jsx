import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../ContextAPI/Context';
import './NewReleases.css';
import SongsList from '../../SongsList/SongsList';
import { useNavigate, useParams } from 'react-router';
import Player from '../../Player/Player';

export default function NewReleases() {
  const { accessToken, searchQuery, searchResults, setSearchResults ,playSong , setPlaySong,
    songId , setSongId} = useContext(TokenContext); 
  const [loading, setLoading] = useState(true);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAlbumSongs, setSelectedAlbumSongs] = useState(null);
  const navigate  = useNavigate();
  
  
  useEffect(() => {
    const fetchNewReleases = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error(`Album fetch error: ${response.status}`);
        }
        const data = await response.json();
        setNewReleasesData(data.albums.items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNewReleases();
  }, [accessToken]);


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


  const fetchAlbumSongs =  (albumId) => {
    navigate(`/tracks/${albumId}`);
  };

  const handlePlaySong = (id) => {
    console.log('Id',id);
    setSongId(id);
    setPlaySong(true);
  }

  return (
    <div className="new-releases">
      {searchQuery ? searchResults.length > 0 && (
          <div className="search-results">
          <div className="track-list">
            {searchResults.map((track) => (
              <div key={track.id} className="track" onClick={()=>handlePlaySong(track.id)}>
                <img src={track.album.images[0].url} alt={track.name} />
                <h3>{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            ))}
            {
                playSong && 
                    <Player id={songId} />
            }
          </div>
        </div>
      ):
      (
          <div className="album-container">
      <h1>New Releases</h1>
        {newReleasesData.length > 0 ? (
          newReleasesData.map((album) => (
            <div key={album.id} className="album" onClick={() => fetchAlbumSongs(album.id)}>
              <img src={album.images[0].url} alt={album.name} />
              <h3>{album.name}</h3>
              <p>{album.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          ))
        ) : (
            <div>No new releases found.</div>
        )}
      </div>
    )
    }
      
     
    </div>
  );
}
