import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../ContextAPI/Context';
import './NewReleases.css';
import { useNavigate} from 'react-router';

export default function NewReleases() {
  
  const { accessToken} = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [error, setError] = useState(null);
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

  const fetchAlbumSongs = (albumId) => {
    navigate(`/tracks/${albumId}`);
  };

  return ( 
    <div className="new-releases">
      <h1>New Releases</h1>
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