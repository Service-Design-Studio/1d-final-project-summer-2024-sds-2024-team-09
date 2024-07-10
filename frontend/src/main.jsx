import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Ensure this matches the new extension
import './index.css';


const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
