import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  footer: {
    minHeight: '100px',
    padding: '30px'
  },
  footerLink: {
    color: 'orange',
  }
};

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <AppBar className={classes.footer} position="static">
          <Typography variant="headline" component="div" color="inherit">
            <div>
            Built by:   
            <a href="http://robertcwilson.com" 
              target="_blank" 
              className={classes.footerLink}
            >
             Robert Wilson
            </a>
            </div>
            </Typography>
            <div>
            Copyright &copy; SharedBrew.com 2018<br />
            </div>
        </AppBar>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);