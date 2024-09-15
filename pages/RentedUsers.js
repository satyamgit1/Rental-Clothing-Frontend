// pages/RentedUsers.js
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
      console.error("Error fetching rented users:", error);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      const response = await markAsReturned(rentalId);
      if (response) {
        alert("Rental marked as returned.");
        fetchRentedUsers();
      }
    } catch (error) {
      console.error("Error marking as returned:", error);
      alert("Failed to mark as returned.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Rented Users</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Name</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Mobile</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Total Price</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Remaining Amount</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Return Status</th>
            <th className="py-3 px-4 text-center font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentedUsers.map((user) => (
            <tr key={user._id}>
              <td className="py-3 px-4 border-b">{user.name}</td>
              <td className="py-3 px-4 border-b">{user.mobile}</td>
              <td className="py-3 px-4 border-b">₹{user.totalPrice}</td>
              <td className="py-3 px-4 border-b">₹{user.remainingAmount}</td>
              <td className="py-3 px-4 border-b">
                {user.returned ? (
                  <span className="text-green-600">Returned</span>
                ) : (
                  <span className="text-red-600">Not Returned</span>
                )}
              </td>
              <td className="py-3 px-4 border-b text-center">
                {!user.returned && (
                  <button
                    onClick={() => handleReturn(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
  );
}
