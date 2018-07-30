import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from '../config';
import { 
    withStyles, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Grid 
} from '../../node_modules/@material-ui/core';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        minHeight: '170px',
        fontSize: '16px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
  });

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    componentDidMount() {

        fetch(`${API_BASE_URL}/list-recipes`)
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

        const { classes } = this.props;

        const recipeListStyle = {
            padding: '0',
            fontSize: '18px'
        };

        const recipes = this.state.recipes.map((recipe, index) => {
            console.log(recipe._id)
            return ( 
                <Grid item  xs={12} sm={6} md={3} key={recipe._id}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={`https://source.unsplash.com/collection/2391947/${index}`}
                            title="Beer in various ways"
                        />
                        <CardContent>
                        <div>
                            <Link to={'/list-recipes/' + recipe._id}>Name: {recipe.beer_name}</Link><br />
                        </div>
                        <div>
                            <p>
                            ABV: {recipe.beer_abv}%<br />
                            Style: {recipe.beer_style}<br />
                            Difficulty: {recipe.brew_difficulty}<br />
                            IBU: {recipe.beer_ibu}<br />
                            SRM: {recipe.beer_srm}
                            </p>
                        </div>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
        console.log('recipes', this.state.recipes);

        return (
            <div className={classes.root}>
                <h2>Beer Recipes</h2>
                <Grid container className={classes.paper} spacing={24}>
                    {recipes}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(RecipeContainer);