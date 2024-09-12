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
import { faPlus, faMinus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', quantity: '', price: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

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
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      fetchProducts();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
  };

  const confirmDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete);
      fetchProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
      setShowDeleteSuccessMessage(true);
      setTimeout(() => setShowDeleteSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = [...new Set(products.map((product) => product.category))];
  const quantities = categories.map((category) =>
    products.reduce((total, product) => (product.category === category ? total + product.quantity : total), 0)
  );

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: quantities,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderColor: '#ffffff',
        borderWidth: 2,
        borderJoinStyle: 'round',
        hoverOffset: 15,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 20,
          color: '#333',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        bodyFont: {
          size: 14,
        },
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    cutout: '20%',
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Inventory Management</h1>

      {showSuccessMessage && (
        <div
          role="alert"
          className="alert alert-success mb-4 flex items-center space-x-2 bg-green-100 p-4 rounded-lg shadow-md text-green-800"
        >
          <span>Product added successfully in Inventory!</span>
        </div>
      )}

      {showDeleteSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            role="alert"
            className="alert alert-error flex items-center space-x-2 bg-red-100 p-4 rounded-lg shadow-md text-red-800"
          >
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
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Edit</th>
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
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
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

        {/* Pagination Controls */}
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

      {/* Edit Product Modal */}
      {showEditModal && productToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"> {/* Adjusted z-index */}
          <div className="bg-white p-6 rounded-lg shadow-lg z-60"> {/* Ensures modal content is on top */}
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Product Name:</span>
                <input
                  type="text"
                  name="name"
                  value={productToEdit.name}
                  onChange={handleEditChange}
                  className="p-3 border border-gray-300 rounded w-full"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Category:</span>
                <select
                  name="category"
                  value={productToEdit.category}
                  onChange={handleEditChange}
                  className="p-3 border border-gray-300 rounded w-full"
                  required
                >
                  <option value="Jeans">Jeans</option>
                  <option value="Shirts">Shirts</option>
                  <option value="T-Shirts">T-Shirts</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Quantity:</span>
                <input
                  type="number"
                  name="quantity"
                  value={productToEdit.quantity}
                  onChange={handleEditChange}
                  className="p-3 border border-gray-300 rounded w-full"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Price:</span>
                <input
                  type="number"
                  name="price"
                  value={productToEdit.price}
                  onChange={handleEditChange}
                  className="p-3 border border-gray-300 rounded w-full"
                  required
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => handleUpdateProduct(productToEdit._id, productToEdit)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Adjusted z-index */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center z-60"> {/* Ensures modal content is on top */}
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

      {/* Pie Chart Section */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Inventory Distribution by Category</h2>
          <div className="relative h-64">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
