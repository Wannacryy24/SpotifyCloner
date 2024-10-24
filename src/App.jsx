import Header from "./Header/Header";
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from "./Sidebar/Sidebar";
import { TokenContext } from "./ContextAPI/Context";
import { useContext, useEffect} from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Songslist from "./SongsList/SongsList";
import RightSideContent from "./RightSideContent/RightSideContent";
import Player from "./Player/Player";
import SearchedComponent from "./SearchedComponent/SearchedComponent";

export default function App(){
  const {setAccessToken ,setSearchQuery} = useContext(TokenContext);
  
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
        <Router>
            <Header/>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<RightSideContent/>}/>
                <Route path="/tracks/:trackId" element={<Songslist/>}/>
                <Route path='/song/:id' element={<Player/>}/>
                <Route path="/search/:searchInput" element={<SearchedComponent/>} />
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </Router>
    </>
  )
}