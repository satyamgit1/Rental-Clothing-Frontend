// import React, { useState, useEffect } from "react";
// import { getRentedClothes, markAsReturned, deleteRental } from "../services/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function RentedClothes() {
//   const [rentedClothes, setRentedClothes] = useState([]);
//   const [filteredClothes, setFilteredClothes] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [report, setReport] = useState({
//     rented: { TShirts: 0, Jeans: 0, Shirts: 0 },
//     returned: { TShirts: 0, Jeans: 0, Shirts: 0 },
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     fetchRentedClothes();
//   }, []);

//   const fetchRentedClothes = async () => {
//     try {
//       const data = await getRentedClothes();
//       if (data.length > 0) {
//         setRentedClothes(data);
//         setFilteredClothes(data);
//         calculateReport(data);
//       } else {
//         setErrorMessage("No rented products found.");
//       }
//     } catch (error) {
//       setErrorMessage("Failed to load rented products.");
//       console.error("Error fetching rented products:", error);
//     }
//   };

//   const calculateReport = (data) => {
//     const rentedReport = { TShirts: 0, Jeans: 0, Shirts: 0 };
//     const returnedReport = { TShirts: 0, Jeans: 0, Shirts: 0 };

//     data.forEach((rental) => {
//       rental.products.forEach((product) => {
//         if (product.category === "T-Shirts") {
//           rentedReport.TShirts += product.quantity;
//           if (rental.returned) returnedReport.TShirts += product.quantity;
//         } else if (product.category === "Jeans") {
//           rentedReport.Jeans += product.quantity;
//           if (rental.returned) returnedReport.Jeans += product.quantity;
//         } else if (product.category === "Shirts") {
//           rentedReport.Shirts += product.quantity;
//           if (rental.returned) returnedReport.Shirts += product.quantity;
//         }
//       });
//     });

//     setReport({
//       rented: rentedReport,
//       returned: returnedReport,
//     });
//   };

//   const handleReturn = async (rentalId) => {
//     try {
//       const response = await markAsReturned(rentalId);
//       if (response) {
//         alert("Rental marked as returned.");
//         fetchRentedClothes();
//       }
//     } catch (error) {
//       console.error("Error marking as returned:", error);
//     }
//   };

//   const handleDelete = async (rentalId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this rental?");
//     if (confirmDelete) {
//       try {
//         await deleteRental(rentalId);
//         alert("Rental deleted successfully.");
//         fetchRentedClothes();
//       } catch (error) {
//         console.error("Error deleting rental:", error);
//         alert("Failed to delete rental.");
//       }
//     }
//   };

//   const totalPages = Math.ceil(filteredClothes.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredClothes.slice(indexOfFirstRecord, indexOfLastRecord);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleJumpToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleDateRangeChange = () => {
//     if (startDate && endDate) {
//       const filtered = rentedClothes.filter((rental) => {
//         const rentalDate = new Date(rental.rentalDate);
//         return rentalDate >= new Date(startDate) && rentalDate <= new Date(endDate);
//       });
//       setFilteredClothes(filtered);
//       calculateReport(filtered);
//     } else {
//       setFilteredClothes(rentedClothes);
//       calculateReport(rentedClothes);
//     }
//     setCurrentPage(1);
//   };

//   // Calculate returned and not returned counts
//   const returnedCount = rentedClothes.filter((rental) => rental.returned).length;
//   const notReturnedCount = rentedClothes.length - returnedCount;

//   // Pie chart data for returned and not returned clothes
//   const pieChartData = {
//     labels: ["Returned", "Not Returned"],
//     datasets: [
//       {
//         data: [returnedCount, notReturnedCount],
//         backgroundColor: ["#36A2EB", "#FF6384"],
//         hoverBackgroundColor: ["#36A2EB", "#FF6384"],
//         borderColor: ["#ffffff", "#ffffff"],
//         borderWidth: 2,
//         hoverOffset: 15,
//       },
//     ],
//   };

//   const pieChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Returned vs Not Returned Clothes",
//       },
//     },
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
//         Rented Products
//       </h1>

//       {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

//       {/* Pie Chart for Returned Status */}
//       <div className="mb-6 flex justify-center">
//         <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-4">
//             Return Status of Rented Clothes
//           </h2>
//           <div className="relative h-64">
//             <Pie data={pieChartData} options={pieChartOptions} />
//           </div>
//         </div>
//       </div>

//       {/* Date Filter and Rental List */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-full max-w-md mb-4">
//           <label htmlFor="startDate" className="block text-md font-medium text-gray-700 mb-1">
//             Start Date
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div className="w-full max-w-md mb-4">
//           <label htmlFor="endDate" className="block text-md font-medium text-gray-700 mb-1">
//             End Date
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <button
//           onClick={handleDateRangeChange}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
//         >
//           Filter by Date Range
//         </button>
//       </div>

