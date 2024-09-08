// import React, { useState, useEffect } from "react";
// import { getRentedClothes, markAsReturned } from "../services/api"; // New API function to mark as returned

// export default function RentedClothes() {
//   const [rentedClothes, setRentedClothes] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     fetchRentedClothes();
//   }, []);

//   const fetchRentedClothes = async () => {
//     try {
//       const data = await getRentedClothes();
//       if (data.length > 0) {
//         setRentedClothes(data);
//       } else {
//         setErrorMessage("No rented products found.");
//       }
//     } catch (error) {
//       setErrorMessage("Failed to load rented products.");
//       console.error("Error fetching rented products:", error);
//     }
//   };

//   const handleReturn = async (rentalId) => {
//     try {
//       const response = await markAsReturned(rentalId);
//       if (response) {
//         alert("Rental marked as returned.");
//         fetchRentedClothes(); // Refresh the list
//       }
//     } catch (error) {
//       console.error("Error marking as returned:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Rented Products</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       {rentedClothes.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Rental Date</th>
//               <th className="py-2 px-4 border-b">Return Date</th>
//               <th className="py-2 px-4 border-b">Total Price</th>
//               <th className="py-2 px-4 border-b">Products</th>
//               <th className="py-2 px-4 border-b">Returned</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rentedClothes.map((rental) => (
//               <tr key={rental._id}>
//                 <td className="py-2 px-4 border-b">{rental.name}</td>
//                 <td className="py-2 px-4 border-b">{new Date(rental.rentalDate).toLocaleDateString()}</td>
//                 <td className="py-2 px-4 border-b">{new Date(rental.returnDate).toLocaleDateString()}</td>
//                 <td className="py-2 px-4 border-b">₹{rental.totalPrice}</td>
//                 <td className="py-2 px-4 border-b">
//                   {rental.products.map((product, index) => (
//                     <div key={index}>
//                       {product.name} (x{product.quantity}) - ₹{product.price * product.quantity}
//                     </div>
//                   ))}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {rental.returned ? "Yes" : "No"}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {!rental.returned && (
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                       onClick={() => handleReturn(rental._id)}
//                     >
//                       Mark as Returned
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No rented products available.</p>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { getRentedClothes, markAsReturned } from "../services/api"; // New API function to mark as returned

export default function RentedClothes() {
  const [rentedClothes, setRentedClothes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRentedClothes();
  }, []);

  const fetchRentedClothes = async () => {
    try {
      const data = await getRentedClothes();
      if (data.length > 0) {
        setRentedClothes(data);
      } else {
        setErrorMessage("No rented products found.");
      }
    } catch (error) {
      setErrorMessage("Failed to load rented products.");
      console.error("Error fetching rented products:", error);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      const response = await markAsReturned(rentalId);
      if (response) {
        alert("Rental marked as returned.");
        fetchRentedClothes(); // Refresh the list
      }
    } catch (error) {
      console.error("Error marking as returned:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rented Products</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {rentedClothes.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Rental Date</th>
              <th className="py-2 px-4 border-b">Return Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Products</th>
              <th className="py-2 px-4 border-b">Returned</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentedClothes.map((rental) => (
              <tr key={rental._id}>
                <td className="py-2 px-4 border-b">{rental.name}</td>
                <td className="py-2 px-4 border-b">{new Date(rental.rentalDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(rental.returnDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">₹{rental.totalPrice}</td>
                <td className="py-2 px-4 border-b">
                  {rental.products.map((product, index) => (
                    <div key={index}>
                      {product.name} (x{product.quantity}) - ₹{product.price * product.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  {rental.returned ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  {!rental.returned && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleReturn(rental._id)}
                    >
                      Mark as Returned
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rented products available.</p>
      )}
    </div>
  );
}
