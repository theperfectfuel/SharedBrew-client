import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../config';
import { withStyles, Card, CardActions, CardContent, CardMedia, Grid } from '../../node_modules/@material-ui/core';

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

class ShoppingListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shoppingLists: [],
            brewer: '',
            spacing: '16'
         };
    }

    componentDidMount() {

        axios(`${API_BASE_URL}/shopping-lists`, {
            method: 'get',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${this.props.authToken}`
            }
        })
          .then(response => {
            console.log('getting response')
            return response.data;
          })
          .then(data => {
            console.log('data is: ', data);
            var newBrewer = data.pop().brewer;
            this.setState({
                shoppingLists: data,
                brewer: newBrewer
            })
            console.log('state is now: ', this.state);
          })
    
      }

    render() {

        const { classes } = this.props;

        const shoppingLists = this.state.shoppingLists.map((list, index) => {
            return (
                    <Grid item  xs={12} sm={6} md={3} key={list._id}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={`https://source.unsplash.com/collection/2350698/${index}`}
                                title="Beer in a mug"
                            />
                            <CardContent>
                                <div>
                                    <Link to={'/list-shopping-lists/' + list._id}>Name: {list.beer_name}</Link><br />
                                </div>
                                <div>
                                    <p>
                                        Date Created: {list.createdDate.slice(0, 10)}<br />
                                        Batch Size: {list.batch_size} gal
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
            );
        });

        return (
            <div className={classes.root}>
                <h2>Shopping Lists for {this.state.brewer}</h2>
                <Grid container className={classes.paper} spacing={24}>
                    {shoppingLists}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.auth.authToken
});

export default connect(mapStateToProps)(withStyles(styles)(ShoppingListContainer));