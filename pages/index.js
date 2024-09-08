// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 text-center p-8">
//       <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-fade-in">
//         Welcome to the Rental Clothing Shop
//       </h1>
//       <p className="text-2xl mb-8 text-gray-800 leading-relaxed animate-slide-in">
//         Seamlessly manage your inventory and checkout rentals with ease.
//       </p>
//       <div className="space-x-6 animate-bounce-on-hover">
//         <a
//           href="/inventory"
//           className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//         >
//           Go to Inventory
//         </a>
//         <a
//           href="/checkout"
//           className="inline-block bg-gradient-to-r from-green-500 to-lime-400 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//         >
//           Go to Checkout
//         </a>
//       </div>
//     </div>
//   );
// }



import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-6">Rental Clothing Shop</h1>
      
      {/* Correct usage of Link without <a> */}
      <Link href="/inventory">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Manage Inventory</button>
      </Link>
      
      <Link href="/checkout">
        <button className="bg-green-500 text-white py-2 px-4 ml-4 rounded">Checkout</button>
      </Link>
    </div>
  );
}
