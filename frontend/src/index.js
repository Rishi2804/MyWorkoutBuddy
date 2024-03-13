import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { AuthContextProvider } from './context/AuthContext';
import { TemplateContextProvider } from './context/TemplateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TemplateContextProvider>
        <WorkoutsContextProvider>
          <App />
        </WorkoutsContextProvider>
      </TemplateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
