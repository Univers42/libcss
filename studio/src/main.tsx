import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Side-effect: registers all component entries in the studio registry
import './entries';

import './App.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
