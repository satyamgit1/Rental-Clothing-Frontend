// Export the base API URL from environment variables
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all products
export const getProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/inventory`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const res = await fetch(`${API_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error("Failed to add product");
    }
    return await res.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update a product by ID
export const updateProduct = async (id, product) => {
  try {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error("Failed to update product");
    }
    return await res.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Checkout rental
export const checkoutRental = async (rentalData) => {
  try {
    const res = await fetch(`${API_URL}/rental/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });
    if (!res.ok) {
      throw new Error("Failed to checkout rental");
    }
    return await res.json();
  } catch (error) {
    console.error("Error during rental checkout:", error);
    throw error;
  }
};
