import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import HomePage from './components/HomePage';

// Définition des routes de l'application
const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default App;
