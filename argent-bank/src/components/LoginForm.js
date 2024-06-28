import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';

// Composant représentant la page de connexion
const LoginForm = () => {
  // État pour l'email de l'utilisateur
  const [email, setEmail] = useState('');
  // État pour le mot de passe de l'utilisateur
  const [password, setPassword] = useState('');
  // Envoyer des actions Redux
  const dispatch = useDispatch();
  // Naviguer vers d'autres pages
  const navigate = useNavigate();
  // Récupère l'état de l'authentification
  const { status, error } = useSelector((state) => state.auth);

  // Gère la soumission du formulaire de connexion
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(() => {
      // Redirige vers la page de profil après connexion réussie
      navigate('/profile');
    });
  };

  return (
    <main className="main bg-dark">
      {/* Barre de navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>

      {/* Formulaire de connexion */}
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" disabled={status === 'loading'}>
            {/* Affiche un message de chargement pendant la connexion */}
            {status === 'loading' ? 'Signing In...' : 'Sign In'}
          </button>
          {/* Affiche un message d'erreur en cas d'échec */}
          {status === 'failed' && <p className="error">{error}</p>}
        </form>
      </section>

      {/* Pied de page */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </main>
  );
};

export default LoginForm;