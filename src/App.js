import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const newCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })

    this.setState({cartList: newCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state

    if (cartList.length !== 0) {
      const reqItem = cartList.find(eachItem => eachItem.id === product.id)
      if (reqItem) {
        if (product.quantity > 1) {
          const newCartList = cartList.map(eachItem => {
            if (eachItem.id === product.id) {
              return {
                ...eachItem,
                quantity: eachItem.quantity + product.quantity,
              }
            }
            return eachItem
          })
          this.setState({cartList: newCartList})
        } else if (product.quantity === 1) {
          this.incrementCartItemQuantity(product.id)
        }
      } else {
        this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
      }
    } else {
      //   console.log(product)
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }
  //   TODO: Update the code here to implement addCartItem

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const reqItem = cartList.find(eachItem => eachItem.id === id)
    if (reqItem.quantity === 1) {
      this.removeCartItem(id)
    } else {
      const newCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })
      this.setState({cartList: newCartList})
    }

    // console.log(newCartList)
  }

  render() {
    const {cartList} = this.state
    // console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
