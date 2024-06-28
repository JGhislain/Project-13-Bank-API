import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

// Thunk pour récupérer le profil utilisateur (Utile pour Profile.js)
export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async (_, { getState }) => {
  // Récupère le token JWT depuis l'état de l'authentification
  const token = getState().auth.token;
  const response = await axios.post(`${API_URL}/user/profile`, {}, {
    headers: {
      // Ajoute le token dans les en-têtes de la requête
      Authorization: `Bearer ${token}`,
    },
  });
  // Retourne les données de la réponse si la requête est réussie
  return response.data;
});

// Thunk pour mettre à jour le profil utilisateur (Utile pour Profile.js)
export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (userData, { getState }) => {
  // Récupère le token JWT depuis l'état de l'authentification
  const token = getState().auth.token;
  const response = await axios.put(`${API_URL}/user/profile`, userData, {
    headers: {
      // Ajoute le token dans les en-têtes de la requête
      Authorization: `Bearer ${token}`,
    },
  });
  // Retourne les données de la réponse si la requête est réussie
  return response.data;
});

// Création du slice de profil utilisateur
const profileSlice = createSlice({
  // Nom du slice
  name: 'profile',
  initialState: {
    // Informations du profil utilisateur
    profile: null,
    // Statut de la requête (idle, loading, succeeded, failed)
    status: 'idle',
    // Message d'erreur
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        // Définit le statut à 'loading' lorsque la requête de récupération du profil est en cours
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        // Définit le statut à 'succeeded' lorsque la requête est réussie
        state.status = 'succeeded';
        // Stocke les données du profil utilisateur
        state.profile = action.payload.body;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        // Définit le statut à 'failed' lorsque la requête échoue
        state.status = 'failed';
        // Stocke le message d'erreur
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        // Définit le statut à 'loading' lorsque la requête de mise à jour du profil est en cours
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // Définit le statut à 'succeeded' lorsque la requête est réussie
        state.status = 'succeeded';
        // Met à jour les données du profil utilisateur
        state.profile = action.payload.body;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        // Définit le statut à 'failed' lorsque la requête échoue
        state.status = 'failed';
        // Stocke le message d'erreur
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;


/*
Exemple de Réponse de l'API pour le Profil Utilisateur

Lorsque je récupére le profil utilisateur via l'API, la réponse est structurée comme suit :

{
  "status": 200,
  "message": "User profile fetched successfully",
  "body": {
    "firstName": "Tony",
    "lastName": "Stark",
    "email": "tony@stark.com"
  }
}

L'utilisation de action.payload.body pour stocker les données du profil utilisateur et le token JWT dans authSlice est due à la structure de la réponse API. 
Dans les deux cas, les informations importantes sont encapsulées dans un objet body. 
Cette convention permet de garder une structure de réponse cohérente et facile à gérer dans le code.
*/