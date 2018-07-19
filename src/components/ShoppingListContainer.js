import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ShoppingListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shoppingLists: [],
            brewer: ''
         };
    }

    componentDidMount() {

        axios('https://protected-spire-50393.herokuapp.com/shopping-lists', {
            withCredentials: true,
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

        const shoppingListStyle = {
            padding: '0',
            fontSize: '18px'
        };

        const shoppingLists = this.state.shoppingLists.map((list, index) => {
            return (
                <li key={list._id}>
                    <div>
                        <Link to={'/list-shopping-lists/' + list._id}>Name: {list.beer_name}</Link><br />
                    </div>
                    <div>
                        <p>
                            Date Created: {list.createdDate.slice(0, 10)}<br />
                            Batch Size: {list.batch_size}
                        </p>
                    </div>
                </li>
            );
        });

        return (
            <div>
                <h2>Shopping Lists for {this.state.brewer}</h2>
                <ul style={shoppingListStyle}>
                    {shoppingLists}
                </ul>
            </div>
        );
    }
}

export default ShoppingListContainer;