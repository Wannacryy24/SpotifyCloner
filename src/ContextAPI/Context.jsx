import { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [loading , setLoading] = useState(false);
    return (
        <TokenContext.Provider value={
            { 
                accessToken, setAccessToken ,
                loading , setLoading,
            }
        }
        >
            {children}
        </TokenContext.Provider>
    );
};