// import { useState, useEffect } from "react";
// import { getProducts, addProduct, updateProduct, deleteProduct } from "../../services/api";

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
//     <div>
//       <h1>Inventory Management</h1>
//       <div>
//         <input
//           type="text"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           placeholder="Product Name"
//         />
//         <select
//           value={newProduct.category}
//           onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
//         />
//         <input
//           type="number"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//           placeholder="Price"
//         />
//         <button onClick={handleAddProduct}>Add Product</button>
//       </div>

//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             {product.name} - {product.category} - {product.quantity} - ${product.price}
//             <button onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}>+</button>
//             <button onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}>-</button>
//             <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../services/api";
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      
      <form className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product Name"
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="p-2 border border-gray-300 rounded"
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
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          placeholder="Price"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleAddProduct}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Product
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Product Name</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
              <td className="py-2 px-4 border-b text-center">₹{product.price}</td>
              <td className="py-2 px-4 border-b text-center">
                <div className="inline-flex space-x-2">
                  <button
                    onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}
                    className="p-2 bg-blue-500 text-white rounded-full"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}
                    className="p-2 bg-blue-500 text-white rounded-full"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-2 bg-blue-500 text-white rounded-full"
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
  );
}
