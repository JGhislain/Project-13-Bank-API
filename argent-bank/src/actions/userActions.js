import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PROFILE_FAILURE', error });
  }
};

export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;
    const response = await axios.put(`${API_URL}/user/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PROFILE_FAILURE', error });
  }
};