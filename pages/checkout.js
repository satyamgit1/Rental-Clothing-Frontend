// import React, { useState, useEffect } from 'react';
// import { getProducts, checkoutRental } from '../services/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';

// export default function Checkout() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [userData, setUserData] = useState({ name: '', rentalDate: '', returnDate: '' });
//   const [checkoutStatus, setCheckoutStatus] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleProductSelection = (product) => {
//     const existingProduct = selectedProducts.find((p) => p._id === product._id);
//     const updatedProducts = existingProduct
//       ? selectedProducts.map((p) =>
//           p._id === product._id ? { ...p, selectedQuantity: p.selectedQuantity + 1 } : p
//         )
//       : [...selectedProducts, { ...product, selectedQuantity: 1 }];

//     setSelectedProducts(updatedProducts);
//   };

//   const handleQuantityChange = (productId, action) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId
//         ? {
//             ...product,
//             selectedQuantity:
//               action === 'increase'
//                 ? product.selectedQuantity + 1
//                 : Math.max(product.selectedQuantity - 1, 1),
//           }
//         : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleRemoveProduct = (productId) => {
//     setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
//   };

//   const calculateTotalPrice = () => {
//     return selectedProducts.reduce(
//       (total, product) => total + product.price * product.selectedQuantity,
//       0
//     );
//   };

//   const handleCheckout = async () => {
//     if (!userData.name || !userData.rentalDate || !userData.returnDate) {
//       return alert('Please fill out all fields before checking out.');
//     }

//     const rentalData = {
//       ...userData,
//       products: selectedProducts.map((product) => ({
//         productId: product._id,
//         name: product.name,
//         quantity: product.selectedQuantity,
//         price: product.price,
//       })),
//     };

//     try {
//       const response = await checkoutRental(rentalData);
//       if (response) {
//         setSelectedProducts([]);
//         setCheckoutStatus('success');
//         fetchProducts();
//       } else {
//         setCheckoutStatus('error');
//       }
//     } catch (error) {
//       setCheckoutStatus('error');
//       console.error('Error during checkout:', error);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Checkout Summary', 14, 22);
//     doc.autoTable({
//       head: [['Product Name', 'Category', 'Price (₹)', 'Quantity']],
//       body: selectedProducts.map((product) => [
//         product.name,
//         product.category,
//         `₹${product.price}`,
//         product.selectedQuantity.toString(),
//       ]),
//       startY: 30,
//     });
//     doc.save('checkout-summary.pdf');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <form className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input
//           type="text"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           placeholder="Your Name"
//           className="p-3 border border-gray-300 rounded"
//           required
//         />
//         <input
//           type="date"
//           value={userData.rentalDate}
//           onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
//           className="p-3 border border-gray-300 rounded"
//           required
//         />
//         <input
//           type="date"
//           value={userData.returnDate}
//           onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
//           className="p-3 border border-gray-300 rounded"
//           required
//         />
//       </form>

//       <h2 className="text-2xl font-semibold mb-4">Available Products:</h2>
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-3 px-4 text-left">Product Name</th>
//             <th className="py-3 px-4 text-left">Category</th>
//             <th className="py-3 px-4 text-left">Price</th>
//             <th className="py-3 px-4 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product._id} className="hover:bg-gray-50">
//               <td className="py-3 px-4 border-b">{product.name}</td>
//               <td className="py-3 px-4 border-b">{product.category}</td>
//               <td className="py-3 px-4 border-b">₹{product.price}</td>
//               <td className="py-3 px-4 border-b text-center">
//                 <button
//                   onClick={() => handleProductSelection(product)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded-lg"
//                 >
//                   Add
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2 className="text-2xl font-semibold mt-8 mb-4">Selected Products:</h2>
//       {selectedProducts.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Product Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Price</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedProducts.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">{product.selectedQuantity}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <div className="inline-flex space-x-2">
//                     <button
//                       onClick={() => handleQuantityChange(product._id, 'increase')}
//                       className="bg-green-500 text-white px-2 py-1 rounded-lg"
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button
//                       onClick={() => handleQuantityChange(product._id, 'decrease')}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <button
//                       onClick={() => handleRemoveProduct(product._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded-lg"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-lg font-semibold text-gray-700 mt-6">No products selected yet.</p>
//       )}

//       <h2 className="text-lg font-semibold mt-4">Total Price: ₹{calculateTotalPrice()}</h2>
//       <button
//         onClick={handleCheckout}
//         className="mt-6 p-3 bg-blue-600 text-white rounded-lg shadow-lg"
//       >
//         Checkout
//       </button>

