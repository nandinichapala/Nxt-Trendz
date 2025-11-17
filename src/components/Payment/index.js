import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsX} from 'react-icons/bs'
import {GiConfirmed} from 'react-icons/gi'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentDetailsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true},
  {id: 'NET BANKING', displayText: 'Net Banking', isDisabled: true},
  {id: 'UPI', displayText: 'UPI', isDisabled: true},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true},
  {id: 'CASH ON DELIVERY', displayText: 'Cash on Delivery', isDisabled: false},
]

class Payment extends Component {
  state = {paymentMethod: '', isOrderPlaced: false}

  onChangePaymentMethod = event => {
    this.setState({paymentMethod: event.target.value})
  }

  onClickConfirmOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  render() {
    const {close} = this.props
    const {paymentMethod, isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let totalAmount = 0
          cartList.forEach(each => {
            totalAmount += each.quantity * each.price
          })
          return (
            <div className="payment-container">
              {isOrderPlaced ? (
                <div className="order-confirm-container">
                  <GiConfirmed className="green-tick-icon" />
                  <p className="order-placed-view">
                    Your order has been placed successfully
                  </p>
                  <Link to="/products" className="back-to-shop-link">
                    <button className="back-to-shop" type="button">
                      Back to Shop
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={() => close()}
                  >
                    <BsX />
                  </button>
                  <h1 className="payment-heading">Payment Details</h1>
                  <h1 className="payment-method-heading">Methods to Pay</h1>
                  <ul className="payment-list-container">
                    {paymentDetailsList.map(each => (
                      <li className="payment-list-item" key={each.id}>
                        <input
                          type="radio"
                          id={each.id}
                          value={each.id}
                          disabled={each.isDisabled}
                          name="paymentMethod"
                          className="payment-input"
                          onChange={this.onChangePaymentMethod}
                        />
                        <label
                          htmlFor={each.id}
                          className={`payment-method-text ${
                            each.isDisabled ? 'active-payment-method-text' : ''
                          }`}
                        >
                          {each.displayText}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <p className="payment-quantity-text">
                    Quantity: {cartList.length}
                  </p>
                  <p className="payment-amount-text">
                    Total Amount: {totalAmount}/-
                  </p>
                  <button
                    type="button"
                    disabled={paymentMethod === ''}
                    className="payment-confirm-btn"
                    onClick={this.onClickConfirmOrder}
                  >
                    Confirm Order
                  </button>
                </>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Payment
