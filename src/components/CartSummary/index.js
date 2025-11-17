import Popup from 'reactjs-popup'
import Payment from '../Payment'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.price * each.quantity
      })

      const itemsText = cartList.length > 1 ? 'Items' : 'Item'

      return (
        <div className="total-price-view-container">
          <h1 className="order-total-price-heading">
            <span className="order-total-heading">Order Total: </span>RS {total}
            /-
          </h1>
          <p className="items-text">
            {cartList.length} {itemsText} in cart
          </p>

          <Popup
            modal
            trigger={
              <button className="checkout-btn" type="button">
                Checkout
              </button>
            }
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
