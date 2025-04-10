import { createContext, useState, ReactNode } from "react";

export interface Class {
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