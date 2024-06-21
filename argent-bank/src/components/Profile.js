import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { fetchUserProfile, updateUserProfile } from '../redux/profileSlice'; // Import de l'action updateUserProfile

// Composant représentant la page de profil utilisateur
const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { profile, status, error } = useSelector((state) => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    } else {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

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
        {editMode ? (
          <div>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <button className="save-button" onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
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