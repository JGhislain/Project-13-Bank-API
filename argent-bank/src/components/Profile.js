import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
// Import de l'action updateUserProfile
import { fetchUserProfile, updateUserProfile } from '../redux/profileSlice';

// Composant représentant la page de profil utilisateur
const Profile = () => {

  // Envoyer des actions Redux
  const dispatch = useDispatch();
  // Naviguer vers d'autres pages
  const navigate = useNavigate();
  // Récupère l'état d'authentification de l'utilisateur
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // Récupère l'état du profil utilisateur
  const { profile, status, error } = useSelector((state) => state.profile);

  // État pour le mode édition du profil
  const [editMode, setEditMode] = useState(false);
  // État pour le prénom de l'utilisateur
  const [firstName, setFirstName] = useState('');
  // État pour le nom de famille de l'utilisateur
  const [lastName, setLastName] = useState('');

  // Effet pour récupérer le profil utilisateur si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    } else {
      // Redirige vers la page de connexion si non authentifié
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Effet pour mettre à jour les champs du formulaire avec les données du profil utilisateur
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  // Passe en mode édition
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Enregistre les modifications du profil utilisateur
  const handleSaveClick = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
    setEditMode(false);
  };

  // Déconnecte l'utilisateur et redirige vers la page d'accueil
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Affiche un message de chargement si le profil est en cours de récupération
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Affiche un message d'erreur en cas d'échec de récupération du profil
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="main bg-dark">
      {/* Barre de navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {user?.email}
          </Link>
          <button className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Contenu du profil */}
      <div className="header">
        <h1>Welcome back<br />{profile?.firstName} {profile?.lastName}!</h1>
        {/* Si le mode édition est activé, affiche les champs de saisie pour le prénom et le nom */}
        {editMode ? (
          <div>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <button className="save-button" onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          // Si le mode édition n'est pas activé, affiche le bouton pour passer en mode édition
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

      {/* Sections des comptes */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </main>
  );
};

export default Profile;