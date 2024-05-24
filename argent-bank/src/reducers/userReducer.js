const initialState = {
    profile: null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PROFILE_SUCCESS':
        return {
          ...state,
          profile: action.payload,
          error: null,
        };
      case 'FETCH_PROFILE_FAILURE':
        return {
          ...state,
          error: action.error,
        };
      case 'UPDATE_PROFILE_SUCCESS':
        return {
          ...state,
          profile: action.payload,
          error: null,
        };
      case 'UPDATE_PROFILE_FAILURE':
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;