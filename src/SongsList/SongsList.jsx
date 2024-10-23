import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../ContextAPI/Context';
import './SongsList.css'; 
import { useParams } from 'react-router-dom';

export default function Songslist(){
    const {trackId} = useParams();
    const {accessToken , playUri ,  setPlayUri,} = useContext(TokenContext);
    const [playSong , setPlaySong] = useState(false);
    const [selectedAlbumSongs, setSelectedAlbumSongs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {    
        const fetchAlbumSongs = async () => {
            console.log(`Fetching songs for album ID: ${trackId}`); // Log the album ID
            console.log(`Access Token: ${accessToken}`); 
            try {
                const response = await fetch(`https://api.spotify.com/v1/albums/${trackId}/tracks`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Songs fetching error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setSelectedAlbumSongs(data.items);
            } catch (error) {
                setError(error.message);
            }
        };
        if (trackId) {
            fetchAlbumSongs();
        }
    }, [trackId, accessToken]);

    const handlePlaySong = (data)=>{
        console.log(data.uri);
        setPlaySong(true);
        setPlayUri(data.uri);  
    }

    return (
        <div className="songlist-container">
            <h2 className="album-title">Album Songs</h2>
            <table className="songlist">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist(s)</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedAlbumSongs.map((song, index)=>(
                        <tr key={song.id} onClick={()=>handlePlaySong(song)}>
                            <td>{index + 1}</td>
                            <td>{song.name}</td>
                            <td>{song.artists.map(artist => artist.name).join(', ')}</td>
                            <td>{song.duration_ms}</td>
                        </tr>
                    ))}
                </tbody>
            </table>  
            {
            playSong && 
                <iframe
                    title="Spotify Embed: Specific Song"
                    src={`https://open.spotify.com/embed/track/${playUri.split(':')[2]}?utm_source=generator&theme=0`} // Get track ID
                    width="100%"
                    height="100%"
                    style={{ minHeight: '360px' }}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            }    
        </div>
    );
};