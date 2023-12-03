/* Se importar los recursos necesarios */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './routes/Routes';

/* Creamos las rutas de navegación usando root como contenedor */
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
  );