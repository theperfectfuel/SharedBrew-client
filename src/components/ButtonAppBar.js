import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

const styles = {
    root: {
      flexGrow: 1
    },
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    }
  };

const btnStyle = {
    fontSize: '1em'
};

const loginBtnStyle = {
    fontSize: '1em',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: '5px'
};

const homeLink = {
    color: '#fff',
    fontSize: '20px',
    padding: '5px'
}

class ButtonAppBar extends Component {

    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        return <Redirect to="/" />;
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <span>
                        <Button 
                            component={Link} 
                            //href="https://protected-spire-50393.herokuapp.com/auth/google" 
                            to="login"
                            style={loginBtnStyle}
                            color="inherit">
                            Login
                        </Button>
                        <Button 
                            component={Link} 
                            //href="https://protected-spire-50393.herokuapp.com/auth/google" 
                            to="/register"
                            style={loginBtnStyle}
                            color="inherit">
                            Register
                        </Button>
                    </span>
                );  
            default:
                return(
                    <div>
                        <Button 
                            component={Link} 
                            to="/list-shopping-lists" 
                            style={loginBtnStyle} 
                            color="inherit">
                            My Shopping Lists
                        </Button>
                        <Button 
                            component={Link} 
                            to="/new-recipe" 
                            style={loginBtnStyle} 
                            color="inherit">
                            New Recipe
                        </Button>
                        <Button 
                            onClick={() => this.logOut()}
                            style={loginBtnStyle} 
                            color="inherit">
                            Logout
                        </Button>
                    </div>
                );
        }
    }

    render() {

        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="display2" className={classes.flex}>
                  <a style={homeLink} href='/'>SharedBrew</a>
                </Typography>

                    <a style={homeLink} href="/list-recipes">Recipes</a>

                {this.renderContent()}
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));
