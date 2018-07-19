import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const sectionStyle = {
    padding: '5px',
    margin: '20px'
}

const instructionsStyle = {
    whiteSpace: 'pre-wrap'
}

var shoppingListUrl = '';

class Recipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipe: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.recipeId;
        shoppingListUrl = 'https://protected-spire-50393.herokuapp.com/shopping-list/' + id;
        const recipeURL = 'https://protected-spire-50393.herokuapp.com/list-recipes/' + id;
        fetch(recipeURL)
        .then(response => {
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
                            <span>Grain amount: {grain.grains_amount}</span>
                        </div>
                    ); 
            });
            this.setState({grains});

            const yeast = this.state.recipe.yeast_list.map((yeast, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Yeast type: {yeast.yeast_type}</span><br />
                            <span>Yeast amount: {yeast.yeast_amount}</span>
                        </div>
                    ); 
            });
            this.setState({yeast});

            const hops = this.state.recipe.hops_list.map((hops, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Hops type: {hops.hops_type}</span><br />
                            <span>Hops amount: {hops.hops_amount}</span>
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
    }

    render() {

        const createShoppingList = (e) => {

            e.preventDefault();
            console.log('recipe from state in createShoppingList: ', this.state.recipe);
    
            axios(shoppingListUrl, {
                method: 'post',
                data: this.state.recipe,
                withCredentials: true
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
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="display4" component="h1">
                        {this.state.recipe.beer_name}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        ABV: {this.state.recipe.beer_abv}
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
                        Batch Size: {this.state.recipe.batch_size}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Original Gravity: {this.state.recipe.orig_grav}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Final Gravity: {this.state.recipe.final_grav}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Grains: {this.state.grains}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Hops: {this.state.hops}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Yeast: {this.state.yeast}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Other: {this.state.other}
                    </Typography>
                    <Typography variant="display1" style={Object.assign({}, sectionStyle, instructionsStyle)} component="div">
                        Brew Instructions: <div>{this.state.recipe.brew_instructions}</div>
                    </Typography>
                    <div>
                        <form onSubmit={createShoppingList}>
                            <button type='submit'>Create a new shopping list</button>
                        </form>
                    </div>
                </Paper>

            </div>
        );

    }
}

Recipe.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Recipe);