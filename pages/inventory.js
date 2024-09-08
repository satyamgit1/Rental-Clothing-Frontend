
// import { useState, useEffect } from "react";
// import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

// export default function Inventory() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "Jeans",
//     quantity: 0,
//     price: 0,
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const data = await getProducts();
//     setProducts(data);
//   };

//   const handleAddProduct = async () => {
//     await addProduct(newProduct);
//     setNewProduct({ name: "", category: "Jeans", quantity: 0, price: 0 });
//     fetchProducts();
//   };

//   const handleUpdateProduct = async (id, updatedProduct) => {
//     await updateProduct(id, updatedProduct);
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id) => {
//     await deleteProduct(id);
//     fetchProducts();
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Inventory Management</h1>

//       <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-white p-6 shadow-lg rounded-lg">
//         <input
//           type="text"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           placeholder="Product Name"
//           className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={newProduct.category}
//           onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//           className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
//           className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="number"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//           placeholder="Price"
//           className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="button"
//           onClick={handleAddProduct}
//           className="col-span-1 md:col-span-2 lg:col-span-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg mt-4 md:mt-0"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-6 text-left text-gray-600">Product Name</th>
//               <th className="py-3 px-6 text-left text-gray-600">Category</th>
//               <th className="py-3 px-6 text-left text-gray-600">Quantity</th>
//               <th className="py-3 px-6 text-left text-gray-600">Price</th>
//               <th className="py-3 px-6 text-center text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-6 border-b border-gray-200">{product.name}</td>
//                 <td className="py-3 px-6 border-b border-gray-200">{product.category}</td>
//                 <td className="py-3 px-6 border-b border-gray-200 text-center">{product.quantity}</td>
//                 <td className="py-3 px-6 border-b border-gray-200 text-center">₹{product.price}</td>
//                 <td className="py-3 px-6 border-b border-gray-200 text-center">
//                   <div className="inline-flex space-x-2">
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
//                       className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button
//                       onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
//                       className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full"
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product._id)}
//                       className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
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


import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Jeans",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    await addProduct(newProduct);
    setNewProduct({ name: "", category: "Jeans", quantity: 0, price: 0 });
    fetchProducts();
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    await updateProduct(id, updatedProduct);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Inventory Management</h1>

      {/* Form for Adding Product */}
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-white p-6 shadow-lg rounded-lg">
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product Name"
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="Jeans">Jeans</option>
          <option value="Shirts">Shirts</option>
          <option value="T-Shirts">T-Shirts</option>
        </select>
        <input
          type="number"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          placeholder="Quantity"
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          placeholder="Price"
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddProduct}
          className="col-span-1 sm:col-span-2 lg:col-span-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg mt-4 sm:mt-0"
        >
          Add Product
        </button>
      </form>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs sm:text-sm md:text-base text-gray-600">Product Name</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm md:text-base text-gray-600">Category</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm md:text-base text-gray-600">Quantity</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm md:text-base text-gray-600">Price</th>
              <th className="py-3 px-4 text-center text-xs sm:text-sm md:text-base text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200 text-xs sm:text-sm md:text-base">{product.name}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-xs sm:text-sm md:text-base">{product.category}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center text-xs sm:text-sm md:text-base">
                  {product.quantity}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-center text-xs sm:text-sm md:text-base">
                  ₹{product.price}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <div className="inline-flex space-x-2">
                    <button
                      onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
