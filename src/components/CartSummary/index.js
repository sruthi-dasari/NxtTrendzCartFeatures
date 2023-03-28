import './index.css'

const CartSummary = props => {
  const {cartCount, totalAmt} = props

  return (
    <div className="cart-summary-container">
      <h1 className="cart-summary-heading">
        Order Total:
        <span className="cart-summary-span"> Rs {totalAmt}/-</span>
      </h1>
      <p className="cart-summary-para">{cartCount} Items in cart</p>

      <button type="button" className="checkout-btn">
        Checkout
      </button>
    </div>
  )
}
export default CartSummary
