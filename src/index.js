import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import Pokedex from './pokedex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Pokedex />
  </React.StrictMode>
);
