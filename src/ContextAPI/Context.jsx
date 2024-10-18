import { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [loading , setLoading] = useState(false);
    const [playUri ,  setPlayUri] = useState('');
    return (
        <TokenContext.Provider value={
            { 
                accessToken, setAccessToken ,
                loading , setLoading,
                playUri ,  setPlayUri,
            }
        }
        >
            {children}
        </TokenContext.Provider>
    );
};