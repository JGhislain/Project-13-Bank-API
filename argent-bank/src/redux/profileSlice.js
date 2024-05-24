import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(`${API_URL}/user/profile`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.body;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Exporter le reducer par défaut
export default profileSlice.reducer;
