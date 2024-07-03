// État initial pour le profil utilisateur
const initialState = {
    profile: null,
    error: null,
  };
  
  // Reducer pour gérer les actions liées au profil utilisateur
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PROFILE_SUCCESS':
        // Mise à jour de l'état après la récupération du profil utilisateur
        return {
          ...state,
          profile: action.payload,
          error: null,
        };
      case 'FETCH_PROFILE_FAILURE':
        // Mise à jour de l'état en cas d'échec de la récupération du profil utilisateur
        return {
          ...state,
          error: action.error,
        };
      case 'UPDATE_PROFILE_SUCCESS':
        // Mise à jour de l'état après la modification du profil utilisateur
        return {
          ...state,
          profile: action.payload,
          error: null,
        };
      case 'UPDATE_PROFILE_FAILURE':
        // Mise à jour de l'état en cas d'échec de la modification du profil utilisateur
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;