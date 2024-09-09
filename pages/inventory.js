// import { useState, useEffect } from 'react';
// import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

// export default function Inventory() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', category: 'Jeans', quantity: 0, price: 0 });

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

//   const handleAddProduct = async () => {
//     try {
//       await addProduct(newProduct);
//       setNewProduct({ name: '', category: 'Jeans', quantity: 0, price: 0 });
//       fetchProducts();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const handleUpdateProduct = async (id, updatedProduct) => {
//     try {
//       await updateProduct(id, updatedProduct);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     try {
//       await deleteProduct(id);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Inventory Management</h1>

//       <form className="grid grid-cols-1 gap-6 mb-8 p-6 shadow-lg rounded-lg">
//         <input
//           type="text"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           placeholder="Product Name"
//           className="p-3 border border-gray-300 rounded"
//         />
//         <select
//           value={newProduct.category}
//           onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//           className="p-3 border border-gray-300 rounded"
//         >
//           <option value="Jeans">Jeans</option>
//           <option value="Shirts">Shirts</option>
//           <option value="T-Shirts">T-Shirts</option>
//         </select>
//         <input
//           type="number"
//           value={newProduct.quantity}
//           onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
//           placeholder="Quantity"
//           className="p-3 border border-gray-300 rounded"
//         />
//         <input
//           type="number"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//           placeholder="Price"
//           className="p-3 border border-gray-300 rounded"
//         />
//         <button
//           type="button"
//           onClick={handleAddProduct}
//           className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-4"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Product Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Price</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b text-center">{product.quantity}</td>
//                 <td className="py-3 px-4 border-b text-center">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <div className="inline-flex space-x-2">
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
//                       className="p-2 bg-green-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
//                       className="p-2 bg-yellow-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product._id)}
//                       className="p-2 bg-red-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

// export default function Inventory() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', category: 'Jeans', quantity: 0, price: 0 });
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

//   const handleAddProduct = async () => {
//     try {
//       await addProduct(newProduct);
//       setNewProduct({ name: '', category: 'Jeans', quantity: 0, price: 0 });
//       fetchProducts();
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the message after 3 seconds
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const handleUpdateProduct = async (id, updatedProduct) => {
//     try {
//       await updateProduct(id, updatedProduct);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const confirmDeleteProduct = (id) => {
//     setProductToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteProduct = async () => {
//     try {
//       await deleteProduct(productToDelete);
//       fetchProducts();
//       setShowDeleteModal(false);
//       setProductToDelete(null);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       setShowDeleteModal(false);
//       setProductToDelete(null);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Inventory Management</h1>

//       {showSuccessMessage && (
//         <div role="alert" className="alert alert-success mb-4 flex items-center space-x-2 bg-green-100 p-4 rounded-lg shadow-md text-green-800">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 shrink-0 stroke-current"
//             fill="none"
//             viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>Produced Added Succcessfully!</span>
//         </div>
//       )}

//       <form className="grid grid-cols-1 gap-6 mb-8 p-6 shadow-lg rounded-lg">
//         <input
//           type="text"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           placeholder="Product Name"
//           className="p-3 border border-gray-300 rounded"
//         />
//         <select
//           value={newProduct.category}
//           onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//           className="p-3 border border-gray-300 rounded"
//         >
//           <option value="Jeans">Jeans</option>
//           <option value="Shirts">Shirts</option>
//           <option value="T-Shirts">T-Shirts</option>
//         </select>
//         <input
//           type="number"
//           value={newProduct.quantity}
//           onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
//           placeholder="Quantity"
//           className="p-3 border border-gray-300 rounded"
//         />
//         <input
//           type="number"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//           placeholder="Price"
//           className="p-3 border border-gray-300 rounded"
//         />
//         <button
//           type="button"
//           onClick={handleAddProduct}
//           className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-4"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Product Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Price</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b text-center">{product.quantity}</td>
//                 <td className="py-3 px-4 border-b text-center">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <div className="inline-flex space-x-2">
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
//                       className="p-2 bg-green-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
//                       className="p-2 bg-yellow-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <button
//                       onClick={() => confirmDeleteProduct(product._id)}
//                       className="p-2 bg-red-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h2>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={handleDeleteProduct}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

// export default function Inventory() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', category: '', quantity: '', price: '' });
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);
//   const [errors, setErrors] = useState({});

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

//   const validateFields = () => {
//     const newErrors = {};
//     if (!newProduct.name) newErrors.name = 'Product name is required.';
//     if (!newProduct.category) newErrors.category = 'Category is required.';
//     if (newProduct.quantity === '') newErrors.quantity = 'Quantity is required.';
//     if (newProduct.price === '') newErrors.price = 'Price is required.';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleAddProduct = async () => {
//     if (!validateFields()) return;

