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
    </>
  )
}