//       {checkoutStatus === 'success' && (
//         <button
//           onClick={generatePDF}
//           className="mt-4 p-3 bg-purple-600 text-white rounded-lg shadow-lg"
//         >
//           Generate PDF
//         </button>
//       )}

//       {checkoutStatus === 'success' && (
//         <p className="mt-4 text-green-600 font-semibold">Checkout successful! Inventory updated.</p>
//       )}
//       {checkoutStatus === 'error' && (
//         <p className="mt-4 text-red-600 font-semibold">Checkout failed. Please try again.</p>
//       )}

//       <Link href="/rented-clothes" legacyBehavior>
//         <button className="bg-green-600 text-white p-3 mt-4 rounded-lg shadow-lg">
//           View Rented Products
//         </button>
//       </Link>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { getProducts, checkoutRental } from '../services/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';

// export default function Checkout() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [userData, setUserData] = useState({ name: '', rentalDate: '', returnDate: '' });
//   const [checkoutStatus, setCheckoutStatus] = useState(null);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Number of products per page

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//       setFilteredProducts(data); // Initialize with all products
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);

//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm) ||
//       product.category.toLowerCase().includes(searchTerm)
//     );

//     setFilteredProducts(filtered);
//     setCurrentPage(1); // Reset to the first page when a new search is made
//   };

//   const handleProductSelection = (product) => {
//     const existingProduct = selectedProducts.find((p) => p._id === product._id);
//     const updatedProducts = existingProduct
//       ? selectedProducts.map((p) =>
//           p._id === product._id ? { ...p, selectedQuantity: p.selectedQuantity + 1 } : p
//         )
//       : [...selectedProducts, { ...product, selectedQuantity: 1 }];

//     setSelectedProducts(updatedProducts);
//   };

//   const handleQuantityChange = (productId, action) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId
//         ? {
//             ...product,
//             selectedQuantity:
//               action === 'increase'
//                 ? product.selectedQuantity + 1
//                 : Math.max(product.selectedQuantity - 1, 1),
//           }
//         : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleRemoveProduct = (productId) => {
//     setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
//   };

//   const calculateTotalPrice = () => {
//     return selectedProducts.reduce(
//       (total, product) => total + product.price * product.selectedQuantity,
//       0
//     );
//   };

//   const handleCheckout = async () => {
//     if (!userData.name || !userData.rentalDate || !userData.returnDate) {
//       setErrorMessage('Please fill out all fields before checking out.');
//       setShowErrorModal(true);
//       return;
//     }

//     if (new Date(userData.returnDate) < new Date(userData.rentalDate)) {
//       setErrorMessage('Return date cannot be before the rental date.');
//       setShowErrorModal(true);
//       return;
//     }

//     const rentalData = {
//       ...userData,
//       products: selectedProducts.map((product) => ({
//         productId: product._id,
//         name: product.name,
//         quantity: product.selectedQuantity,
//         price: product.price,
//       })),
//     };

//     try {
//       const response = await checkoutRental(rentalData);
//       if (response) {
//         setSelectedProducts([]);
//         setCheckoutStatus('success');
//         setShowSuccessModal(true);
//         fetchProducts();
//       } else {
//         setCheckoutStatus('error');
//         setErrorMessage('Checkout failed. Please try again.');
//         setShowErrorModal(true);
//       }
//     } catch (error) {
//       setCheckoutStatus('error');
//       setErrorMessage('Error during checkout. Please try again.');
//       setShowErrorModal(true);
//       console.error('Error during checkout:', error);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Checkout Summary', 14, 22);
//     doc.autoTable({
//       head: [['Product Name', 'Category', 'Price (₹)', 'Quantity']],
//       body: selectedProducts.map((product) => [
//         product.name,
//         product.category,
//         `₹${product.price}`,
//         product.selectedQuantity.toString(),
//       ]),
//       startY: 30,
//     });
//     doc.save('checkout-summary.pdf');
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <form className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <label className="block">
//           Your Name:
//           <input
//             type="text"
//             value={userData.name}
//             onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//             placeholder="Your Name"
//             className="p-3 border border-gray-300 rounded"
//             required
//           />
//         </label>
//         <label className="block">
//           Rental Date:
//           <input
//             type="date"
//             value={userData.rentalDate}
//             onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
//             className="p-3 border border-gray-300 rounded"
//             required
//           />
//         </label>
//         <label className="block">
//           Return Date:
//           <input
//             type="date"
//             value={userData.returnDate}
//             onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
//             className="p-3 border border-gray-300 rounded"
//             required
//           />
//         </label>
//       </form>

//       {/* Search Field */}
//       <div className="mb-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearch}
//           placeholder="Search products..."
//           className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//         />
//       </div>

