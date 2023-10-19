// src/CartComponent/CartTotal.js
import React from 'react';

function CartTotal({ cart }) {
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="cart-total">
      <p>Tổng cộng: {totalPrice} đồng</p>
    </div>
  );
}

export default CartTotal;
