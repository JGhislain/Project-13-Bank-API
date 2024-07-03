import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Combinaison de tous les reducers en un seul reducer principal
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;