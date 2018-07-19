import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <Button 
                        //component={Link} 
                        href="https://protected-spire-50393.herokuapp.com/auth/google" 
                        style={loginBtnStyle}
                        color="inherit">
                        Login
                    </Button>
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
                            //component={Link}
                            href="/logout"
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

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));
