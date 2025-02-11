import { createContext, useState } from "react";


export const UserDetailContext = createContext()

export const UserDetailContextProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('user')))

    return (
        <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailContext.Provider>
    )
}