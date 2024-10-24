import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../ContextAPI/Context';
import { Skeleton } from '@mui/material';
import './Album.css'
export default function AlbumData() {
    const [albumData, setAlbumData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const { accessToken } = useContext(TokenContext);

    useEffect(() => {
        const fetchAlbums = async () => {
            if (!accessToken) return;
            const albumIds = `382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc`;
            try {
                const response = await fetch(`https://api.spotify.com/v1/albums?ids=${albumIds}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Album fetch error: ${response.status}`);
                }
                const data = await response.json();
                setAlbumData(data.albums);
                setLoading(false); 
            } catch (error) {
                setError(error.message);
                setLoading(false); 
            }
        };
        fetchAlbums();
    }, [accessToken]); 

    if (loading) {
        return <Skeleton variant="rect" width={210} height={118} />;
    }

    if (error) {
        return <div>Error fetching albums: {error}</div>; 
    }

    return (
        <>
            <h1>Albums</h1>
            <div className='album-div'>
                {albumData.map((album, index) => (
                    <div key={album.id} className='album-single-holder hoverPointer'>
                        <>
                            <img key={album.id} src={album.images[0]?.url} alt={album.name} />
                            <h3>{album.name}</h3>
                            <p>{album.artists.map(artist => artist.name).join(', ')}</p>
                        </>
                    </div>
                ))}
            </div>
        </>
    );
}

// <div key={album.id} className="album" onClick={() => fetchAlbumSongs(album.id)}>
//               <img src={album.images[0].url} alt={album.name} />
//               <h3>{album.name}</h3>
//               <p>{album.artists.map(artist => artist.name).join(', ')}</p>
//               <button className="play-button">▶</button>
//             </div>