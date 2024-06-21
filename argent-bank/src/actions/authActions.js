import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', error });
  }
};

export const logout = () => ({ type: 'LOGOUT' });