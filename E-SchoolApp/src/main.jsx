import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'


const rootSelector = document.getElementById('root');
const root = ReactDOM.createRoot(rootSelector);

root.render(
    <React.StrictMode>
      <NavigationProvider>
        <NotificationProvider>
            <App />
        </NotificationProvider>
      </NavigationProvider>
  </React.StrictMode>,
)