import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {API_BASE_URL} from '../config';
import { 
    withStyles, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Grid,
    Paper,
    Typography
} from '../../node_modules/@material-ui/core';

// const styles = theme => ({
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,
//   },
// });

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
    borderBottom: {
        borderBottom: '1px solid #ddd'
    }
  });

const sectionStyle = {
    padding: '5px',
    margin: '20px'
}

const instructionsStyle = {
    whiteSpace: 'pre-wrap'
}

var shoppingListURL = '';

class Recipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipe: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.recipeId;
        shoppingListURL = `${API_BASE_URL}/shopping-list/` + id;
        const recipeURL = `${API_BASE_URL}/list-recipes/` + id;
        fetch(recipeURL)
          .then(response => {
              console.log('the response is: ', response);
            return response.json()
          })
        .then(data => {
          this.setState({
              recipe: data
          })
          console.log('recipe from state: ', this.state.recipe);
        })
        .then(() => {

            const grains = this.state.recipe.grains_list.map((grain, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Grain type: {grain.grains_type}</span><br />
                            <span>Grain amount: {grain.grains_amount} lbs</span>
                        </div>
                    ); 
            });
            this.setState({grains});

            const yeast = this.state.recipe.yeast_list.map((yeast, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Yeast type: {yeast.yeast_type}</span><br />
                            <span>Yeast amount: {yeast.yeast_amount}oz</span>
                        </div>
                    ); 
            });
            this.setState({yeast});

            const hops = this.state.recipe.hops_list.map((hops, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Hops type: {hops.hops_type}</span><br />
                            <span>Hops amount: {hops.hops_amount}oz</span>
                        </div>
                    ); 
            });
            this.setState({hops});

            const other = this.state.recipe.other_list.map((other, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Other ingredient: {other.other_ingredient}</span><br />
                            <span>Other amount: {other.other_amount}</span>
                        </div>
                    ); 
            });
            this.setState({other});

        })
        window.scrollTo(0, 0)
    }

    render() {

        const createShoppingList = (e) => {

            e.preventDefault();
            console.log('recipe from state in createShoppingList: ', this.state.recipe);
    
            axios(shoppingListURL, {
                method: 'post',
                data: this.state.recipe,
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${this.props.authToken}`
                }
            })
                .then(response => {
                    console.log(response);
                    window.location = '/list-shopping-lists';
                })
                .catch(error => {
                    console.log(error);
                })
    
        }

        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container justify="center" className={classes.paper} spacing={24}>
                <Grid item  xs={12} sm={9} md={6}>
                <Card className={classes.card}>
                <CardMedia
                            className={classes.media}
                            image={`https://source.unsplash.com/collection/2391947`}
                            title="Beer in various ways"
                />
                <CardContent>
                    <div className={classes.borderBottom}>
                        <Typography variant="display3" component="h1">
                            {this.state.recipe.beer_name}
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            ABV: {this.state.recipe.beer_abv}%
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Style: {this.state.recipe.beer_style}
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            IBU (Bitterness): {this.state.recipe.beer_ibu}
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            SRM (Color): {this.state.recipe.beer_srm}
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Difficulty: {this.state.recipe.brew_difficulty}
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Batch Size: {this.state.recipe.batch_size} gal
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Original Gravity: {this.state.recipe.orig_grav}
                        </Typography>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Final Gravity: {this.state.recipe.final_grav}
                        </Typography>
                    </div>
                    <div className={classes.borderBottom}>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Grains: {this.state.grains}
                        </Typography>
                    </div>
                    <div className={classes.borderBottom}>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Hops: {this.state.hops}
                        </Typography>
                    </div>
                    <div className={classes.borderBottom}>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Yeast: {this.state.yeast}
                        </Typography>
                    </div>
                    <div className={classes.borderBottom}>
                        <Typography variant="display1" style={sectionStyle} component="div">
                            Other: {this.state.other}
                        </Typography>
                    </div>
                    <Typography variant="display1" style={Object.assign({}, sectionStyle, instructionsStyle)} component="div">
                        Brew Instructions: <div>{this.state.recipe.brew_instructions}</div>
                    </Typography>
                    <div>
                        <form onSubmit={createShoppingList}>
                            <button type='submit'>Create a new shopping list</button>
                        </form>
                    </div>
                </CardContent>
                </Card>
                </Grid>
                </Grid>
            </div>
        );

    }
}

Recipe.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authToken: state.auth.authToken
});

export default connect(mapStateToProps)(withStyles(styles)(Recipe));
