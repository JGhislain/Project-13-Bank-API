// État initial de l'authentification
const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };
  
  // Reducer pour gérer les actions d'authentification
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        // Mise à jour de l'état après une connexion réussie
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          error: null,
        };
      case 'LOGIN_FAILURE':
        // Mise à jour de l'état en cas d'échec de la connexion
        return {
          ...state,
          error: action.error,
        };
      case 'LOGOUT':
        // Réinitialisation de l'état après la déconnexion
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;