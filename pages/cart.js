import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const handleQuantityChange = (productId, action) => {
    const updatedCart = cart.map((product) =>
      product._id === productId
        ? {
            ...product,
            selectedQuantity:
              action === 'increase'
                ? product.selectedQuantity + 1
                : Math.max(product.selectedQuantity - 1, 1),
          }
        : product
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.selectedQuantity,
      0
    );
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <ul className="product-list">
          {cart.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.price}</p>
              <p>Selected Quantity: {product.selectedQuantity}</p>
              <div className="product-actions">
                <button onClick={() => handleQuantityChange(product._id, 'increase')}>+</button>
                <button onClick={() => handleQuantityChange(product._id, 'decrease')}>-</button>
                <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h2>Total Price: ₹{calculateTotalPrice()}</h2>

      <button onClick={() => router.push('/checkout')} disabled={cart.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
}
