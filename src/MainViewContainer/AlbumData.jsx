import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../ContextAPI/Context';
import { Skeleton } from '@mui/material';

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
        <div className='testing-div'>
            <h1>Albums</h1>
            <div>
                {albumData.map((album, index) => (
                    <img key={album.id} src={album.images[0]?.url} alt={album.name} />
                ))}
            </div>
        </div>
    );
}
