import axios from 'axios'
import jwtDecode from 'jwt-decode';
import {createContext} from 'react'
export const TokenContext = createContext(null)

export function TokenContextProvider({children}){
    
    async function getToken(){
        let token = localStorage.getItem('access_token');
        let tokenDecode = jwtDecode(token)
        return tokenDecode ;
    }
    return <TokenContext.Provider value={{getToken}}>
        {children}
    </TokenContext.Provider>
}
