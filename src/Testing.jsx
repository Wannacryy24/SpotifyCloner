import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from './ContextAPI/Context';

export default function Testing() {
    const {accessToken ,setAccessToken} = useContext(TokenContext);
    const [albumData , setAlbumData] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
      const client_id = `10365053c8d0421e89557a459da18b5e`;
      const secret_id = `af68b99be77f4206932332b7f6b24929`;
  
     const fetchToken = async ()=>{ 
     try{
         const response = await fetch('https://accounts.spotify.com/api/token', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${secret_id}`
            });
            if (!response.ok) {
                throw new Error(`Token fetch error: ${response.status}`);
            }
            const data = await response.json();
            setAccessToken(data.access_token);
            console.log('Access Token Granted');
        }
        catch (error) {
            console.error('Error fetching the token:', error);
        }
        };
        fetchToken();
    },[]);

    //changes in App.jsx
    //third change in same line 
  

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
                console.log(data.albums);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchAlbums();
    }, [accessToken]);

  return (
    <>
        <div>{loading && <img src={albumData[0].images[0].url} alt="" />}</div>
        <div>{loading && <img src={albumData[1].images[0].url} alt="" />}</div>
        <div>{loading && <img src={albumData[2].images[0].url} alt="" />}</div>
    </>
  )
}









//     if(accessToken){
  
//       fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${accessToken}`
//         }
//       }).then(res=>res.json())
//       .then(data=>console.log(data)
//     )
//   }

