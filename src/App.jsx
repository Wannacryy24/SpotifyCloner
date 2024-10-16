import Header from "./Header/Header";
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from "./Sidebar/Sidebar";
import Login from "./Login/Login";
import { useEffect, useState } from "react";

export default function App(){
  const [accessToken ,setAccessToken]= useState('');
  useEffect(()=>{
    const client_id = `10365053c8d0421e89557a459da18b5e`;
    const secret_id = `af68b99be77f4206932332b7f6b24929`;

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${secret_id}`
    })
    .then(response => response.json())
    .then(data => {
      setAccessToken(data.access_token);
    })
    .catch(error => {
      console.error('Error fetching the token:', error);
    });
  }, []);
  
  if(accessToken){

    fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }).then(res=>res.json())
    .then(data=>console.log(data)
  )
}
  
  return(
    <>
    <Header/>
    <Sidebar/>
    <Login/>
    </>
  )
}

//Clientid = 10365053c8d0421e89557a459da18b5e
//secretid = af68b99be77f4206932332b7f6b24929


// curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" \
// -H "Authorization: Bearer  BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11"