//       {/* Available Products */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Available Products:</h2>
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Product Name</th>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Category</th>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Price</th>
//               <th className="py-3 px-4 text-center font-medium text-gray-700">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <button
//                     onClick={() => handleProductSelection(product)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={`mx-1 px-3 py-1 rounded ${
//                 currentPage === index + 1
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Selected Products Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Selected Products:</h2>
//         {selectedProducts.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left font-medium text-gray-700">Product Name</th>
//                 <th className="py-3 px-4 text-left font-medium text-gray-700">Category</th>
//                 <th className="py-3 px-4 text-left font-medium text-gray-700">Price</th>
//                 <th className="py-3 px-4 text-center font-medium text-gray-700">Quantity</th>
//                 <th className="py-3 px-4 text-center font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedProducts.map((product) => (
//                 <tr key={product._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{product.name}</td>
//                   <td className="py-3 px-4 border-b">{product.category}</td>
//                   <td className="py-3 px-4 border-b">₹{product.price}</td>
//                   <td className="py-3 px-4 border-b text-center">{product.selectedQuantity}</td>
//                   <td className="py-3 px-4 border-b text-center">
//                     <div className="inline-flex space-x-2">
//                       <button
//                         onClick={() => handleQuantityChange(product._id, 'increase')}
//                         className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
//                       >
//                         <FontAwesomeIcon icon={faPlus} />
//                       </button>
//                       <button
//                         onClick={() => handleQuantityChange(product._id, 'decrease')}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
//                       >
//                         <FontAwesomeIcon icon={faMinus} />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveProduct(product._id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-lg font-semibold text-gray-700">No products selected yet.</p>
//         )}

