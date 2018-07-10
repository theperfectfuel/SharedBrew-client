import { FETCH_USER } from './types';
import axios from 'axios';

export const fetchUser = () => (dispatch) => {
    axios.get('/check-user')
        .then(user => {
            dispatch({ type: FETCH_USER, payload: user.data });
        });
};