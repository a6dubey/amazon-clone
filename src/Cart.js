import React from "react";
import "./cart.css";
import {useNavigate} from 'react-router-dom';



function Cart({ cart,removeFromCart }) {
  const navigate = useNavigate();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_Approved._TTW_.jpg"
          alt=""
          className="checkout_ad"
        />

        <div>
          <h3>Hello Abhishek</h3>
          <h2 className="checkout_title">Shopping Cart</h2>

          {cart?.line_items?.map((item) => {
            return (
              <div className="checkoutProduct" key={item.id}>
                <img
                  src={item.image.url}
                  alt=""
                />
                <div className="checkoutProduct_info">
                  <p className="checkoutProduct_title">{item.name}</p>
                  <small>In stock</small>
                  <p className="checkoutProduct_price">
                    <strong>{item.price.formatted_with_symbol}* {item.quantity}={item.line_total.formatted_with_symbol}</strong>
                  </p>

                  <button onClick={()=>removeFromCart(item.id)}>Remove From Basket</button>
                </div>
              </div>
            );
          })}

          
        </div>
      </div>
      <div className="checkout_right">
        <div className="subtotal">
          <p>
            {" "}
            Subtotal ({cart.total_items} items): <strong>{ cart?.subtotal?.formatted_with_symbol}</strong>
            {/* {cart.subtotal.formatted_with_symbol} */}
          </p>
          <small className="subtotal_gift">
            <input type="checkbox" />
            This order contains a gift
          </small>
        </div>

        <button onClick={()=>navigate("/checkout")}>Procced to Buy</button>
      </div>
    </div>
  );
}

export default Cart;
