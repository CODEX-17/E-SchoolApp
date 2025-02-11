import { createContext, useState } from "react";

export const ClassContext = createContext()

export const ClassContextProvider = ({ children }) => {

    const [currentClass, setCurrentClass] = useState('class')

    return (
        <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
            {children}
        </ClassContext.Provider>
    )
}