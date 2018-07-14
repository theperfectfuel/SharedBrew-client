import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import RecipeContainer from './RecipeContainer';
import ShoppingListContainer from './ShoppingListContainer';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Recipe from './Recipe';
import NewRecipe from './recipeForm/NewRecipe';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
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
          <Route exact path="/" component={Home} />
          <Route path="/list-recipes/:recipeId" component={Recipe} />
          <Route exact path="/new-recipe" component={NewRecipe} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(App));
