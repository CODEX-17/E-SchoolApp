import { createContext, useState, ReactNode } from "react";
import { Routes } from "../types/types";

export interface NavigationContextType {
  currentRoute: Routes | null;
  setCurrentRoute: React.Dispatch<React.SetStateAction<Routes | null>>;
}

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationContext = createContext<NavigationContextType | null>(
  null
);

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [currentRoute, setCurrentRoute] = useState<Routes | null>(
    "classPage" as Routes
  );

  return (
    <NavigationContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </NavigationContext.Provider>
  );
};
