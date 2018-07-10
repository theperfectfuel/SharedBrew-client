import React, { Component } from 'react';
import './App.css';

class ShoppingListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shoppingLists: [],
            brewer: ''
         };
    }

    componentDidMount() {

        fetch('http://localhost:8080/shopping-lists')
          .then(response => {
            return response.json()
          })
          .then(data => {
            var newBrewer = data.pop().brewer;
            console.log('data in cdm', data);
            console.log('brewer in cdm', newBrewer);
            this.setState({
                shoppingLists: data,
                brewer: newBrewer
            })
          })
    
      }

    render() {

        const shoppingLists = this.state.shoppingLists.map((list, index) => {
            return <li className="shopping-list-stub" key={index}>
                    Name: {list.beer_name}<br />
                    ABV: {list.beer_abv}<br />
                    Style: {list.beer_style}<br />
                    Difficulty: {list.brew_difficulty}
                </li>
        });
        console.log('shopping lists', shoppingLists);

        return (
            <div>
                <h2>Shopping Lists for {this.state.brewer}</h2>
                <ul>
                    {shoppingLists}
                </ul>
            </div>
        );
    }
}

export default ShoppingListContainer;