//         {/* Total Price Section */}
//         <div className="flex justify-between items-center mt-4">
//           <h2 className="text-lg font-semibold">Total Price: ₹{calculateTotalPrice()}</h2>
//           <div className="flex space-x-4">
//             <button
//               onClick={handleCheckout}
//               className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//             >
//               Checkout
//             </button>
//             <Link href="/rented-clothes" legacyBehavior>
//               <button className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200">
//                 View Rented Products
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {showSuccessModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-green-100 p-5 rounded-lg shadow-lg text-green-800">
//             <h2 className="text-lg font-semibold mb-2">Success</h2>
//             <p>Checkout successful! Inventory updated.</p>
//             <button
//               onClick={() => setShowSuccessModal(false)}
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {showErrorModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-red-100 p-5 rounded-lg shadow-lg text-red-800">
//             <h2 className="text-lg font-semibold mb-2">Error</h2>
//             <p>{errorMessage}</p>
//             <button
//               onClick={() => setShowErrorModal(false)}
//               className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {checkoutStatus === 'success' && (
//         <button
//           onClick={generatePDF}
//           className="mt-4 p-3 bg-purple-600 text-white rounded-lg shadow-lg"
//         >
//           Generate PDF
//         </button>
//       )}

//       {/* Back to Main Page Button */}
//       <div className="mt-6 flex justify-center">
//         <Link href="/" legacyBehavior>
//           <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg transition duration-200">
//             Back to Main Page
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { getProducts, checkoutRental } from '../services/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';

// export default function Checkout() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [userData, setUserData] = useState({ name: '', mobile: '', rentalDate: '', returnDate: '' });
//   const [checkoutStatus, setCheckoutStatus] = useState(null);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);

//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm) ||
//       product.category.toLowerCase().includes(searchTerm)
//     );

//     setFilteredProducts(filtered);
//     setCurrentPage(1); // Reset to the first page when a new search is made
//   };

//   const handleProductSelection = (product) => {
//     const existingProduct = selectedProducts.find((p) => p._id === product._id);
//     const updatedProducts = existingProduct
//       ? selectedProducts.map((p) =>
//           p._id === product._id
//             ? { ...p, selectedQuantity: p.selectedQuantity + 1, advanceAmount: p.advanceAmount || 0 }
//             : p
//         )
//       : [...selectedProducts, { ...product, selectedQuantity: 1, advanceAmount: 0 }];

//     setSelectedProducts(updatedProducts);
//   };

//   const handleQuantityChange = (productId, action) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId
//         ? {
//             ...product,
//             selectedQuantity:
//               action === 'increase'
//                 ? product.selectedQuantity + 1
//                 : Math.max(product.selectedQuantity - 1, 1),
//           }
//         : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handlePriceChange = (productId, newPrice) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId ? { ...product, price: parseFloat(newPrice) } : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleAdvanceChange = (productId, amount) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId ? { ...product, advanceAmount: parseFloat(amount) || 0 } : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleRemoveProduct = (productId) => {
//     setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
//   };

//   const calculateTotalPrice = () => {
//     return selectedProducts.reduce(
//       (total, product) => total + product.price * product.selectedQuantity,
//       0
//     );
//   };

  
//   const calculateRemainingAmount = () => {
//     const totalAdvance = selectedProducts.reduce((acc, product) => acc + (product.advanceAmount || 0), 0);
//     return calculateTotalPrice() - totalAdvance;
//   };
  

//   const handleCheckout = async () => {
//     if (!userData.name || !userData.mobile || !userData.rentalDate || !userData.returnDate) {
//       setErrorMessage('Please fill out all fields before checking out.');
//       setShowErrorModal(true);
//       return;
//     }

//     if (new Date(userData.returnDate) < new Date(userData.rentalDate)) {
//       setErrorMessage('Return date cannot be before the rental date.');
//       setShowErrorModal(true);
//       return;
//     }

//     const rentalData = {
//       ...userData,
//       products: selectedProducts.map((product) => ({
//         productId: product._id,
//         name: product.name,
//         quantity: product.selectedQuantity,
//         price: product.price,
//         advanceAmount: product.advanceAmount,
//       })),
//       remainingAmount: calculateRemainingAmount(),
//     };

//     try {
//       const response = await checkoutRental(rentalData);
//       if (response) {
//         setSelectedProducts([]);
//         setCheckoutStatus('success');
//         setShowSuccessModal(true);
//         fetchProducts();
//       } else {
//         setCheckoutStatus('error');
//         setErrorMessage('Checkout failed. Please try again.');
//         setShowErrorModal(true);
//       }
//     } catch (error) {
//       setCheckoutStatus('error');
//       setErrorMessage('Error during checkout. Please try again.');
//       setShowErrorModal(true);
//       console.error('Error during checkout:', error);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Checkout Summary', 14, 22);
//     doc.autoTable({
//       head: [['Product Name', 'Category', 'Price (₹)', 'Quantity', 'Advance Amount (₹)']],
//       body: selectedProducts.map((product) => [
//         product.name,
//         product.category,
//         `₹${product.price}`,
//         product.selectedQuantity.toString(),
//         `₹${product.advanceAmount}`,
//       ]),
//       startY: 30,
//     });
//     doc.text(`Total Amount: ₹${calculateTotalPrice()}`, 14, doc.lastAutoTable.finalY + 10);
//     doc.text(`Total Advance: ₹${selectedProducts.reduce((acc, p) => acc + (p.advanceAmount || 0), 0)}`, 14, doc.lastAutoTable.finalY + 20);
//     doc.text(`Remaining Amount: ₹${calculateRemainingAmount()}`, 14, doc.lastAutoTable.finalY + 30);
//     doc.save('checkout-summary.pdf');
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <form className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//         <label className="block">
//           Your Name:
//           <input
//             type="text"
//             value={userData.name}
//             onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//             placeholder="Your Name"
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//         <label className="block">
//           Mobile Number:
//           <input
//             type="tel"
//             value={userData.mobile}
//             onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
//             placeholder="Mobile Number"
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//         <label className="block">
//           Rental Date:
//           <input
//             type="date"
//             value={userData.rentalDate}
//             onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//         <label className="block">
//           Return Date:
//           <input
//             type="date"
//             value={userData.returnDate}
//             onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//       </form>

//       <div className="mb-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearch}
//           placeholder="Search products..."
//           className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//         />
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-md mb-8 overflow-x-auto">
//         <h2 className="text-2xl font-semibold mb-4">Available Products:</h2>
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Product Name</th>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Category</th>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Price</th>
//               <th className="py-3 px-4 text-center font-medium text-gray-700">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <button
//                     onClick={() => handleProductSelection(product)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-center mt-4">
//           {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={`mx-1 px-3 py-1 rounded ${
//                 currentPage === index + 1
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8 overflow-x-auto">
//         <h2 className="text-2xl font-semibold mb-4">Selected Products:</h2>
//         {selectedProducts.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left font-medium text-gray-700">Product Name</th>
//                 <th className="py-2 px-4 text-left font-medium text-gray-700">Category</th>
//                 <th className="py-2 px-4 text-left font-medium text-gray-700">Price</th>
//                 <th className="py-2 px-4 text-center font-medium text-gray-700">Quantity</th>
//                 <th className="py-2 px-4 text-center font-medium text-gray-700">Advance Amount</th>
//                 <th className="py-2 px-4 text-center font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedProducts.map((product) => (
//                 <tr key={product._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{product.name}</td>
//                   <td className="py-3 px-4 border-b">{product.category}</td>
//                   <td className="py-3 px-4 border-b">
//                     <input
//                       type="number"
//                       value={product.price}
//                       onChange={(e) => handlePriceChange(product._id, e.target.value)}
//                       className="w-20 p-1 border border-gray-300 rounded text-center"
//                     />
//                   </td>
//                   <td className="py-3 px-4 border-b text-center">{product.selectedQuantity}</td>
//                   <td className="py-3 px-4 border-b text-center">
//                     <input
//                       type="number"
//                       value={product.advanceAmount}
//                       onChange={(e) => handleAdvanceChange(product._id, e.target.value)}
//                       className="p-2 border border-gray-300 rounded w-full text-center"
//                     />
//                   </td>
//                   <td className="py-3 px-4 border-b text-center">
//                     <div className="inline-flex space-x-2">
//                       <button
//                         onClick={() => handleQuantityChange(product._id, 'increase')}
//                         className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
//                       >
//                         <FontAwesomeIcon icon={faPlus} />
//                       </button>
//                       <button
//                         onClick={() => handleQuantityChange(product._id, 'decrease')}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
//                       >
//                         <FontAwesomeIcon icon={faMinus} />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveProduct(product._id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-lg font-semibold text-gray-700">No products selected yet.</p>
//         )}

//         <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
//           <h2 className="text-lg font-semibold">Total Price: ₹{calculateTotalPrice()}</h2>
//           <h2 className="text-lg font-semibold">Remaining Amount: ₹{calculateRemainingAmount()}</h2>
//           <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
//             <button
//               onClick={handleCheckout}
//               className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//             >
//               Checkout
//             </button>
//             <Link href="/rented-clothes" legacyBehavior>
//               <button className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200">
//                 View Rented Products
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {showSuccessModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-green-100 p-5 rounded-lg shadow-lg text-green-800">
//             <h2 className="text-lg font-semibold mb-2">Success</h2>
//             <p>Checkout successful! Inventory updated.</p>
//             <button
//               onClick={() => setShowSuccessModal(false)}
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {showErrorModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-red-100 p-5 rounded-lg shadow-lg text-red-800">
//             <h2 className="text-lg font-semibold mb-2">Error</h2>
//             <p>{errorMessage}</p>
//             <button
//               onClick={() => setShowErrorModal(false)}
//               className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {checkoutStatus === 'success' && (
//         <button
//           onClick={generatePDF}
//           className="mt-4 p-3 bg-purple-600 text-white rounded-lg shadow-lg"
//         >
//           Generate PDF
//         </button>
//       )}

//       <div className="mt-6 flex justify-center">
//         <Link href="/" legacyBehavior>
//           <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg transition duration-200">
//             Back to Main Page
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { getProducts, checkoutRental } from '../services/api'; // Import your API functions
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';

// export default function Checkout() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [userData, setUserData] = useState({ name: '', mobile: '', rentalDate: '', returnDate: '' });
//   const [checkoutStatus, setCheckoutStatus] = useState(null);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//       setFilteredProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm)
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   };

//   const handleProductSelection = (product) => {
//     const existingProduct = selectedProducts.find((p) => p._id === product._id);
//     const updatedProducts = existingProduct
//       ? selectedProducts.map((p) =>
//           p._id === product._id
//             ? { ...p, selectedQuantity: p.selectedQuantity + 1, advanceAmount: p.advanceAmount || 0 }
//             : p
//         )
//       : [...selectedProducts, { ...product, selectedQuantity: 1, advanceAmount: 0 }];

//     setSelectedProducts(updatedProducts);
//   };

//   const handleQuantityChange = (productId, action) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId
//         ? {
//             ...product,
//             selectedQuantity:
//               action === 'increase'
//                 ? product.selectedQuantity + 1
//                 : Math.max(product.selectedQuantity - 1, 1),
//           }
//         : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handlePriceChange = (productId, newPrice) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId ? { ...product, price: parseFloat(newPrice) } : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleAdvanceChange = (productId, amount) => {
//     const updatedProducts = selectedProducts.map((product) =>
//       product._id === productId ? { ...product, advanceAmount: parseFloat(amount) || 0 } : product
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   const handleRemoveProduct = (productId) => {
//     setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
//   };

//   const calculateTotalPrice = () => {
//     return selectedProducts.reduce(
//       (total, product) => total + product.price * product.selectedQuantity,
//       0
//     );
//   };

//   const calculateRemainingAmount = () => {
//     const totalAdvance = selectedProducts.reduce((acc, product) => acc + (product.advanceAmount || 0), 0);
//     return calculateTotalPrice() - totalAdvance;
//   };

//   const handleCheckout = async () => {
//     if (!userData.name || !userData.mobile || !userData.rentalDate || !userData.returnDate) {
//       setErrorMessage('Please fill out all fields before checking out.');
//       setShowErrorModal(true);
//       return;
//     }

//     if (new Date(userData.returnDate) < new Date(userData.rentalDate)) {
//       setErrorMessage('Return date cannot be before the rental date.');
//       setShowErrorModal(true);
//       return;
//     }

//     const rentalData = {
//       ...userData,
//       products: selectedProducts.map((product) => ({
//         productId: product._id,
//         name: product.name,
//         quantity: product.selectedQuantity,
//         price: product.price,
//         advanceAmount: product.advanceAmount,
//       })),
//       remainingAmount: calculateRemainingAmount(),
//     };

//     try {
//       const response = await checkoutRental(rentalData);
//       if (response) {
//         setSelectedProducts([]);
//         setCheckoutStatus('success');
//         setShowSuccessModal(true);
//         fetchProducts(); // Fetch updated product list after checkout
//       } else {
//         setCheckoutStatus('error');
//         setErrorMessage('Checkout failed. Please try again.');
//         setShowErrorModal(true);
//       }
//     } catch (error) {
//       setCheckoutStatus('error');
//       setErrorMessage('Error during checkout. Please try again.');
//       setShowErrorModal(true);
//       console.error('Error during checkout:', error);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Checkout Summary', 14, 22);
//     doc.autoTable({
//       head: [['Product Name', 'Category', 'Price (₹)', 'Quantity', 'Advance Amount (₹)']],
//       body: selectedProducts.map((product) => [
//         product.name,
//         product.category,
//         `₹${product.price}`,
//         product.selectedQuantity.toString(),
//         `₹${product.advanceAmount}`,
//       ]),
//       startY: 30,
//     });
//     doc.text(`Total Amount: ₹${calculateTotalPrice()}`, 14, doc.lastAutoTable.finalY + 10);
//     doc.text(`Total Advance: ₹${selectedProducts.reduce((acc, p) => acc + (p.advanceAmount || 0), 0)}`, 14, doc.lastAutoTable.finalY + 20);
//     doc.text(`Remaining Amount: ₹${calculateRemainingAmount()}`, 14, doc.lastAutoTable.finalY + 30);
//     doc.save('checkout-summary.pdf');
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <form className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//         <label className="block">
//           Your Name:
//           <input
//             type="text"
//             value={userData.name}
//             onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//             placeholder="Your Name"
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//         <label className="block">
//           Mobile Number:
//           <input
//             type="tel"
//             value={userData.mobile}
//             onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
//             placeholder="Mobile Number"
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//         <label className="block">
//           Rental Date:
//           <input
//             type="date"
//             value={userData.rentalDate}
//             onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//         <label className="block">
//           Return Date:
//           <input
//             type="date"
//             value={userData.returnDate}
//             onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
//             className="p-3 border border-gray-300 rounded w-full"
//             required
//           />
//         </label>
//       </form>

//       <div className="mb-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearch}
//           placeholder="Search products..."
//           className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//         />
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-md mb-8 overflow-x-auto">
//         <h2 className="text-2xl font-semibold mb-4">Available Products:</h2>
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Product Name</th>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Category</th>
//               <th className="py-3 px-4 text-left font-medium text-gray-700">Price</th>
//               <th className="py-3 px-4 text-center font-medium text-gray-700">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <button
//                     onClick={() => handleProductSelection(product)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-center mt-4">
//           {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={`mx-1 px-3 py-1 rounded ${
//                 currentPage === index + 1
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8 overflow-x-auto">
//         <h2 className="text-2xl font-semibold mb-4">Selected Products:</h2>
//         {selectedProducts.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left font-medium text-gray-700">Product Name</th>
//                 <th className="py-2 px-4 text-left font-medium text-gray-700">Category</th>
//                 <th className="py-2 px-4 text-left font-medium text-gray-700">Price</th>
//                 <th className="py-2 px-4 text-center font-medium text-gray-700">Quantity</th>
//                 <th className="py-2 px-4 text-center font-medium text-gray-700">Advance Amount</th>
//                 <th className="py-2 px-4 text-center font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedProducts.map((product) => (
//                 <tr key={product._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{product.name}</td>
//                   <td className="py-3 px-4 border-b">{product.category}</td>
//                   <td className="py-3 px-4 border-b">
//                     <input
//                       type="number"
//                       value={product.price}
//                       onChange={(e) => handlePriceChange(product._id, e.target.value)}
//                       className="w-20 p-1 border border-gray-300 rounded text-center"
//                     />
//                   </td>
//                   <td className="py-3 px-4 border-b text-center">{product.selectedQuantity}</td>
//                   <td className="py-3 px-4 border-b text-center">
//                     <input
//                       type="number"
//                       value={product.advanceAmount}
//                       onChange={(e) => handleAdvanceChange(product._id, e.target.value)}
//                       className="p-2 border border-gray-300 rounded w-full text-center"
//                     />
//                   </td>
//                   <td className="py-3 px-4 border-b text-center">
//                     <div className="inline-flex space-x-2">
//                       <button
//                         onClick={() => handleQuantityChange(product._id, 'increase')}
//                         className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
//                       >
//                         <FontAwesomeIcon icon={faPlus} />
//                       </button>
//                       <button
//                         onClick={() => handleQuantityChange(product._id, 'decrease')}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
//                       >
//                         <FontAwesomeIcon icon={faMinus} />
//                       </button>
//                       <button
//                         onClick={() => handleRemoveProduct(product._id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-lg font-semibold text-gray-700">No products selected yet.</p>
//         )}

//         <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
//           <h2 className="text-lg font-semibold">Total Price: ₹{calculateTotalPrice()}</h2>
//           <h2 className="text-lg font-semibold">Remaining Amount: ₹{calculateRemainingAmount()}</h2>
//           <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
//             <button
//               onClick={handleCheckout}
//               className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//             >
//               Checkout
//             </button>
//             <Link href="/rented-clothes" legacyBehavior>
//               <button className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200">
//                 View Rented Products
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {showSuccessModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-green-100 p-5 rounded-lg shadow-lg text-green-800">
//             <h2 className="text-lg font-semibold mb-2">Success</h2>
//             <p>Checkout successful! Inventory updated.</p>
//             <button
//               onClick={() => setShowSuccessModal(false)}
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {showErrorModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-red-100 p-5 rounded-lg shadow-lg text-red-800">
//             <h2 className="text-lg font-semibold mb-2">Error</h2>
//             <p>{errorMessage}</p>
//             <button
//               onClick={() => setShowErrorModal(false)}
//               className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {checkoutStatus === 'success' && (
//         <button
//           onClick={generatePDF}
//           className="mt-4 p-3 bg-purple-600 text-white rounded-lg shadow-lg"
//         >
//           Generate PDF
//         </button>
//       )}

//       <div className="mt-6 flex justify-center">
//         <Link href="/" legacyBehavior>
//           <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg transition duration-200">
//             Back to Main Page
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { getProducts, checkoutRental } from '../services/api'; // Import your API functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Link from 'next/link';
import Select from 'react-select'; // Import react-select for searchable dropdown

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userData, setUserData] = useState({ name: '', mobile: '', rentalDate: '', returnDate: '' });
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductSelection = (product) => {
    const existingProduct = selectedProducts.find((p) => p._id === product._id);
    const updatedProducts = existingProduct
      ? selectedProducts.map((p) =>
          p._id === product._id
            ? { ...p, selectedQuantity: p.selectedQuantity + 1, advanceAmount: p.advanceAmount || 0 }
            : p
        )
      : [...selectedProducts, { ...product, selectedQuantity: 1, advanceAmount: 0 }];

    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (productId, action) => {
    const updatedProducts = selectedProducts.map((product) =>
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
    setSelectedProducts(updatedProducts);
  };

  const handlePriceChange = (productId, newPrice) => {
    const updatedProducts = selectedProducts.map((product) =>
      product._id === productId ? { ...product, price: parseFloat(newPrice) } : product
    );
    setSelectedProducts(updatedProducts);
  };

  const handleAdvanceChange = (productId, amount) => {
    const updatedProducts = selectedProducts.map((product) =>
      product._id === productId ? { ...product, advanceAmount: parseFloat(amount) || 0 } : product
    );
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.selectedQuantity,
      0
    );
  };

  const calculateRemainingAmount = () => {
    const totalAdvance = selectedProducts.reduce((acc, product) => acc + (product.advanceAmount || 0), 0);
    return calculateTotalPrice() - totalAdvance;
  };

  const handleCheckout = async () => {
    if (!userData.name || !userData.mobile || !userData.rentalDate || !userData.returnDate) {
      setErrorMessage('Please fill out all fields before checking out.');
      setShowErrorModal(true);
      return;
    }

    if (new Date(userData.returnDate) < new Date(userData.rentalDate)) {
      setErrorMessage('Return date cannot be before the rental date.');
      setShowErrorModal(true);
      return;
    }

    const rentalData = {
      ...userData,
      products: selectedProducts.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: product.selectedQuantity,
        price: product.price,
        advanceAmount: product.advanceAmount,
      })),
      remainingAmount: calculateRemainingAmount(),
    };

    try {
      const response = await checkoutRental(rentalData);
      if (response) {
        setSelectedProducts([]);
        setCheckoutStatus('success');
        setShowSuccessModal(true);
        fetchProducts(); // Fetch updated product list after checkout
      } else {
        setCheckoutStatus('error');
        setErrorMessage('Checkout failed. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setCheckoutStatus('error');
      setErrorMessage('Error during checkout. Please try again.');
      setShowErrorModal(true);
      console.error('Error during checkout:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Checkout Summary', 14, 22);
    doc.autoTable({
      head: [['Product Name', 'Category', 'Price (₹)', 'Quantity', 'Advance Amount (₹)']],
      body: selectedProducts.map((product) => [
        product.name,
        product.category,
        `₹${product.price}`,
        product.selectedQuantity.toString(),
        `₹${product.advanceAmount}`,
      ]),
      startY: 30,
    });
    doc.text(`Total Amount: ₹${calculateTotalPrice()}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Advance: ₹${selectedProducts.reduce((acc, p) => acc + (p.advanceAmount || 0), 0)}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Remaining Amount: ₹${calculateRemainingAmount()}`, 14, doc.lastAutoTable.finalY + 30);
    doc.save('checkout-summary.pdf');
  };

  // Prepare product options for the Select component
  const productOptions = products.map((product) => ({
    value: product._id,
    label: `${product.name} - ${product.category} - ₹${product.price}`,
    product, // Attach the full product object to use later
  }));

  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) return;

    const selectedProduct = selectedOption.product;
    handleProductSelection(selectedProduct);
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-start items-center p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl">
        <label className="block">
          Your Name:
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
        </label>
        <label className="block">
          Mobile Number:
          <input
            type="tel"
            value={userData.mobile}
            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
            placeholder="Mobile Number"
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
        </label>
        <label className="block">
          Rental Date:
          <input
            type="date"
            value={userData.rentalDate}
            onChange={(e) => setUserData({ ...userData, rentalDate: e.target.value })}
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
        </label>
        <label className="block">
          Return Date:
          <input
            type="date"
            value={userData.returnDate}
            onChange={(e) => setUserData({ ...userData, returnDate: e.target.value })}
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
        </label>
      </form>

      <div className="mb-6 flex flex-col md:flex-row items-center md:justify-between gap-4 w-full max-w-6xl">
        <Select
          options={productOptions}
          onChange={handleSelectChange}
          isSearchable
          placeholder="Search and select products..."
          className="w-full"
        />
      </div>

      {selectedProducts.length > 0 && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8 overflow-x-auto w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4">Selected Products:</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Product Name</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Category</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Price</th>
                <th className="py-2 px-4 text-center font-medium text-gray-700">Quantity</th>
                <th className="py-2 px-4 text-center font-medium text-gray-700">Advance Amount</th>
                <th className="py-2 px-4 text-center font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{product.name}</td>
                  <td className="py-3 px-4 border-b">{product.category}</td>
                  <td className="py-3 px-4 border-b">
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handlePriceChange(product._id, e.target.value)}
                      className="w-20 p-1 border border-gray-300 rounded text-center"
                    />
                  </td>
                  <td className="py-3 px-4 border-b text-center">{product.selectedQuantity}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <input
                      type="number"
                      value={product.advanceAmount}
                      onChange={(e) => handleAdvanceChange(product._id, e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full text-center"
                    />
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="inline-flex space-x-2">
                      <button
                        onClick={() => handleQuantityChange(product._id, 'increase')}
                        className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button
                        onClick={() => handleQuantityChange(product._id, 'decrease')}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
            <h2 className="text-lg font-semibold">Total Price: ₹{calculateTotalPrice()}</h2>
            <h2 className="text-lg font-semibold">Remaining Amount: ₹{calculateRemainingAmount()}</h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
              <button
                onClick={handleCheckout}
                className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              >
                Checkout
              </button>
              <Link href="/rented-clothes" legacyBehavior>
                <button className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200">
                  View Rented Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-100 p-5 rounded-lg shadow-lg text-green-800">
            <h2 className="text-lg font-semibold mb-2">Success</h2>
            <p>Checkout successful! Inventory updated.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-red-100 p-5 rounded-lg shadow-lg text-red-800">
            <h2 className="text-lg font-semibold mb-2">Error</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {checkoutStatus === 'success' && (
        <button
          onClick={generatePDF}
          className="mt-4 p-3 bg-purple-600 text-white rounded-lg shadow-lg"
        >
          Generate PDF
        </button>
      )}

      <div className="mt-6 flex justify-center">
        <Link href="/" legacyBehavior>
          <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg transition duration-200">
            Back to Main Page
          </button>
        </Link>
      </div>
    </div>
  );
}

