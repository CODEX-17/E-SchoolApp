import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'
import { UserDetailContextProvider } from './context/UserDetailContext.jsx'
import { ClassContextProvider } from './context/ClassContext.jsx'



const rootSelector = document.getElementById('root');
const root = ReactDOM.createRoot(rootSelector);

root.render(
    <React.StrictMode>
      <UserDetailContextProvider>
        <NavigationProvider>
          <NotificationProvider>
            <ClassContextProvider>
              <App />
            </ClassContextProvider>
          </NotificationProvider>
        </NavigationProvider>
      </UserDetailContextProvider>
  </React.StrictMode>,
)