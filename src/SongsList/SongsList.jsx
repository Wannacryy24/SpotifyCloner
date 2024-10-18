import { useContext, useState } from 'react';
import { TokenContext } from '../ContextAPI/Context';
import './SongsList.css'; 
import SpotifyPlayer from 'react-spotify-web-playback';
export default function Songslist({songs}){
    const {accessToken , playUri ,  setPlayUri,} = useContext(TokenContext);
    const [playSong , setPlaySong] = useState(false);
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
                    {songs.map((song, index)=>(
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
                <SpotifyPlayer
            token={`${accessToken}`}
            uris={playUri}
            />
            }
        </div>
    );
};