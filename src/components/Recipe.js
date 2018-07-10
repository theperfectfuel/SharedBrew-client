import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

class Recipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipe: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.recipeId;
        const recipeURL = 'http://localhost:8080/list-recipes/' + id;
        fetch(recipeURL)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log('recipe', data);
          this.setState({
              recipe: data
          })
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

        })
    }

    render() {

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
                    <Typography variant="display1" style={Object.assign({}, sectionStyle, instructionsStyle)} component="div">
                        Brew Instructions: {this.state.recipe.brew_instructions}
                    </Typography>
                </Paper>

            </div>
        );

    }
}

Recipe.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Recipe);