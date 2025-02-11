import { createContext, useState } from "react";
import { NotificationContext } from "./NotificationContext";

export const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {

    const { currentRoute, setCurrentRoute } = useState('class')

    return (
        <NotificationContext.Provider value={{ currentRoute, setCurrentRoute }}>
            {children}
        </NotificationContext.Provider>
    )
}