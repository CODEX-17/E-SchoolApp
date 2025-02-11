import { createContext, useState } from "react";

export const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {

    const [currentRoute, setCurrentRoute] = useState('class')

    return (
        <NavigationContext.Provider value={{ currentRoute, setCurrentRoute }}>
            {children}
        </NavigationContext.Provider>
    )
}