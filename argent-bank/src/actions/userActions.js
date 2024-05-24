import axios from 'axios';

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;
    const response = await axios.get('URL_DE_L_API/user/profile', {
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
    const response = await axios.put('URL_DE_L_API/user/profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PROFILE_FAILURE', error });
  }
};