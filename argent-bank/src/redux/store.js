import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';

// Configurer le store Redux avec le slice d'authentification
const store = configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
    },
  });
  
  export default store;