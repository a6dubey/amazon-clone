import React from 'react'
import { Link } from 'react-router-dom';

function Thankyou({orderDetails}) {
  return (
    <div className="order_confirm">
        <h1>Hello {orderDetails?.customer?.firstname}</h1>
        <h2>Thank you for your order!</h2>
        <h3>Your Order Number is : {orderDetails?.id}</h3>
        <h4>Order Total: {orderDetails?.order_value.formatted_with_symbol}</h4>
        <Link to="/"><button>Continue Shopping</button></Link>
        </div>
  )
}

export default Thankyou