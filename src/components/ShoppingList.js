import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {API_BASE_URL} from '../config';

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

class ShoppingList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shoppingList: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.shoppingListId;
        const shoppingListURL = `${API_BASE_URL}/shopping-list/` + id;
        console.log(shoppingListURL);

        axios(shoppingListURL, {
            method: 'get',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.props.authToken}`
            }
        })
        //fetch(shoppingListURL)
        .then(response => {
          return response.data;
        })
        .then(data => {
          this.setState({
              shoppingList: data
          })
          console.log('shoppingList from state: ', this.state.shoppingList);
        })
        .then(() => {

            const grains = this.state.shoppingList.grains_list.map((grain, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Grain type: {grain.grains_type}</span><br />
                            <span>Grain amount: {grain.grains_amount} lbs</span>
                        </div>
                    ); 
            });
            this.setState({grains});

            const yeast = this.state.shoppingList.yeast_list.map((yeast, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Yeast type: {yeast.yeast_type}</span><br />
                            <span>Yeast amount: {yeast.yeast_amount} oz</span>
                        </div>
                    ); 
            });
            this.setState({yeast});

            const hops = this.state.shoppingList.hops_list.map((hops, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Hops type: {hops.hops_type}</span><br />
                            <span>Hops amount: {hops.hops_amount} oz</span>
                        </div>
                    ); 
            });
            this.setState({hops});

            const other = this.state.shoppingList.other_list.map((other, index) => {
                return(
                        <div style={sectionStyle} key={index}>
                            <span>Other ingredient: {other.other_ingredient}</span><br />
                            <span>Other amount: {other.other_amount}</span>
                        </div>
                    ); 
            });
            this.setState({other});

        })
        window.scrollTo(0, 0);
    }

    render() {

        const deleteShoppingList = (e) => {

            e.preventDefault();
            const id = this.props.match.params.shoppingListId;
            const shoppingListURL = `${API_BASE_URL}/shopping-list/` + id;
            console.log('shoppingListURL in delete is: ', shoppingListURL);
    
            axios(shoppingListURL, {
                method: 'delete',
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
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="display3" component="h1">
                        {this.state.shoppingList.beer_name}
                    </Typography>
                    <Typography variant="display1" style={sectionStyle} component="div">
                        Batch Size: {this.state.shoppingList.batch_size} gal
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
                        Other Ingredients: {this.state.other}
                    </Typography>
                    <div>
                        <form onSubmit={deleteShoppingList}>
                            <button type='submit'>Delete shopping list</button>
                        </form>
                    </div>
                </Paper>

            </div>
        );

    }
}

ShoppingList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authToken: state.auth.authToken
});
  
export default connect(mapStateToProps)(withStyles(styles)(ShoppingList));