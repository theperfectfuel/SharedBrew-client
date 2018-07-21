import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Register from './Register';

export function RegisterPage(props) {
    // If logged in (which happens automatically when registration
    // is successful) redirect to recipe list page
    if (props.loggedIn) {
        return <Redirect to="/list-recipes" />;
    }
    return (
        <div className="home">
            <h2>Register for Shared Brew</h2>
            <Register />
            <Link to="/">Login</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegisterPage);