import React, { Component } from "react";
import StoreFront from "./Components/StoreFront/StoreFront";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import NavBar from "./Components/NavBar/NavBar";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/products/")
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
  addToCart(item) {
    this.setState({
      cart: [...this.state.cart, item]
    });
  }
  removeFromCart(index) {
    // separating items in cart and saving them to a new variable //
    let arr = this.state.cart;
    for(var i = 0; i < arr.length; i++){
      if(arr[i].id === index.id){
        console.log(arr);
        arr.splice(i, 1);
        console.log(arr);
        i--
      }
    }

    this.setState({
      cart: arr
    })
    // let cartCopy = this.state.cart.slice();
    // cartCopy.splice(index, 1);
    // this.setState({
    //   cart: cartCopy
    // });
  }
  navigate(location) {
    if (location === "cart") {
      this.setState({
        showCart: true
      });
    } else {
      this.setState({
        showCart: false
      });
    }
  }
  render() {
    const { products, showCart, cart } = this.state;
    return (
      <div className="App">
        <NavBar navigate={this.navigate} />
        <div className="main-container">
          {showCart ? (
            <ShoppingCart cart={cart} removeFromCart={this.removeFromCart}/>
          ) : (
            <StoreFront products={products} addToCart={this.addToCart}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
