import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    componentDidMount() {

        fetch('http://localhost:8080/list-recipes')
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log('data in cdm', data);
            this.setState({
                recipes: data
            })
          })

      }

    render() {

        const recipes = this.state.recipes.map((list) => {
            console.log(list._id)
            return <li key={list._id}>
                    <div>
                    <Link to={'/list-recipes/' + list._id}>Name: {list.beer_name}</Link><br />
                    ABV: {list.beer_abv}<br />
                    </div>
                    <div>
                    <p>
                    Style: {list.beer_style}<br />
                    Difficulty: {list.brew_difficulty}
                    </p>
                    </div>
                </li>
        });
        console.log('recipes', this.state.recipes);

        return (
            <div>
                <h2>Beer Recipes</h2>
                <ul>
                    {recipes}
                </ul>
            </div>
        );
    }
}

export default RecipeContainer;