//     try {
//       await addProduct({
//         ...newProduct,
//         quantity: parseInt(newProduct.quantity, 10),
//         price: parseFloat(newProduct.price),
//       });
//       setNewProduct({ name: '', category: '', quantity: '', price: '' });
//       setErrors({});
//       fetchProducts();
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the message after 3 seconds
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const handleUpdateProduct = async (id, updatedProduct) => {
//     try {
//       await updateProduct(id, updatedProduct);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const confirmDeleteProduct = (id) => {
//     setProductToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteProduct = async () => {
//     try {
//       await deleteProduct(productToDelete);
//       fetchProducts();
//       setShowDeleteModal(false);
//       setProductToDelete(null);
//       setShowDeleteSuccessMessage(true);
//       setTimeout(() => setShowDeleteSuccessMessage(false), 3000); // Hide the delete success message after 3 seconds
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       setShowDeleteModal(false);
//       setProductToDelete(null);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Inventory Management</h1>

//       {showSuccessMessage && (
//         <div
//           role="alert"
//           className="alert alert-success mb-4 flex items-center space-x-2 bg-green-100 p-4 rounded-lg shadow-md text-green-800"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 shrink-0 stroke-current"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>Your purchase has been confirmed!</span>
//         </div>
//       )}

//       {showDeleteSuccessMessage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div
//             role="alert"
//             className="alert alert-error flex items-center space-x-2 bg-red-100 p-4 rounded-lg shadow-md text-green-800"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 shrink-0 stroke-current"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>Product has been successfully deleted!</span>
//           </div>
//         </div>
//       )}

//       <form className="grid grid-cols-1 gap-6 mb-8 p-6 shadow-lg rounded-lg">
//         <label className="block">
//           Product Name:
//           <input
//             type="text"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             placeholder=""
//             className="p-3 border border-gray-300 rounded"
//             required
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//         </label>
//         <label className="block">
//           Category:
//           <select
//             value={newProduct.category}
//             onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//             className="p-3 border border-gray-300 rounded"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Jeans">Jeans</option>
//             <option value="Shirts">Shirts</option>
//             <option value="T-Shirts">T-Shirts</option>
//           </select>
//           {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
//         </label>
//         <label className="block">
//           Quantity:
//           <input
//             type="number"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//             placeholder=""
//             className="p-3 border border-gray-300 rounded"
//             required
//           />
//           {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
//         </label>
//         <label className="block">
//           Price:
//           <input
//             type="number"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             placeholder=""
//             className="p-3 border border-gray-300 rounded"
//             required
//           />
//           {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
//         </label>
//         <button
//           type="button"
//           onClick={handleAddProduct}
//           className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-4"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Product Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Price</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 border-b">{product.name}</td>
//                 <td className="py-3 px-4 border-b">{product.category}</td>
//                 <td className="py-3 px-4 border-b text-center">{product.quantity}</td>
//                 <td className="py-3 px-4 border-b text-center">₹{product.price}</td>
//                 <td className="py-3 px-4 border-b text-center">
//                   <div className="inline-flex space-x-2">
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
//                       className="p-2 bg-green-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
//                       className="p-2 bg-yellow-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <button
//                       onClick={() => confirmDeleteProduct(product._id)}
//                       className="p-2 bg-red-500 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h2>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={handleDeleteProduct}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; // Assuming you are using Next.js

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', quantity: '', price: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

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

  const validateFields = () => {
    const newErrors = {};
    if (!newProduct.name) newErrors.name = 'Product name is required.';
    if (!newProduct.category) newErrors.category = 'Category is required.';
    if (newProduct.quantity === '') newErrors.quantity = 'Quantity is required.';
    if (newProduct.price === '') newErrors.price = 'Price is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateFields()) return;

    try {
      await addProduct({
        ...newProduct,
        quantity: parseInt(newProduct.quantity, 10),
        price: parseFloat(newProduct.price),
      });
      setNewProduct({ name: '', category: '', quantity: '', price: '' });
      setErrors({});
      fetchProducts();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the message after 3 seconds
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const confirmDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productToDelete);
      fetchProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
      setShowDeleteSuccessMessage(true);
      setTimeout(() => setShowDeleteSuccessMessage(false), 3000); // Hide the delete success message after 3 seconds
    } catch (error) {
      console.error('Error deleting product:', error);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  // Calculate current products to display based on pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Inventory Management</h1>

      {showSuccessMessage && (
        <div
          role="alert"
          className="alert alert-success mb-4 flex items-center space-x-2 bg-green-100 p-4 rounded-lg shadow-md text-green-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Product added Successfully in Inventory!</span>
        </div>
      )}

      {showDeleteSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            role="alert"
            className="alert alert-error flex items-center space-x-2 bg-red-100 p-4 rounded-lg shadow-md text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Product has been successfully deleted!</span>
          </div>
        </div>
      )}

      <form className="grid grid-cols-1 gap-6 mb-8 p-6 shadow-lg rounded-lg bg-white">
        <label className="block">
          <span className="text-gray-700">Product Name:</span>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder=""
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </label>
        <label className="block">
          <span className="text-gray-700">Category:</span>
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="p-3 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Jeans">Jeans</option>
            <option value="Shirts">Shirts</option>
            <option value="T-Shirts">T-Shirts</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </label>
        <label className="block">
          <span className="text-gray-700">Quantity:</span>
          <input
            type="number"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            placeholder=""
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </label>
        <label className="block">
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder=""
            className="p-3 border border-gray-300 rounded w-full"
            required
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </label>
        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg mt-4 transition duration-200"
        >
          Add Product
        </button>
      </form>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Product Name</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Category</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Quantity</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{product.name}</td>
                <td className="py-3 px-4 border-b">{product.category}</td>
                <td className="py-3 px-4 border-b text-center">{product.quantity}</td>
                <td className="py-3 px-4 border-b text-center">₹{product.price}</td>
                <td className="py-3 px-4 border-b text-center">
                  <div className="inline-flex space-x-2">
                    <button
                      onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition duration-200"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition duration-200"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <button
                      onClick={() => confirmDeleteProduct(product._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded transition duration-200 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Back to Main Page Button */}
      <div className="mt-6 flex justify-center">
        <Link href="/" legacyBehavior>
          <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-200">
            Back to Main Page
          </button>
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
