import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../ContextAPI/Context';
import { Skeleton } from '@mui/material';

export default function AlbumData() {
  const [albumData , setAlbumData] = useState([]);
  const {accessToken ,setAccessToken , loading , setLoading } = useContext(TokenContext);
  useEffect(()=>{
    const fetchAlbums = async ()=>{
        if (!accessToken) return;
        const albumIds = `382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc`;
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums?ids=${albumIds}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Album fetch error: ${response.status}`);
            }
            const data = await response.json();
            setAlbumData(data.albums);
            setLoading(true);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };
    fetchAlbums();
}, [accessToken]);

  return (
    <>
    {
            loading ? (
                <div className='testing-div'>
                    <h1>Albums</h1>
                    <div>
                    {loading && <img src={albumData[0].images[0].url} alt="" />}
                    {loading && <img src={albumData[1].images[0].url} alt="" />}
                    {loading && <img src={albumData[2].images[0].url} alt="" />}
                    </div>
                </div>
            )
            :(<Skeleton/>) 
        }
    </>
  )
}
