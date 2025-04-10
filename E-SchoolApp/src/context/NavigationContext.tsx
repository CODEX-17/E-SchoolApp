import { createContext, useState, ReactNode } from "react";

interface NavigationContextType {
    currentRoute: string | null;
    setCurrentRoute: React.Dispatch<React.SetStateAction<string | null>>
}

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationContext = createContext<NavigationContextType | null>(null)

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {

    const [currentRoute, setCurrentRoute] = useState<string | null> ('class')

    return (
        <NavigationContext.Provider value={{ currentRoute, setCurrentRoute }}>
            {children}
        </NavigationContext.Provider>
    )
}