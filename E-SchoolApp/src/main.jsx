import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NotificationProvider } from './context/NotificationContext'
import { NavigationProvider } from './context/NavigationContext'
import { UserDetailContextProvider } from './context/UserDetailContext'
import { ClassContextProvider } from './context/ClassContext'


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