import React, { createContext, useState, ReactNode, useEffect } from "react";

export interface UserDetails {
    acctID: string,
    acctype: string,
    email: string,
    password: string,
    firstname: string,
    middlename: string,
    lastname: string,
    status: string,
    fileID: string,
}

interface UserDetailContextType {
    userDetails: UserDetails | null;
    handleSetUserDetails: (value: UserDetails) => void;
}

interface UserDetailProviderProps {
    children: ReactNode;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null)

export const UserDetailContextProvider: React.FC<UserDetailProviderProps> = ({ children }) => {

    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    
    useEffect(() => {

        const oldData = localStorage.getItem('user')

        if (oldData) {
            setUserDetails(JSON.parse(oldData))
        }

    },[])

    const handleSetUserDetails = (value: UserDetails) => {
        if (!value) return
        setUserDetails(value)
        localStorage.setItem('user', JSON.stringify(value))
    }

    return (
        <UserDetailContext.Provider value={{ userDetails, handleSetUserDetails }}>
            {children}
        </UserDetailContext.Provider>
    )
}