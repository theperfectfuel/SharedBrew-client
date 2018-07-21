import React from 'react';
import {connect} from 'react-redux';
import Login from './Login';
import {Link, Redirect} from 'react-router-dom';

export function Home(props) {

    const homeStyle = {
        minHeight: '380px',
        maxWidth: '700px',
        margin: '0 auto'
    }

    // If logged in redirect to recipe list page
    if (props.loggedIn) {
        return <Redirect to="/list-recipes" />;
    }

    return(
        <div style={homeStyle}>
            <h2>Welcome!</h2>
            <h4>SharedBrew is a place to discover new beer recipes, make quick 
                and easy shopping lists for new batches and make some connections 
                with other home brewers.
            </h4>
            <h4>Start by signing up. Then create a new recipe or just search through 
                the existing library of brew recipes already here.
            </h4>
            <h4>
                When you find a recipe you want to try, make sure you're logged in, and then 
                create a new shopping list from the link on the recipe.
            </h4>
            <Login />
            <hr />
            <Link to="/register">Or Register Here</Link>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);