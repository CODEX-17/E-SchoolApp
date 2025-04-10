import { createContext, useState, ReactNode } from "react";
import { Class } from '../types/interfaces'

interface ClassContextType {
    currentClass: Class | null;
    setCurrentClass: React.Dispatch<React.SetStateAction<Class | null>>;
}

interface ClassProviderProps {
    children: ReactNode;
}

export const ClassContext = createContext<ClassContextType | null>(null)

export const ClassContextProvider: React.FC<ClassProviderProps> = ({ children }) => {

    const [currentClass, setCurrentClass] = useState<Class | null>(null)

    return (
        <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
            {children}
        </ClassContext.Provider>
    )
}