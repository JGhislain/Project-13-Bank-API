import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

// Action asynchrone pour la connexion utilisateur
export const login = (credentials) => async (dispatch) => {
  try {
    // Envoie une requête POST à l'API pour la connexion de l'utilisateur
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    // En cas de succès, envoie une action de type 'LOGIN_SUCCESS' avec les données de la réponse
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    // En cas d'échec, envoie une action de type 'LOGIN_FAILURE' avec l'erreur
    dispatch({ type: 'LOGIN_FAILURE', error });
  }
};

// Action pour la déconnexion utilisateur
export const logout = () => ({ type: 'LOGOUT' });