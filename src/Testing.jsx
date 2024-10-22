import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from './ContextAPI/Context';

export default function Testing() {
  
    const {accessToken ,setAccessToken , loading , setLoading } = useContext(TokenContext);
   
  useEffect(()=>{
   const ids=`2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6`;
    const url = `https://api.spotify.com/v1/artists?ids=${ids}`;
    const token = accessToken;
 
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
  },[])
  return (
    <>
       <h1>Testing</h1>
    </>
  )
}