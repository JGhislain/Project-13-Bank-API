import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import HomePage from './components/HomePage';

// Définition des routes de l'application
const App = () => (
  <Routes>
    {/* Route pour la page de connexion */}
    <Route path="/login" element={<LoginForm />} />
    {/* Route pour la page de profil */}
    <Route path="/profile" element={<Profile />} />
    {/* Route pour la page d'accueil */}
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default App;
