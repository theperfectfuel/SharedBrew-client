//#####################################
//  INDEX.JS FILE FOR ACTIONS DIR
//#####################################

import { FETCH_USER } from './types';
import axios from 'axios';

export const fetchUser = () => (dispatch) => {
    axios.get('https://protected-spire-50393.herokuapp.com/check-user')
        .then(user => {
            dispatch({ type: FETCH_USER, payload: user.data });
        });
};

export const submitRecipe = values => dispatch => {

    // axios.post('http://localhost:8080/new-recipe', values)
    //     .then(user => {
    //         dispatch({ type: FETCH_USER, payload: user.data });
    //     });
    // var xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "http://localhost:8080/new-recipe", true);
    // xhttp.setRequestHeader({'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'});
    // xhttp.send(values);
};