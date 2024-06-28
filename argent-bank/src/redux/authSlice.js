import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

// Thunk pour la connexion
/*Un thunk est une fonction qui encapsule une opération asynchrone (comme une requête HTTP) 
et permet de dispatcher d'autres actions avant et après cette opération asynchrone.*/
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    // Envoie une requête POST à l'API pour la connexion de l'utilisateur
    const response = await axios.post(`${API_URL}/user/login`, userData);
    // Retourne les données de la réponse si la requête est réussie
    return response.data;
  } catch (error) {
    // Gère les erreurs et retourne un message d'erreur approprié
    if (error.response && error.response.data) {
      // Renvoie les données de l'erreur de la réponse
      return rejectWithValue(error.response.data);
    }
    // Renvoie le message d'erreur générique
    return rejectWithValue(error.message);
  }
});

// Création du slice d'authentification
const authSlice = createSlice({
  // Nom du slice
  name: 'auth',
  initialState: {
    // Informations de l'utilisateur
    user: null,
    // Token JWT de l'utilisateur
    token: null,
    // État d'authentification
    isAuthenticated: false,
    // Statut de la requête (idle, loading, succeeded, failed)
    /*Le statut idle indique que l'état de la requête est inactif ou en attente d'une action. 
    C'est l'état initial avant qu'une action asynchrone ne soit déclenchée.*/
    status: 'idle',
    // Message d'erreur
    error: null,
  },
  reducers: {
    // Réducteur pour la déconnexion
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Réinitialise l'état d'authentification
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // Définit le statut à 'loading' lorsque la requête de connexion est en cours
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Définit le statut à 'succeeded' lorsque la requête est réussie
        state.status = 'succeeded';
        // Stocke le token JWT
        /*JWT = JSON Web Token. Standard ouvert (RFC 7519) qui permet de représenter 
        de manière sécurisée des informations échangées entre deux parties sous forme de JSON.*/
        state.token = action.payload.body.token;
        // Met à jour l'état d'authentification
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Définit le statut à 'failed' lorsque la requête échoue
        state.status = 'failed';
        // Stocke le message d'erreur et renvoie le message vers LoginForm.js
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


/*
Utilisation de action.payload.body pour Stocker le Token
J'ai déterminé qu'il fallait utiliser action.payload.body pour stocker le token en analysant la structure de la réponse API. Voici comment j'ai procédé :

Analyse de la Réponse API :

Lors de l'appel de l'API de connexion (/user/login), l'API retourne une réponse structurée de manière spécifique.
En utilisant l'outil Postman, j'ai pu voir que la réponse avait une structure où le token était encapsulé dans un objet body.

Structure de la Réponse :

La réponse de l'API ressemble à ceci :

{
  "status": 200,
  "message": "User successfully logged in",
  "body": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
Pour accéder au token, il faut donc naviguer dans action.payload.body.token.

//////////////////

Structure d'un JWT
Un JWT est composé de trois parties séparées par des points (.) :

Header : Contient des informations sur le type de token et l'algorithme de signature.
Payload : Contient les revendications (informations) du token.
Signature : Assure que le token n'a pas été modifié.

Exemple :
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Payload : eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
Signature : SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
*/