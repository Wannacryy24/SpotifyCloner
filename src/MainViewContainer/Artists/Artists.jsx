import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../ContextAPI/Context';

export default function Artists() {
    const { accessToken} = useContext(TokenContext);
    const [artistData , setArtistData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchArtist = async ()=> {
            if (!accessToken) return;
            const artistIds = '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6';
            try{
                const getArtistResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                if (!getArtistResponse.ok) {
                    throw new Error(`Album fetch error: ${getArtistResponse.status}`);
                }
            const data = await getArtistResponse.json();
            console.log(data);
            // setArtistData(data);
            }
            catch{
                setError(error);
            }
        }
        fetchArtist();
    },[accessToken])


    return (
    <>
    </>
  )
}

