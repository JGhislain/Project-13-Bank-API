import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';

// Configurer le store Redux avec le slice d'authentification et de profil utilisateur
const store = configureStore({
    reducer: {
      // Slice pour gérer l'état de l'authentification
      auth: authReducer,
      // Slice pour gérer l'état du profil utilisateur
      profile: profileReducer,
    },
  });
  
  export default store;