import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../ContextAPI/Context';
import './NewReleases.css';
import SongsList from '../../SongsList/SongsList';

export default function NewReleases() {
  const { accessToken, searchQuery, searchResults, setSearchResults } = useContext(TokenContext); 
  const [loading, setLoading] = useState(true);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAlbumSongs, setSelectedAlbumSongs] = useState(null);

        const {query} = useParams();
        
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
        setSearchResults(data.tracks.items);
      } catch (error) {
        setError(error.message);
      }
    };
    handleSearch();
  }, [searchQuery, accessToken, setSearchResults]); 

  const fetchAlbumSongs = async (albumId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Songs fetching error: ${response.status}`);
      }
      const data = await response.json();
      setSelectedAlbumSongs(data.items);
    } catch (error) {
      setError(error.message);
    }
  };

  if (selectedAlbumSongs) {
    return (
      <div className="content">
        <SongsList songs={selectedAlbumSongs} />
      </div>
    );
  }

  return (
    <div className="new-releases">
      <h1>New Releases</h1>

      {searchQuery && searchResults.length > 0 && (
        <div className="search-results">
          <div className="track-list">
            {searchResults.map((track) => (
              <div key={track.id} className="track">
                <img src={track.album.images[0].url} alt={track.name} />
                <h3>{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

     {/* new releases results container*/}
      <div className="album-container">
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
    </div>
  );
}
