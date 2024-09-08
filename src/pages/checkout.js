// import { useState, useEffect } from "react";
// import { getProducts, checkoutRental } from "../../services/api.js";

// export default function Checkout() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [userData, setUserData] = useState({
//     name: "",
//     rentalDate: "",
//     returnDate: ""
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const data = await getProducts();
//     setProducts(data);
//   };

//   const handleProductSelection = (product) => {
//     setSelectedProducts([...selectedProducts, product]);
//   };

//   const handleCheckout = async () => {
//     const rentalData = {
//       ...userData,
//       products: selectedProducts,
//     };
//     const response = await checkoutRental(rentalData);
//     console.log("Checkout Success:", response);
//   };

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <div>
//         <input
//           type="text"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           placeholder="Your Name"
//         />
//         <input
//           type="date"
//           value={userData.rentalDate}
//           onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
//           placeholder="Rental Date"
//         />
//         <input
//           type="date"
//           value={userData.returnDate}
//           onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
//           placeholder="Return Date"
//         />
//       </div>

//       <h2>Select Products:</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             {product.name} - {product.category} - {product.quantity} - ${product.price}
//             <button onClick={() => handleProductSelection(product)}>Add</button>
//           </li>
//         ))}
//       </ul>

//       <button onClick={handleCheckout}>Checkout</button>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { getProducts, checkoutRental } from "../../services/api.js";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    rentalDate: "",
    returnDate: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleProductSelection = (product) => {
    const existingProduct = selectedProducts.find(
      (p) => p._id === product._id
    );
    if (existingProduct) {
      const updatedProducts = selectedProducts.map((p) =>
        p._id === product._id
          ? { ...p, selectedQuantity: p.selectedQuantity + 1 }
          : p
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, selectedQuantity: 1 },
      ]);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedProducts = selectedProducts.map((p) =>
      p._id === productId
        ? { ...p, selectedQuantity: p.selectedQuantity + 1 }
        : p
    );
    setSelectedProducts(updatedProducts);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedProducts = selectedProducts
      .map((p) =>
        p._id === productId && p.selectedQuantity > 1
          ? { ...p, selectedQuantity: p.selectedQuantity - 1 }
          : p
      )
      .filter((p) => p.selectedQuantity > 0); // Remove items with 0 quantity
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (p) => p._id !== productId
    );
    setSelectedProducts(updatedProducts);
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.selectedQuantity,
      0
    );
  };

  const handleCheckout = async () => {
    const rentalData = {
      ...userData,
      products: selectedProducts,
    };
    const response = await checkoutRental(rentalData);
    console.log("Checkout Success:", response);
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form className="checkout-form">
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Your Name"
        />
        <input
          type="date"
          value={userData.rentalDate}
          onChange={(e) =>
            setUserData({ ...userData, rentalDate: e.target.value })
          }
          placeholder="Rental Date"
        />
        <input
          type="date"
          value={userData.returnDate}
          onChange={(e) =>
            setUserData({ ...userData, returnDate: e.target.value })
          }
          placeholder="Return Date"
        />
      </form>

      <h2>Select Products:</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleProductSelection(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Selected Products:</h2>
      {selectedProducts.length > 0 ? (
        <ul className="product-list">
          {selectedProducts.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.price}</p>
              <p>Selected Quantity: {product.selectedQuantity}</p>
              <div>
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
        <p>No products selected yet.</p>
      )}

      <h2>Total Price: ₹{calculateTotalPrice()}</h2>

      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
