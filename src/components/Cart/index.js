import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const cartCount = cartList.length
      const totalAmtsList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const totalAmt = totalAmtsList.reduce(reducer, 0)

      // TODO: Update the functionality to remove all the items in the cart

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAll}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-summary-container">
                  <h1 className="cart-summary-heading">
                    Order Total:
                    <span className="cart-summary-span"> Rs {totalAmt}/-</span>
                  </h1>
                  <p className="cart-summary-para">{cartCount} Items in cart</p>
                </div>
                <button type="button" className="checkout-btn">
                  Checkout
                </button>
                {/* TODO: Add your code for Cart Summary here */}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
