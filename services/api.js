// // services/api.js

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export const getProducts = async () => {
//   try {
//     const response = await fetch(`${apiUrl}/inventory`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

// export const addProduct = async (product) => {
//   try {
//     const response = await fetch(`${apiUrl}/inventory`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(product),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error adding product:', error);
//     throw error;
//   }
// };

// export const updateProduct = async (id, updatedProduct) => {
//   try {
//     const response = await fetch(`${apiUrl}/inventory/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedProduct),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error updating product:', error);
//     throw error;
//   }
// };

// export const deleteProduct = async (id) => {
//   try {
//     const response = await fetch(`${apiUrl}/inventory/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     throw error;
//   }
// };

// export const checkoutRental = async (rentalData) => {
//   try {
//     const response = await fetch(`${apiUrl}/rental/checkout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(rentalData),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     throw error;
//   }
// };

// export const getRentedClothes = async () => {
//   try {
//     const response = await fetch(`${apiUrl}/rental/rented`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching rented clothes:', error);
//     throw error;
//   }
// };

// export const markAsReturned = async (rentalId) => {
//   try {
//     const response = await fetch(`${apiUrl}/rental/return/${rentalId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error marking as returned:', error);
//     throw error;
//   }
// };

// export const deleteRental = async (rentalId) => {
//   try {
//     const response = await fetch(`${apiUrl}/rental/${rentalId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error deleting rental:', error);
//     throw error;
//   }
// };


// services/api.js

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch all products from the inventory
export const getProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/inventory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add a new product to the inventory
export const addProduct = async (product) => {
  try {
    const response = await fetch(`${apiUrl}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update an existing product in the inventory
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${apiUrl}/inventory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product from the inventory
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Checkout process for rental, sending selected products and user data
export const checkoutRental = async (rentalData) => {
  try {
    const response = await fetch(`${apiUrl}/rental/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rentalData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

// Fetch all rented clothes data
export const getRentedClothes = async () => {
  try {
    const response = await fetch(`${apiUrl}/rental/rented`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching rented clothes:', error);
    throw error;
  }
};

// Mark a rental as returned
export const markAsReturned = async (rentalId) => {
  try {
    const response = await fetch(`${apiUrl}/rental/return/${rentalId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error marking as returned:', error);
    throw error;
  }
};

// Delete a rental by ID
export const deleteRental = async (rentalId) => {
  try {
    const response = await fetch(`${apiUrl}/rental/${rentalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting rental:', error);
    throw error;
  }
};
