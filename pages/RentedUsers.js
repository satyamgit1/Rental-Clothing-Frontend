// import React, { useState, useEffect } from "react";
// import { getRentedClothes, markAsReturned } from "../services/api";

// export default function RentedUsers() {
//   const [rentedUsers, setRentedUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     fetchRentedUsers();
//   }, []);

//   const fetchRentedUsers = async () => {
//     try {
//       const data = await getRentedClothes();
//       setRentedUsers(data);
//     } catch (error) {
//       setErrorMessage("Failed to load rented users.");
//       console.error("Error fetching rented users:", error);
//     }
//   };

//   const handleReturn = async (rentalId) => {
//     try {
//       const response = await markAsReturned(rentalId);
//       if (response) {
//         alert("Rental marked as returned.");
//         fetchRentedUsers();
//       }
//     } catch (error) {
//       console.error("Error marking as returned:", error);
//       alert("Failed to mark as returned.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 transform hover:scale-105 transition-transform duration-300">
//       <h1 className="text-4xl font-bold mb-6 text-blue-600 hover:text-purple-500 transition duration-500 transform hover:scale-110">
//         Rented Users
//       </h1>
//       {errorMessage && (
//         <p className="text-red-500 mb-4 animate-pulse transform hover:rotate-1 transition-all duration-300">
//           {errorMessage}
//         </p>
//       )}
//       <div className="overflow-x-auto bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg transform hover:rotate-1 transition-all duration-500">
//           <thead className="bg-gradient-to-r from-blue-100 to-blue-300 text-gray-700 shadow-md">
//             <tr>
//               <th className="py-4 px-4 text-left font-semibold tracking-wider">Name</th>
//               <th className="py-4 px-4 text-left font-semibold tracking-wider">Mobile</th>
//               <th className="py-4 px-4 text-left font-semibold tracking-wider">Total Price</th>
//               <th className="py-4 px-4 text-left font-semibold tracking-wider">Advance Amount</th>
//               <th className="py-4 px-4 text-left font-semibold tracking-wider">Remaining Amount</th>
//               <th className="py-4 px-4 text-left font-semibold tracking-wider">Return Status</th>
//               <th className="py-4 px-4 text-center font-semibold tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-gradient-to-br from-white to-gray-50">
//             {rentedUsers.map((user) => (
//               <tr
//                 key={user._id}
//                 className="hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:rotate-1"
//               >
//                 <td className="py-4 px-4 border-b">
//                   <div className="font-semibold text-gray-700">{user.name}</div>
//                 </td>
//                 <td className="py-4 px-4 border-b">
//                   <div className="text-gray-600">{user.mobile}</div>
//                 </td>
//                 <td className="py-4 px-4 border-b">
//                   <div className="text-gray-600">₹{user.totalPrice}</div>
//                 </td>
//                 <td className="py-4 px-4 border-b">
//                   <div className="text-green-600">₹{user.advanceAmount}</div>
//                 </td>
//                 <td className="py-4 px-4 border-b">
//                   <div className="text-red-600">₹{user.remainingAmount}</div>
//                 </td>
//                 <td className="py-4 px-4 border-b">
//                   {user.returned ? (
//                     <span className="text-green-600 font-bold animate-pulse">Returned</span>
//                   ) : (
//                     <span className="text-red-600 font-bold">Not Returned</span>
//                   )}
//                 </td>
//                 <td className="py-4 px-4 border-b text-center">
//                   {!user.returned && (
//                     <button
//                       onClick={() => handleReturn(user._id)}
//                       className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-transform duration-300 transform hover:scale-110 hover:rotate-1"
//                     >
//                       Mark as Returned
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { getRentedClothes, markAsReturned } from "../services/api";

// export default function RentedUsers() {
//   const [rentedUsers, setRentedUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     fetchRentedUsers();
//   }, []);

//   const fetchRentedUsers = async () => {
//     try {
//       const data = await getRentedClothes();
//       setRentedUsers(data);
//     } catch (error) {
//       setErrorMessage("Failed to load rented users.");
//     }
//   };

//   const handleReturn = async (rentalId) => {
//     try {
//       const response = await markAsReturned(rentalId);
//       if (response) fetchRentedUsers();
//     } catch {
//       alert("Failed to mark as returned.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-6 text-blue-600 hover:text-purple-500 transition duration-500">
//         Rented Users
//       </h1>
//       {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

//       <div className="overflow-x-auto">
//         <table className="table table-xs min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead className="bg-gradient-to-r from-blue-100 to-blue-300 text-gray-700">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Mobile</th>
//               <th>Total Price</th>
//               <th>Advance Amount</th>
//               <th>Remaining Amount</th>
//               <th>Return Status</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-gradient-to-br from-white to-gray-50">
//             {rentedUsers.map((user, index) => (
//               <tr key={user._id} className="hover:bg-gray-100 transition-all">
//                 <th>{index + 1}</th>
//                 <td>{user.name}</td>
//                 <td>{user.mobile}</td>
//                 <td>₹{user.totalPrice}</td>
//                 <td className="text-green-600">₹{user.advanceAmount}</td>
//                 <td className="text-red-600">₹{user.remainingAmount}</td>
//                 <td>
//                   {user.returned ? (
//                     <span className="text-green-600 font-bold">Returned</span>
//                   ) : (
//                     <span className="text-red-600 font-bold">Not Returned</span>
//                   )}
//                 </td>
//                 <td className="text-center">
//                   {!user.returned && (
//                     <button
//                       onClick={() => handleReturn(user._id)}
//                       className="bg-green-500 text-white px-2 py-1 text-sm rounded shadow hover:bg-green-600"
//                     >
//                       Mark as Returned
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
      
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { getRentedClothes, markAsReturned } from "../services/api";

export default function RentedUsers() {
  const [rentedUsers, setRentedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRentedUsers();
  }, []);

  const fetchRentedUsers = async () => {
    try {
      const data = await getRentedClothes();
      setRentedUsers(data);
    } catch (error) {
      setErrorMessage("Failed to load rented users.");
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      const response = await markAsReturned(rentalId);
      if (response) fetchRentedUsers();
    } catch {
      alert("Failed to mark as returned.");
    }
  };

  // Helper function to calculate total advance amount from products
  const calculateAdvanceAmount = (products) => {
    return products.reduce((total, product) => total + (product.advanceAmount || 0), 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600 hover:text-purple-500 transition duration-500">
        Rented Users
      </h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="overflow-x-auto">
        <table className="table table-xs min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-300 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Total Price</th>
              <th>Advance Amount</th>
              <th>Remaining Amount</th>
              <th>Return Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gradient-to-br from-white to-gray-50">
            {rentedUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100 transition-all">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>₹{user.totalPrice}</td>
                <td className="text-green-600">₹{calculateAdvanceAmount(user.products)}</td> {/* Display total advance */}
                <td className="text-red-600">₹{user.remainingAmount}</td>
                <td>
                  {user.returned ? (
                    <span className="text-green-600 font-bold">Returned</span>
                  ) : (
                    <span className="text-red-600 font-bold">Not Returned</span>
                  )}
                </td>
                <td className="text-center">
                  {!user.returned && (
                    <button
                      onClick={() => handleReturn(user._id)}
                      className="bg-green-500 text-white px-2 py-1 text-sm rounded shadow hover:bg-green-600"
                    >
                      Mark as Returned
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
