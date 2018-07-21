import { combineReducers } from 'redux';
import authReducer from './authReducer';
import protectedDataReducer from './protected-data';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ 
    auth: authReducer,
    form: formReducer,
    protectedData: protectedDataReducer
});