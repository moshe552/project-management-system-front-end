import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index.css";
import { ProjectsContextProvider } from './context/projectContext';
import { UsersContextProvider } from './context/usersContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ProjectsContextProvider>
      <UsersContextProvider>
        <App />
        </UsersContextProvider>
      </ProjectsContextProvider>
  </React.StrictMode>,
)
