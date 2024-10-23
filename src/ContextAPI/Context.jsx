import { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [loading , setLoading] = useState(false);
    const [playUri ,  setPlayUri] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 
    const [searchResults, setSearchResults] = useState([]);
    const [playSong , setPlaySong] = useState(false);
    const [songId , setSongId] =  useState('');  
  
    return (
        <TokenContext.Provider value={
            { 
                accessToken, setAccessToken ,
                loading , setLoading,
                playUri ,  setPlayUri,
                searchQuery, setSearchQuery, 
                searchResults, setSearchResults,  
                playSong , setPlaySong,
                songId , setSongId
            }
        }
        >
            {children}
        </TokenContext.Provider>
    );
};