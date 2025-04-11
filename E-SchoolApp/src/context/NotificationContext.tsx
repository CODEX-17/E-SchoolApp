import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";

export interface Notification {
  message: string,
  status: boolean,
}

export interface NotificationContextType {
  notify: ({ message, status }: Notification) => void;
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationContext = createContext<NotificationContextType | null>(null);


export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  
  const notify = ({message, status}: Notification) => {
    
    if (status) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
     })
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,    
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};
