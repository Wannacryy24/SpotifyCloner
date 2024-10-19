import Header from "./Header/Header";
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from "./Sidebar/Sidebar";
import { TokenContext } from "./ContextAPI/Context";
import { useContext, useEffect } from "react";

export default function App(){
  const {accessToken ,setAccessToken , loading , setLoading } = useContext(TokenContext);
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
          // console.log('Access Token Granted');
      }
      catch (error) {
          console.error('Error fetching the token:', error);
      }
      };
      fetchToken();
  },[]);
  return(
    <>
      <Header/>
      <Sidebar/>
      <iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/2ti7YkSbhIxVMm4rtA7iLA?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
    </>
  )
}

//Clientid = 10365053c8d0421e89557a459da18b5e
//secretid = af68b99be77f4206932332b7f6b24929


// curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" \
// -H "Authorization: Bearer  BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11"
