// Export the base API URL from environment variables
export const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getProducts = async () => {
  const res = await fetch(`${API_URL}/inventory`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return await res.json();
};

export const checkoutRental = async (rentalData) => {
  const res = await fetch(`${API_URL}/rental/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rentalData),
  });
  if (!res.ok) {
    throw new Error("Checkout failed");
  }
  return await res.json();
};

export const getRentedClothes = async () => {
  const res = await fetch(`${API_URL}/rental/rented`);
  if (!res.ok) {
    throw new Error("Failed to fetch rented products");
  }
  return await res.json();
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

// services/api.js

export const markAsReturned = async (rentalId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rental/return/${rentalId}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to mark as returned");
  }
  return await response.json();
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




