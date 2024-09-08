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

import React, { useState, useEffect } from "react";
import { getProducts, checkoutRental } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    rentalDate: "",
    returnDate: "",
  });

  const [checkoutStatus, setCheckoutStatus] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleProductSelection = (product) => {
    const existingProduct = selectedProducts.find((p) => p._id === product._id);
    if (existingProduct) {
      const updatedProducts = selectedProducts.map((p) =>
        p._id === product._id
          ? { ...p, selectedQuantity: p.selectedQuantity + 1 }
          : p
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, selectedQuantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedProducts = selectedProducts.map((p) =>
      p._id === productId ? { ...p, selectedQuantity: p.selectedQuantity + 1 } : p
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
      .filter((p) => p.selectedQuantity > 0);
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((p) => p._id !== productId);
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
      products: selectedProducts.map((product) => ({
        productId: product._id, // Include product ID for the backend
        name: product.name,
        quantity: product.selectedQuantity,
        price: product.price,
      })),
    };

    try {
      const response = await checkoutRental(rentalData);

      if (response) {
        setSelectedProducts([]);
        setCheckoutStatus("success");
        fetchProducts();
      } else {
        setCheckoutStatus("error");
      }
    } catch (error) {
      setCheckoutStatus("error");
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form className="mb-6 grid grid-cols-1 gap-4">
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Your Name"
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={userData.rentalDate}
          onChange={(e) =>
            setUserData({ ...userData, rentalDate: e.target.value })
          }
          placeholder="Rental Date"
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={userData.returnDate}
          onChange={(e) =>
            setUserData({ ...userData, returnDate: e.target.value })
          }
          placeholder="Return Date"
          className="p-2 border border-gray-300 rounded"
          required
        />
      </form>

      <h2 className="text-xl font-semibold mb-4">Available Products:</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">₹{product.price}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleProductSelection(product)}>
                  <FontAwesomeIcon icon={faPlus} className="text-green-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6">Selected Products:</h2>
      {selectedProducts.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">₹{product.price}</td>
                <td className="py-2 px-4 border-b">{product.selectedQuantity}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleIncreaseQuantity(product._id)}>
                    <FontAwesomeIcon icon={faPlus} className="text-green-500" />
                  </button>
                  <button onClick={() => handleDecreaseQuantity(product._id)}>
                    <FontAwesomeIcon icon={faMinus} className="text-yellow-500 ml-2" />
                  </button>
                  <button onClick={() => handleRemoveProduct(product._id)}>
                    <FontAwesomeIcon icon={faTrash} className="text-red-500 ml-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products selected yet.</p>
      )}

      <h2 className="text-lg font-semibold mt-4">Total Price: ₹{calculateTotalPrice()}</h2>

      <button
        onClick={handleCheckout}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Checkout
      </button>

      {/* Checkout Success/Error Messages */}
      {checkoutStatus === "success" && (
        <p className="mt-4 text-green-600">Checkout successful! Inventory updated.</p>
      )}
      {checkoutStatus === "error" && (
        <p className="mt-4 text-red-600">Checkout failed. Please try again.</p>
      )}
    </div>
  );
}
