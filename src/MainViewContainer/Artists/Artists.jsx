import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../ContextAPI/Context';
import './Artist.css'
import { useNavigate } from 'react-router';
export default function Artists() {
    const { accessToken} = useContext(TokenContext);
    const [artistData , setArtistData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchArtist = async ()=> {
            if (!accessToken) return;
            const artistIds = '1wRPtKGflJrBx9BmLsSwlU,7uIbLdzzSEqnX0Pkrb56cR,4fEkbug6kZzzJ8eYX6Kbbp,6DARBhWbfcS9E4yJzcliqQ,1SJOL9HJ08YOn92lFcYf8a,0oOet2f43PA68X5RxKobEy';
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
            console.log(data.artists);
            setArtistData(data.artists);
            }
            catch{
                setError(error);
            }
        }
        fetchArtist();
    },[accessToken]);

    const fetchArtistDetails = (artistId)=>{
        navigate(`/artist/${artistId}`);
    }

    return (
    <>
        <div className='artists-container'>
            <h1>
                Artists
            </h1>
            <div className='artists-div overflow-hidden'>
                {
                    artistData.map((item,index)=>(
                        <div key={item.id} className='artist-single-data-div hoverPointer' onClick={()=>fetchArtistDetails(item.id)}>
                            <img src={item.images[0].url} alt="" />
                            <p className='artist-name-p'>{item.name}</p>
                            <p className='artist-p'>{item.type[0].toUpperCase()+item.type.slice(1)}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

