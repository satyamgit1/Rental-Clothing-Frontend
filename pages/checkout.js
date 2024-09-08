// import React, { useState, useEffect } from "react";
// import { getProducts, checkoutRental } from "../services/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";

// export default function Checkout() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [userData, setUserData] = useState({
//     name: "",
//     rentalDate: "",
//     returnDate: "",
//   });
//   const [checkoutStatus, setCheckoutStatus] = useState(null);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const data = await getProducts();
//     setProducts(data);
//   };

//   const handleProductSelection = (product) => {
//     const existingProduct = selectedProducts.find((p) => p._id === product._id);
//     if (existingProduct) {
//       const updatedProducts = selectedProducts.map((p) =>
//         p._id === product._id
//           ? { ...p, selectedQuantity: p.selectedQuantity + 1 }
//           : p
//       );
//       setSelectedProducts(updatedProducts);
//     } else {
//       setSelectedProducts([...selectedProducts, { ...product, selectedQuantity: 1 }]);
//     }
//   };

//   const handleIncreaseQuantity = (productId) => {
//     const updatedProducts = selectedProducts.map((p) =>
//       p._id === productId ? { ...p, selectedQuantity: p.selectedQuantity + 1 } : p
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleDecreaseQuantity = (productId) => {
//     const updatedProducts = selectedProducts
//       .map((p) =>
//         p._id === productId && p.selectedQuantity > 1
//           ? { ...p, selectedQuantity: p.selectedQuantity - 1 }
//           : p
//       )
//       .filter((p) => p.selectedQuantity > 0);
//     setSelectedProducts(updatedProducts);
//   };

//   const handleRemoveProduct = (productId) => {
//     const updatedProducts = selectedProducts.filter((p) => p._id !== productId);
//     setSelectedProducts(updatedProducts);
//   };

//   const calculateTotalPrice = () => {
//     return selectedProducts.reduce(
//       (total, product) => total + product.price * product.selectedQuantity,
//       0
//     );
//   };

//   const handleCheckout = async () => {
//     // Check if user has filled in all required fields
//     if (!userData.name || !userData.rentalDate || !userData.returnDate) {
//       setFormError("Please fill in your name, rental date, and return date.");
//       return;
//     }

//     // Reset the error message if all fields are valid
//     setFormError("");

//     const rentalData = {
//       ...userData,
//       products: selectedProducts.map((product) => ({
//         productId: product._id, // Include product ID for the backend
//         name: product.name,
//         quantity: product.selectedQuantity,
//         price: product.price,
//       })),
//     };

//     try {
//       const response = await checkoutRental(rentalData);

//       if (response) {
//         setSelectedProducts([]);
//         setCheckoutStatus("success");
//         fetchProducts();
//       } else {
//         setCheckoutStatus("error");
//       }
//     } catch (error) {
//       setCheckoutStatus("error");
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h1>

//       <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-white p-6 shadow-lg rounded-lg">
//         <input
//           type="text"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           placeholder="Your Name"
//           className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <div>
//           <label className="block mb-2 text-gray-700">Rental Date</label>
//           <input
//             type="date"
//             value={userData.rentalDate}
//             onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
//             placeholder="Rental Date"
//             className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-gray-700">Return Date</label>
//           <input
//             type="date"
//             value={userData.returnDate}
//             onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
//             placeholder="Return Date"
//             className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//       </form>

//       {/* Display error message if form validation fails */}
//       {formError && <p className="text-red-600">{formError}</p>}

//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Products:</h2>
//       <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-3 px-6 text-left text-gray-600">Product Name</th>
//             <th className="py-3 px-6 text-left text-gray-600">Category</th>
//             <th className="py-3 px-6 text-left text-gray-600">Price</th>
//             <th className="py-3 px-6 text-center text-gray-600">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product._id} className="hover:bg-gray-50">
//               <td className="py-3 px-6 border-b border-gray-200">{product.name}</td>
//               <td className="py-3 px-6 border-b border-gray-200">{product.category}</td>
//               <td className="py-3 px-6 border-b border-gray-200">₹{product.price}</td>
//               <td className="py-3 px-6 border-b border-gray-200 text-center">
//                 <button
//                   onClick={() => handleProductSelection(product)}
//                   className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
//                 >
//                   <FontAwesomeIcon icon={faPlus} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2 className="text-xl font-semibold mt-6">Selected Products:</h2>
//       {selectedProducts.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-6 text-left text-gray-600">Product Name</th>
//               <th className="py-3 px-6 text-left text-gray-600">Category</th>
//               <th className="py-3 px-6 text-left text-gray-600">Price</th>
//               <th className="py-3 px-6 text-left text-gray-600">Quantity</th>
//               <th className="py-3 px-6 text-center text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedProducts.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-6 border-b border-gray-200">{product.name}</td>
//                 <td className="py-3 px-6 border-b border-gray-200">{product.category}</td>
//                 <td className="py-3 px-6 border-b border-gray-200">₹{product.price}</td>
//                 <td className="py-3 px-6 border-b border-gray-200 text-center">{product.selectedQuantity}</td>
//                 <td className="py-3 px-6 border-b border-gray-200 text-center">
//                   <button
//                     onClick={() => handleIncreaseQuantity(product._id)}
//                     className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
//                   >
//                     <FontAwesomeIcon icon={faPlus} />
//                   </button>
//                   <button
//                     onClick={() => handleDecreaseQuantity(product._id)}
//                     className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full ml-2"
//                   >
//                     <FontAwesomeIcon icon={faMinus} />
//                   </button>
//                   <button
//                     onClick={() => handleRemoveProduct(product._id)}
//                     className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full ml-2"
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No products selected yet.</p>
//       )}

//       <h2 className="text-lg font-semibold mt-4 text-gray-800">Total Price: ₹{calculateTotalPrice()}</h2>

//       <button
//         onClick={handleCheckout}
//         className="mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//         disabled={selectedProducts.length === 0 || !userData.name || !userData.rentalDate || !userData.returnDate}
//       >
//         Checkout
//       </button>

//       {/* Checkout Success/Error Messages */}
//       {checkoutStatus === "success" && (
//         <p className="mt-4 text-green-600">Checkout successful! Inventory updated.</p>
//       )}
//       {checkoutStatus === "error" && (
//         <p className="mt-4 text-red-600">Checkout failed. Please try again.</p>
//       )}

//       {/* Add the "View Rented Products" button */}
//       <Link href="/rented-clothes" passHref>
//         <button className="bg-green-500 hover:bg-green-600 text-white p-3 mt-4 rounded-lg">
//           View Rented Products
//         </button>
//       </Link>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { getProducts, checkoutRental } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
    if (!userData.name || !userData.rentalDate || !userData.returnDate) {
      return alert("Please fill out all fields before checking out.");
    }

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
        <label>Rental Date</label>
        <input
          type="date"
          value={userData.rentalDate}
          onChange={(e) =>
            setUserData({ ...userData, rentalDate: e.target.value })
          }
          className="p-2 border border-gray-300 rounded"
          required
        />
        <label>Return Date</label>
        <input
          type="date"
          value={userData.returnDate}
          onChange={(e) =>
            setUserData({ ...userData, returnDate: e.target.value })
          }
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

      {/* Add rented products link */}
      <Link href="/rented-clothes" legacyBehavior>
        <button className="bg-green-500 text-white p-2 mt-4 ml-4">
          View Rented Products
        </button>
      </Link>
    </div>
  );
}
