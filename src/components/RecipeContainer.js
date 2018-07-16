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
            this.setState({
                recipes: data
            })
          })

      }

    render() {

        const recipeListStyle = {
            padding: '0',
            fontSize: '18px'
        };

        const recipes = this.state.recipes.map((recipe) => {
            console.log(recipe._id)
            return <li key={recipe._id}>
                    <div>
                        <Link to={'/list-recipes/' + recipe._id}>Name: {recipe.beer_name}</Link><br />
                    </div>
                    <div>
                    <p>
                    ABV: {recipe.beer_abv}<br />
                    Style: {recipe.beer_style}<br />
                    Difficulty: {recipe.brew_difficulty}<br />
                    IBU: {recipe.beer_ibu}<br />
                    SRM: {recipe.beer_srm}
                    </p>
                    </div>
                </li>
        });
        console.log('recipes', this.state.recipes);

        return (
            <div>
                <h2>Beer Recipes</h2>
                <ul style={recipeListStyle}>
                    {recipes}
                </ul>
            </div>
        );
    }
}

export default RecipeContainer;