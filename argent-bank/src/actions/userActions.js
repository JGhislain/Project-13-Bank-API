import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    // Récupère le token JWT depuis l'état d'authentification
    const token = getState().auth.user.token;
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        // Ajoute le token dans les en-têtes de la requête
        Authorization: `Bearer ${token}`,
      },
    });
    // En cas de succès, envoie une action de type 'FETCH_PROFILE_SUCCESS' avec les données de la réponse
    dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    // En cas d'échec, envoie une action de type 'FETCH_PROFILE_FAILURE' avec l'erreur
    dispatch({ type: 'FETCH_PROFILE_FAILURE', error });
  }
};

// Action asynchrone pour mettre à jour le profil utilisateur
export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    // Récupère le token JWT depuis l'état d'authentification
    const token = getState().auth.user.token;
    const response = await axios.put(`${API_URL}/user/profile`, profileData, {
      headers: {
        // Ajoute le token dans les en-têtes de la requête
        Authorization: `Bearer ${token}`,
      },
    });
    // En cas de succès, envoie une action de type 'UPDATE_PROFILE_SUCCESS' avec les données de la réponse
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    // En cas d'échec, envoie une action de type 'UPDATE_PROFILE_FAILURE' avec l'erreur
    dispatch({ type: 'UPDATE_PROFILE_FAILURE', error });
  }
};

/*
Lorsque j'utilise Bearer dans l'en-tête du token, je respecte une convention standard pour l'authentification basée sur les tokens. 
Le terme Bearer indique que le client doit présenter un token ("bearer token") pour prouver son identité lorsqu'il effectue des requêtes à des ressources protégées.

Un Bearer Token est un type de jeton d'accès utilisé dans les systèmes d'authentification. 
Ce jeton est généralement émis par un serveur d'authentification et doit être inclus dans les requêtes HTTP pour accéder aux ressources protégées.
Le terme "Bearer" signifie que toute entité possédant le token peut accéder aux ressources protégées associées à ce token. 
Il est donc essentiel de protéger ce token contre les accès non autorisés.

L'en-tête Authorization est utilisé pour envoyer des informations d'authentification au serveur. 
Lors de l'utilisation de Bearer Tokens, l'en-tête a le format suivant :

"Authorization: Bearer <token>"

Bearer : Indique le type de token.
<token> : Le jeton d'accès réel qui est utilisé pour prouver l'identité du client.
*/