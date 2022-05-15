import {useEffect ,createContext, useState} from "react";

export const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({
        currentUser: JSON.parse(localStorage.getItem('user')) || null
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser.currentUser))
    }, [currentUser.currentUser])

    return <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </AuthContext.Provider>
}