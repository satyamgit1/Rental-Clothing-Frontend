import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Cart() {
  const [cart, setCart] = useState([]);  // State for cart
  const router = useRouter();

  // Load cart from local storage on page load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((p) =>
      p._id === productId
        ? { ...p, selectedQuantity: p.selectedQuantity + 1 }
        : p
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((p) =>
        p._id === productId && p.selectedQuantity > 1
          ? { ...p, selectedQuantity: p.selectedQuantity - 1 }
          : p
      )
      .filter((p) => p.selectedQuantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.selectedQuantity,
      0
    );
  };

  const proceedToCheckout = () => {
    router.push("/checkout");  // Navigate to checkout
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
                <button onClick={() => handleIncreaseQuantity(product._id)}>
                  +
                </button>
                <button onClick={() => handleDecreaseQuantity(product._id)}>
                  -
                </button>
                <button onClick={() => handleRemoveProduct(product._id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h2>Total Price: ₹{calculateTotalPrice()}</h2>

      <button onClick={proceedToCheckout} disabled={cart.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
}
