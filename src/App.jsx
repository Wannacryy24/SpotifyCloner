import Header from "./Header/Header";
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from "./Sidebar/Sidebar";
import Login from "./Login/Login";
import { useEffect, useState } from "react";
import Testing from "./Testing";

export default function App(){
 

  return(
    <>
    <Header/>
    <Sidebar/>
    {/* <Login/> */}
    <Testing/>
    </>
  )
}

//Clientid = 10365053c8d0421e89557a459da18b5e
//secretid = af68b99be77f4206932332b7f6b24929


// curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" \
// -H "Authorization: Bearer  BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11"
