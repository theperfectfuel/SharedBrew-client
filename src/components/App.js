import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import RecipeContainer from './RecipeContainer';
import ShoppingListContainer from './ShoppingListContainer';
import Login from './Login';
import RegisterPage from './RegisterPage';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Recipe from './Recipe';
import NewRecipe from './recipeForm/NewRecipe';
import ShoppingList from './ShoppingList';

import {refreshAuthToken} from '../actions/auth';

class App extends Component {

  // componentDidMount() {
  //   this.props.fetchUser();
  // }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
      if (!this.refreshInterval) {
          return;
      }

      clearInterval(this.refreshInterval);
  }

  render() {

    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="App">
          <Route exact path="/list-recipes" component={RecipeContainer} />
          <Route exact path="/list-shopping-lists" component={ShoppingListContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/" component={Home} />
          <Route path="/list-recipes/:recipeId" component={Recipe} />
          <Route path="/list-shopping-lists/:shoppingListId" component={ShoppingList} />
          <Route exact path="/new-recipe" component={NewRecipe} />
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps, actions)(App));
