import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonAppBar from './ButtonAppBar';

class Header extends Component {

    render() {

        const jumbotronStyle = {
            paddingBottom: '50px',
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"
        }

        return (
            <div>
                <ButtonAppBar />
                <div className="App-header" style={jumbotronStyle}>
                    <h1>Shared Brew</h1>
                    <p>Let's brew something awesome together...</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);