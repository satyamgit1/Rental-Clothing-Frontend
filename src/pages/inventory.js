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
      <div className="container">
        <h1>Inventory Management</h1>
        <form>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Product Name"
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            placeholder="Price"
          />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
  
        <ul className="product-list">
          {products.map((product) => (
            <li key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ₹{product.price}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity + 1 })}>
                  +
                </button>
                <button onClick={() => handleUpdateProduct(product._id, { ...product, quantity: product.quantity - 1 })}>
                  -
                </button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  