//       {currentRecords.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Name
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Rental Date
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Return Date
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Total Price
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Products
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Returned
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Mark as Returned
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRecords.map((rental) => (
//                 <tr key={rental._id} className="hover:bg-gray-50 transition-all">
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {rental.name}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {new Date(rental.rentalDate).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {new Date(rental.returnDate).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     ₹{rental.totalPrice}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {rental.products.map((product, index) => (
//                       <div key={index} className="mb-1">
//                         {product.name} (x{product.quantity}) - ₹
//                         {product.price * product.quantity}
//                       </div>
//                     ))}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {rental.returned ? (
//                       <span className="text-green-600 font-semibold">Yes</span>
//                     ) : (
//                       <span className="text-red-500 font-semibold">No</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {!rental.returned && (
//                       <button
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
//                         onClick={() => handleReturn(rental._id)}
//                       >
//                         Mark as Returned
//                       </button>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                       onClick={() => handleDelete(rental._id)}
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-lg font-semibold text-gray-700 mt-6">
//           No rented products available for the selected date range.
//         </p>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4 space-x-2">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
//             currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Previous
//         </button>

//         {/* Pagination Scale (Page Numbers) */}
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handleJumpToPage(pageNumber)}
//             className={`px-4 py-2 rounded-lg ${
//               pageNumber === currentPage
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {pageNumber}
//           </button>
//         ))}

//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
//             currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { getRentedClothes, markAsReturned, deleteRental } from "../services/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import * as XLSX from "xlsx"; // Import xlsx library

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function RentedClothes() {
//   const [rentedClothes, setRentedClothes] = useState([]);
//   const [filteredClothes, setFilteredClothes] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [report, setReport] = useState({
//     rented: { TShirts: 0, Jeans: 0, Shirts: 0 },
//     returned: { TShirts: 0, Jeans: 0, Shirts: 0 },
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     fetchRentedClothes();
//   }, []);

//   const fetchRentedClothes = async () => {
//     try {
//       const data = await getRentedClothes();
//       if (data.length > 0) {
//         setRentedClothes(data);
//         setFilteredClothes(data);
//         calculateReport(data);
//       } else {
//         setErrorMessage("No rented products found.");
//       }
//     } catch (error) {
//       setErrorMessage("Failed to load rented products.");
//       console.error("Error fetching rented products:", error);
//     }
//   };

//   const calculateReport = (data) => {
//     const rentedReport = { TShirts: 0, Jeans: 0, Shirts: 0 };
//     const returnedReport = { TShirts: 0, Jeans: 0, Shirts: 0 };

//     data.forEach((rental) => {
//       rental.products.forEach((product) => {
//         if (product.category === "T-Shirts") {
//           rentedReport.TShirts += product.quantity;
//           if (rental.returned) returnedReport.TShirts += product.quantity;
//         } else if (product.category === "Jeans") {
//           rentedReport.Jeans += product.quantity;
//           if (rental.returned) returnedReport.Jeans += product.quantity;
//         } else if (product.category === "Shirts") {
//           rentedReport.Shirts += product.quantity;
//           if (rental.returned) returnedReport.Shirts += product.quantity;
//         }
//       });
//     });

//     setReport({
//       rented: rentedReport,
//       returned: returnedReport,
//     });
//   };

//   const handleReturn = async (rentalId) => {
//     try {
//       const response = await markAsReturned(rentalId);
//       if (response) {
//         alert("Rental marked as returned.");
//         fetchRentedClothes();
//       }
//     } catch (error) {
//       console.error("Error marking as returned:", error);
//     }
//   };

//   const handleDelete = async (rentalId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this rental?");
//     if (confirmDelete) {
//       try {
//         await deleteRental(rentalId);
//         alert("Rental deleted successfully.");
//         fetchRentedClothes();
//       } catch (error) {
//         console.error("Error deleting rental:", error);
//         alert("Failed to delete rental.");
//       }
//     }
//   };

//   const handleDateRangeChange = () => {
//     if (startDate && endDate) {
//       const filtered = rentedClothes.filter((rental) => {
//         const rentalDate = new Date(rental.rentalDate);
//         return rentalDate >= new Date(startDate) && rentalDate <= new Date(endDate);
//       });
//       setFilteredClothes(filtered);
//       calculateReport(filtered);
//     } else {
//       setFilteredClothes(rentedClothes);
//       calculateReport(rentedClothes);
//     }
//     setCurrentPage(1);
//   };

//   // Function to generate Excel file based on filtered data
//   const generateExcel = () => {
//     const worksheetData = filteredClothes.map((rental) => ({
//       Name: rental.name,
//       "Rental Date": new Date(rental.rentalDate).toLocaleDateString(),
//       "Return Date": new Date(rental.returnDate).toLocaleDateString(),
//       "Total Price": `₹${rental.totalPrice}`,
//       Products: rental.products
//         .map(
//           (product) =>
//             `${product.name} (x${product.quantity}) - ₹${product.price * product.quantity}`
//         )
//         .join(", "),
//       Returned: rental.returned ? "Yes" : "No",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Rented Clothes");

//     // Create Excel file and trigger download
//     XLSX.writeFile(workbook, "Filtered_Rented_Clothes.xlsx");
//   };

//   const totalPages = Math.ceil(filteredClothes.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredClothes.slice(indexOfFirstRecord, indexOfLastRecord);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleJumpToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Calculate returned and not returned counts
//   const returnedCount = rentedClothes.filter((rental) => rental.returned).length;
//   const notReturnedCount = rentedClothes.length - returnedCount;

//   // Pie chart data for returned and not returned clothes
//   const pieChartData = {
//     labels: ["Returned", "Not Returned"],
//     datasets: [
//       {
//         data: [returnedCount, notReturnedCount],
//         backgroundColor: ["#36A2EB", "#FF6384"],
//         hoverBackgroundColor: ["#36A2EB", "#FF6384"],
//         borderColor: ["#ffffff", "#ffffff"],
//         borderWidth: 2,
//         hoverOffset: 15,
//       },
//     ],
//   };

//   const pieChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Returned vs Not Returned Clothes",
//       },
//     },
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
//         Rented Products
//       </h1>

//       {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

//       {/* Pie Chart for Returned Status */}
//       <div className="mb-6 flex justify-center">
//         <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-4">
//             Return Status of Rented Clothes
//           </h2>
//           <div className="relative h-64">
//             <Pie data={pieChartData} options={pieChartOptions} />
//           </div>
//         </div>
//       </div>

//       {/* Date Filter and Rental List */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-full max-w-md mb-4">
//           <label htmlFor="startDate" className="block text-md font-medium text-gray-700 mb-1">
//             Start Date
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div className="w-full max-w-md mb-4">
//           <label htmlFor="endDate" className="block text-md font-medium text-gray-700 mb-1">
//             End Date
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <button
//           onClick={handleDateRangeChange}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
//         >
//           Filter by Date Range
//         </button>
//       </div>

//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={generateExcel}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
//         >
//           Export to Excel
//         </button>
//       </div>

//       {currentRecords.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Name
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Rental Date
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Return Date
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Total Price
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Products
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Returned
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Mark as Returned
//                 </th>
//                 <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRecords.map((rental) => (
//                 <tr key={rental._id} className="hover:bg-gray-50 transition-all">
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {rental.name}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {new Date(rental.rentalDate).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {new Date(rental.returnDate).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     ₹{rental.totalPrice}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {rental.products.map((product, index) => (
//                       <div key={index} className="mb-1">
//                         {product.name} (x{product.quantity}) - ₹
//                         {product.price * product.quantity}
//                       </div>
//                     ))}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {rental.returned ? (
//                       <span className="text-green-600 font-semibold">Yes</span>
//                     ) : (
//                       <span className="text-red-500 font-semibold">No</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     {!rental.returned && (
//                       <button
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
//                         onClick={() => handleReturn(rental._id)}
//                       >
//                         Mark as Returned
//                       </button>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                       onClick={() => handleDelete(rental._id)}
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-lg font-semibold text-gray-700 mt-6">
//           No rented products available for the selected date range.
//         </p>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4 space-x-2">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
//             currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Previous
//         </button>

//         {/* Pagination Scale (Page Numbers) */}
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handleJumpToPage(pageNumber)}
//             className={`px-4 py-2 rounded-lg ${
//               pageNumber === currentPage
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {pageNumber}
//           </button>
//         ))}

//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
//             currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { getRentedClothes, markAsReturned, deleteRental } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as XLSX from "xlsx"; // Import xlsx library

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function RentedClothes() {
  const [rentedClothes, setRentedClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState({
    rented: { TShirts: 0, Jeans: 0, Shirts: 0 },
    returned: { TShirts: 0, Jeans: 0, Shirts: 0 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchRentedClothes();
  }, []);

  const fetchRentedClothes = async () => {
    try {
      const data = await getRentedClothes();
      if (data.length > 0) {
        setRentedClothes(data);
        setFilteredClothes(data);
        calculateReport(data);
      } else {
        setErrorMessage("No rented products found.");
      }
    } catch (error) {
      setErrorMessage("Failed to load rented products.");
      console.error("Error fetching rented products:", error);
    }
  };

  const calculateReport = (data) => {
    const rentedReport = { TShirts: 0, Jeans: 0, Shirts: 0 };
    const returnedReport = { TShirts: 0, Jeans: 0, Shirts: 0 };

    data.forEach((rental) => {
      rental.products.forEach((product) => {
        if (product.category === "T-Shirts") {
          rentedReport.TShirts += product.quantity;
          if (rental.returned) returnedReport.TShirts += product.quantity;
        } else if (product.category === "Jeans") {
          rentedReport.Jeans += product.quantity;
          if (rental.returned) returnedReport.Jeans += product.quantity;
        } else if (product.category === "Shirts") {
          rentedReport.Shirts += product.quantity;
          if (rental.returned) returnedReport.Shirts += product.quantity;
        }
      });
    });

    setReport({
      rented: rentedReport,
      returned: returnedReport,
    });
  };

  const handleReturn = async (rentalId) => {
    try {
      const response = await markAsReturned(rentalId);
      if (response) {
        alert("Rental marked as returned.");
        fetchRentedClothes();
      }
    } catch (error) {
      console.error("Error marking as returned:", error);
    }
  };

  const handleDelete = async (rentalId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this rental?");
    if (confirmDelete) {
      try {
        await deleteRental(rentalId);
        alert("Rental deleted successfully.");
        fetchRentedClothes();
      } catch (error) {
        console.error("Error deleting rental:", error);
        alert("Failed to delete rental.");
      }
    }
  };

  const handleDateRangeChange = () => {
    if (startDate && endDate) {
      const filtered = rentedClothes.filter((rental) => {
        const rentalDate = new Date(rental.rentalDate);
        return rentalDate >= new Date(startDate) && rentalDate <= new Date(endDate);
      });
      setFilteredClothes(filtered);
      calculateReport(filtered);
    } else {
      setFilteredClothes(rentedClothes);
      calculateReport(rentedClothes);
    }
    setCurrentPage(1);
  };

  // Function to generate Excel file based on filtered data
  const generateExcel = () => {
    const worksheetData = filteredClothes.map((rental) => ({
      Name: rental.name,
      Mobile: rental.mobile || "N/A", // Ensure mobile number is displayed
      "Rental Date": new Date(rental.rentalDate).toLocaleDateString(),
      "Return Date": new Date(rental.returnDate).toLocaleDateString(),
      "Total Price": `₹${rental.totalPrice}`,
      Products: rental.products
        .map(
          (product) =>
            `${product.name} (x${product.quantity}) - ₹${product.price * product.quantity}`
        )
        .join(", "),
      Returned: rental.returned ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rented Clothes");

    // Create Excel file and trigger download
    XLSX.writeFile(workbook, "Filtered_Rented_Clothes.xlsx");
  };

  const totalPages = Math.ceil(filteredClothes.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredClothes.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleJumpToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate returned and not returned counts
  const returnedCount = rentedClothes.filter((rental) => rental.returned).length;
  const notReturnedCount = rentedClothes.length - returnedCount;

  // Pie chart data for returned and not returned clothes
  const pieChartData = {
    labels: ["Returned", "Not Returned"],
    datasets: [
      {
        data: [returnedCount, notReturnedCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Returned vs Not Returned Clothes",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Rented Products
      </h1>

      {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

      {/* Pie Chart for Returned Status */}
      <div className="mb-6 flex justify-center">
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">
            Return Status of Rented Clothes
          </h2>
          <div className="relative h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Date Filter and Rental List */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-full max-w-md mb-4">
          <label htmlFor="startDate" className="block text-md font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full max-w-md mb-4">
          <label htmlFor="endDate" className="block text-md font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleDateRangeChange}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        >
          Filter by Date Range
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={generateExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
        >
          Export to Excel
        </button>
      </div>

      {currentRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Mobile
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Rental Date
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Return Date
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Total Price
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Products
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Returned
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Mark as Returned
                </th>
                <th className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-left text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((rental) => (
                <tr key={rental._id} className="hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {rental.name}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {rental.mobile || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {new Date(rental.rentalDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {new Date(rental.returnDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    ₹{rental.totalPrice}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {rental.products.map((product, index) => (
                      <div key={index} className="mb-1">
                        {product.name} (x{product.quantity}) - ₹
                        {product.price * product.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {rental.returned ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    {!rental.returned && (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        onClick={() => handleReturn(rental._id)}
                      >
                        Mark as Returned
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm md:text-base border-b text-gray-800">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      onClick={() => handleDelete(rental._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-700 mt-6">
          No rented products available for the selected date range.
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        {/* Pagination Scale (Page Numbers) */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleJumpToPage(pageNumber)}
            className={`px-4 py-2 rounded-lg ${
              pageNumber === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
