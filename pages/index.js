// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import { GiClothes, GiShoppingCart, GiLifeBuoy } from 'react-icons/gi';

// export default function Home() {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300 m-0 p-0 overflow-hidden">
//       {/* Navbar */}
//       <nav className="w-full fixed top-0 bg-transparent z-20 backdrop-filter backdrop-blur-lg bg-opacity-50 border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <a href="/" className="text-4xl font-extrabold text-blue-600 hover:text-purple-600 transition-colors duration-300">
//             Rental Clothing Shop
//           </a>
//           <div className="hidden md:flex space-x-8">
//             <a href="/inventory" className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300 hover:scale-105 transform">
//               Inventory
//             </a>
//             <a href="/checkout" className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300 hover:scale-105 transform">
//               Checkout
//             </a>
//             <a href="/rented-clothes" className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300 hover:scale-105 transform">
//               Rented Clothes
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="w-full max-w-5xl text-center py-32 px-4 mt-24 bg-gradient-to-tr from-purple-300 to-blue-300 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
//         <h1 className="text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 animate-fade-in">
//           Welcome to the Rental Clothing Shop
//         </h1>
//         <p className="text-2xl mb-8 text-gray-900 leading-relaxed animate-slide-in opacity-90">
//           Seamlessly manage your inventory, checkout rentals, and explore our exclusive services.
//         </p>
//         <div className="flex flex-wrap justify-center gap-6 mt-10 animate-bounce-on-hover">
//           <a
//             href="/inventory"
//             className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-10 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90"
//           >
//             Go to Inventory
//           </a>
//           <a
//             href="/checkout"
//             className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-10 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90"
//           >
//             Go to Checkout
//           </a>
//           <a
//             href="/rented-clothes"
//             className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-10 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90"
//           >
//             View Rented Clothes
//           </a>
//           <a
//             href="/RentedUsers"
//             className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-10 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90"
//           >
//             Balance Amount
//           </a>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="w-full max-w-6xl px-8 py-14 bg-white rounded-xl shadow-lg text-center mt-20 hover:shadow-2xl transition-shadow duration-300">
//         <h2 className="text-5xl font-bold mb-10 text-gray-800 underline decoration-blue-500 decoration-wavy">
//           Why Choose Us?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-pulse">
//           <div className="flex flex-col items-center text-center group transform hover:scale-105 transition duration-300">
//             <GiClothes className="text-blue-600 text-7xl mb-6 group-hover:text-blue-700 drop-shadow-md transition duration-500 ease-in-out" />
//             <h3 className="text-2xl font-semibold mb-3 text-blue-600 group-hover:text-blue-700">
//               Easy Inventory Management
//             </h3>
//             <p className="text-gray-700 max-w-xs mx-auto">
//               Track and manage your clothing inventory effortlessly with our user-friendly tools.
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center group transform hover:scale-105 transition duration-300">
//             <GiShoppingCart className="text-green-600 text-7xl mb-6 group-hover:text-green-700 drop-shadow-md transition duration-500 ease-in-out" />
//             <h3 className="text-2xl font-semibold mb-3 text-green-600 group-hover:text-green-700">
//               Quick and Easy Checkout
//             </h3>
//             <p className="text-gray-700 max-w-xs mx-auto">
//               Fast and secure rental checkout process for a seamless customer experience.
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center group transform hover:scale-105 transition duration-300">
//             <GiLifeBuoy className="text-purple-600 text-7xl mb-6 group-hover:text-purple-700 drop-shadow-md transition duration-500 ease-in-out" />
//             <h3 className="text-2xl font-semibold mb-3 text-purple-600 group-hover:text-purple-700">
//               24/7 Customer Support
//             </h3>
//             <p className="text-gray-700 max-w-xs mx-auto">
//               Our dedicated support team is here to assist you at any time, day or night.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section className="w-full max-w-6xl px-8 py-16 mt-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//         <h2 className="text-5xl font-bold mb-8 text-purple-900 underline decoration-pink-400 decoration-dashed">
//           About Us
//         </h2>
//         <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
//           We are committed to providing the best rental services with an extensive collection of clothing for every occasion.
//           Whether you need to manage inventory, checkout rentals, or keep track of your rented items, we’ve got you covered.
//         </p>
//       </section>

//       {/* Call to Action Section */}
//       <section className="w-full max-w-6xl px-10 py-20 mt-16 bg-blue-100 rounded-xl shadow-lg text-center transition-all hover:shadow-2xl duration-300">
//         <h2 className="text-5xl font-bold mb-6 text-blue-900 underline decoration-wavy decoration-green-500">
//           Ready to Get Started?
//         </h2>
//         <p className="text-lg mb-8 text-gray-800 max-w-3xl mx-auto">
//           Explore our platform and streamline your rental management process today!
//         </p>
//         <a
//           href="/checkout"
//           className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-12 py-5 rounded-full shadow-xl transform hover:scale-110 hover:shadow-2xl transition-transform duration-300"
//         >
//           Start Your Rental Journey
//         </a>
//       </section>

//       {/* Footer Section */}
//       <footer className="w-full bg-gray-900 text-white py-14 mt-20">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
//           <div>
//             <h3 className="text-2xl font-semibold mb-6">Rental Clothing Shop</h3>
//             <p className="text-gray-400 max-w-sm mx-auto">
//               Your one-stop destination for all your clothing rental needs. Manage inventory, checkout rentals, and more.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
//             <ul className="space-y-4">
//               <li>
//                 <a href="/inventory" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
//                   Inventory
//                 </a>
//               </li>
//               <li>
//                 <a href="/checkout" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
//                   Checkout
//                 </a>
//               </li>
//               <li>
//                 <a href="/rented-clothes" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
//                   Rented Clothes
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
//             <div className="flex justify-center md:justify-start space-x-6">
//               <a href="#" className="text-blue-400 hover:text-white transition duration-300 hover:scale-110">
//                 <FaFacebookF size={24} />
//               </a>
//               <a href="#" className="text-blue-400 hover:text-white transition duration-300 hover:scale-110">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="#" className="text-pink-400 hover:text-white transition duration-300 hover:scale-110">
//                 <FaInstagram size={24} />
//               </a>
//               <a href="#" className="text-blue-500 hover:text-white transition duration-300 hover:scale-110">
//                 <FaLinkedinIn size={24} />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 text-center text-gray-500">
//           © 2024 Rental Clothing Shop. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import { GiClothes, GiShoppingCart, GiLifeBuoy } from 'react-icons/gi';

// export default function Home() {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300 m-0 p-0 overflow-hidden relative">
//       {/* Background Animation */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-50 animate-ping-slow"></div>
//         <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full blur-xl opacity-50 right-0 top-10 animate-pulse-slow"></div>
//         <div className="absolute w-80 h-80 bg-gradient-to-r from-yellow-300 to-red-400 rounded-full blur-3xl opacity-40 left-10 bottom-10 animate-spin-slow"></div>
//       </div>

//       {/* Navbar */}
//       <nav className="w-full fixed top-0 bg-transparent z-30 backdrop-filter backdrop-blur-xl bg-opacity-60 border-b border-gray-300 shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
//           <a href="/" className="text-4xl font-extrabold text-blue-700 hover:text-purple-700 transition-colors duration-300 transform hover:scale-105">
//             Rental Clothing Shop
//           </a>
//           <div className="hidden md:flex space-x-8">
//             <a href="/inventory" className="text-gray-900 font-semibold hover:text-blue-600 transition duration-300 hover:underline underline-offset-4">
//               Inventory
//             </a>
//             <a href="/checkout" className="text-gray-900 font-semibold hover:text-blue-600 transition duration-300 hover:underline underline-offset-4">
//               Checkout
//             </a>
//             <a href="/rented-clothes" className="text-gray-900 font-semibold hover:text-blue-600 transition duration-300 hover:underline underline-offset-4">
//               Rented Clothes
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="w-full max-w-5xl text-center py-32 px-6 mt-24 bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-400 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 hover:rotate-1 hover:skew-y-2">
//         <h1 className="text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-red-700 animate-fade-in drop-shadow-md">
//           Welcome to the Rental Clothing Shop
//         </h1>
//         <p className="text-2xl mb-8 text-gray-900 leading-relaxed animate-slide-in opacity-90">
//           Seamlessly manage your inventory, checkout rentals, and explore our exclusive services.
//         </p>
//         <div className="flex flex-wrap justify-center gap-6 mt-10 animate-bounce-on-hover">
//           <a
//             href="/inventory"
//             className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
//           >
//             Go to Inventory
//           </a>
//           <a
//             href="/checkout"
//             className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
//           >
//             Go to Checkout
//           </a>
//           <a
//             href="/rented-clothes"
//             className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
//           >
//             View Rented Clothes
//           </a>
//           <a
//             href="/RentedUsers"
//             className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
//           >
//             Balance Amount
//           </a>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="w-full max-w-6xl px-8 py-16 bg-white rounded-xl shadow-lg text-center mt-20 hover:shadow-2xl transition-shadow duration-300 hover:bg-gradient-to-r from-white via-blue-50 to-white transform hover:scale-105">
//         <h2 className="text-5xl font-bold mb-10 text-gray-800 underline decoration-blue-500 decoration-wavy animate-text-glow">
//           Why Choose Us?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="flex flex-col items-center text-center group transform hover:scale-110 transition duration-300">
//             <GiClothes className="text-blue-600 text-8xl mb-6 group-hover:text-blue-700 drop-shadow-lg transition duration-500 ease-in-out animate-spin-slow" />
//             <h3 className="text-2xl font-semibold mb-3 text-blue-600 group-hover:text-blue-700">
//               Easy Inventory Management
//             </h3>
//             <p className="text-gray-700 max-w-xs mx-auto">
//               Track and manage your clothing inventory effortlessly with our user-friendly tools.
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center group transform hover:scale-110 transition duration-300">
//             <GiShoppingCart className="text-green-600 text-8xl mb-6 group-hover:text-green-700 drop-shadow-lg transition duration-500 ease-in-out animate-bounce-slow" />
//             <h3 className="text-2xl font-semibold mb-3 text-green-600 group-hover:text-green-700">
//               Quick and Easy Checkout
//             </h3>
//             <p className="text-gray-700 max-w-xs mx-auto">
//               Fast and secure rental checkout process for a seamless customer experience.
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center group transform hover:scale-110 transition duration-300">
//             <GiLifeBuoy className="text-purple-600 text-8xl mb-6 group-hover:text-purple-700 drop-shadow-lg transition duration-500 ease-in-out animate-pulse-slow" />
//             <h3 className="text-2xl font-semibold mb-3 text-purple-600 group-hover:text-purple-700">
//               24/7 Customer Support
//             </h3>
//             <p className="text-gray-700 max-w-xs mx-auto">
//               Our dedicated support team is here to assist you at any time, day or night.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section className="w-full max-w-6xl px-10 py-20 mt-16 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
//         <h2 className="text-5xl font-bold mb-8 text-purple-900 underline decoration-pink-500 decoration-dashed">
//           About Us
//         </h2>
//         <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
//           We are committed to providing the best rental services with an extensive collection of clothing for every occasion.
//           Whether you need to manage inventory, checkout rentals, or keep track of your rented items, we’ve got you covered.
//         </p>
//       </section>

//       {/* Call to Action Section */}
//       <section className="w-full max-w-6xl px-10 py-20 mt-20 bg-blue-50 rounded-xl shadow-2xl text-center hover:shadow-3xl transition-all duration-300 transform hover:rotate-2 hover:scale-105 hover:bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50">
//         <h2 className="text-5xl font-bold mb-6 text-blue-800 underline decoration-wavy decoration-green-500">
//           Ready to Get Started?
//         </h2>
//         <p className="text-lg mb-8 text-gray-800 max-w-3xl mx-auto">
//           Explore our platform and streamline your rental management process today!
//         </p>
//         <a
//           href="/checkout"
//           className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-125"
//         >
//           Start Your Rental Journey
//         </a>
//       </section>

//       {/* Footer Section */}
//       <footer className="w-full bg-gray-900 text-white py-12 mt-16 relative z-10 shadow-inner">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
//           <div className="group hover:scale-105 transition duration-300">
//             <h3 className="text-2xl font-semibold mb-6 group-hover:text-blue-400">Rental Clothing Shop</h3>
//             <p className="text-gray-400 leading-relaxed">
//               Your one-stop destination for all your clothing rental needs. Manage inventory, checkout rentals, and more.
//             </p>
//           </div>
//           <div className="group hover:scale-105 transition duration-300">
//             <h3 className="text-2xl font-semibold mb-6 group-hover:text-blue-400">Quick Links</h3>
//             <ul className="space-y-3">
//               <li>
//                 <a href="/inventory" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
//                   Inventory
//                 </a>
//               </li>
//               <li>
//                 <a href="/checkout" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
//                   Checkout
//                 </a>
//               </li>
//               <li>
//                 <a href="/rented-clothes" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
//                   Rented Clothes
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="group hover:scale-105 transition duration-300">
//             <h3 className="text-2xl font-semibold mb-6 group-hover:text-blue-400">Follow Us</h3>
//             <div className="flex justify-center md:justify-start space-x-6">
//               <a href="#" className="text-blue-400 hover:text-white transition duration-300 hover:scale-110">
//                 <FaFacebookF size={24} />
//               </a>
//               <a href="#" className="text-blue-400 hover:text-white transition duration-300 hover:scale-110">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="#" className="text-pink-400 hover:text-white transition duration-300 hover:scale-110">
//                 <FaInstagram size={24} />
//               </a>
//               <a href="#" className="text-blue-500 hover:text-white transition duration-300 hover:scale-110">
//                 <FaLinkedinIn size={24} />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 text-center text-gray-500">
//           © 2024 Rental Clothing Shop. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }


import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GiClothes, GiShoppingCart, GiLifeBuoy } from 'react-icons/gi';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300 m-0 p-0 overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-50 animate-ping-slow"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full blur-xl opacity-50 right-0 top-10 animate-pulse-slow"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-yellow-300 to-red-400 rounded-full blur-3xl opacity-40 left-10 bottom-10 animate-spin-slow"></div>
      </div>

      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-transparent z-30 backdrop-filter backdrop-blur-xl bg-opacity-60 border-b border-gray-300 shadow-md animate-slide-down transition-transform duration-500">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="/" className="text-4xl font-extrabold text-blue-700 hover:text-purple-700 transition-colors duration-300 transform hover:scale-105">
            Rental Clothing Shop
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="/inventory" className="text-gray-900 font-semibold hover:text-blue-600 transition duration-300 hover:underline underline-offset-4">
              Inventory
            </a>
            <a href="/checkout" className="text-gray-900 font-semibold hover:text-blue-600 transition duration-300 hover:underline underline-offset-4">
              Checkout
            </a>
            <a href="/rented-clothes" className="text-gray-900 font-semibold hover:text-blue-600 transition duration-300 hover:underline underline-offset-4">
              Rented Clothes
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full max-w-5xl text-center py-32 px-6 mt-24 bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-400 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 hover:rotate-1 hover:skew-y-2 animate-hero-fade-in">
        <h1 className="text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-red-700 animate-glow-fade-in drop-shadow-md">
          Welcome to the Rental Clothing Shop
        </h1>
        <p className="text-2xl mb-8 text-gray-900 leading-relaxed opacity-90 animate-slide-in-up">
          Seamlessly manage your inventory, checkout rentals, and explore our exclusive services.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-10 animate-bounce-on-hover">
          <a
            href="/inventory"
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
          >
            Go to Inventory
          </a>
          <a
            href="/checkout"
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
          >
            Go to Checkout
          </a>
          <a
            href="/rented-clothes"
            className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
          >
            View Rented Clothes
          </a>
          <a
            href="/RentedUsers"
            className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-110"
          >
            Balance Amount
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-8 py-16 bg-white rounded-xl shadow-lg text-center mt-20 hover:shadow-2xl transition-shadow duration-300 hover:bg-gradient-to-r from-white via-blue-50 to-white transform hover:scale-105">
        <h2 className="text-5xl font-bold mb-10 text-gray-800 underline decoration-blue-500 decoration-wavy animate-text-glow">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-slide-in-up">
          <div className="flex flex-col items-center text-center group transform hover:scale-110 transition duration-300">
            <GiClothes className="text-blue-600 text-8xl mb-6 group-hover:text-blue-700 drop-shadow-lg transition duration-500 ease-in-out animate-spin-slow" />
            <h3 className="text-2xl font-semibold mb-3 text-blue-600 group-hover:text-blue-700">
              Easy Inventory Management
            </h3>
            <p className="text-gray-700 max-w-xs mx-auto">
              Track and manage your clothing inventory effortlessly with our user-friendly tools.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group transform hover:scale-110 transition duration-300">
            <GiShoppingCart className="text-green-600 text-8xl mb-6 group-hover:text-green-700 drop-shadow-lg transition duration-500 ease-in-out animate-bounce-slow" />
            <h3 className="text-2xl font-semibold mb-3 text-green-600 group-hover:text-green-700">
              Quick and Easy Checkout
            </h3>
            <p className="text-gray-700 max-w-xs mx-auto">
              Fast and secure rental checkout process for a seamless customer experience.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group transform hover:scale-110 transition duration-300">
            <GiLifeBuoy className="text-purple-600 text-8xl mb-6 group-hover:text-purple-700 drop-shadow-lg transition duration-500 ease-in-out animate-pulse-slow" />
            <h3 className="text-2xl font-semibold mb-3 text-purple-600 group-hover:text-purple-700">
              24/7 Customer Support
            </h3>
            <p className="text-gray-700 max-w-xs mx-auto">
              Our dedicated support team is here to assist you at any time, day or night.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full max-w-6xl px-10 py-20 mt-16 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-5xl font-bold mb-8 text-purple-900 underline decoration-pink-500 decoration-dashed animate-glow-fade-in">
          About Us
        </h2>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
          We are committed to providing the best rental services with an extensive collection of clothing for every occasion.
          Whether you need to manage inventory, checkout rentals, or keep track of your rented items, we’ve got you covered.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-6xl px-10 py-20 mt-20 bg-blue-50 rounded-xl shadow-2xl text-center hover:shadow-3xl transition-all duration-300 transform hover:rotate-2 hover:scale-105 hover:bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 animate-zoom-in">
        <h2 className="text-5xl font-bold mb-6 text-blue-800 underline decoration-wavy decoration-green-500 animate-glow-fade-in">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8 text-gray-800 max-w-3xl mx-auto">
          Explore our platform and streamline your rental management process today!
        </p>
        <a
          href="/checkout"
          className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-12 py-5 rounded-full shadow-lg transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 hover:bg-opacity-90 hover:brightness-125"
        >
          Start Your Rental Journey
        </a>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-white py-12 mt-16 relative z-10 shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left animate-fade-in-up">
          <div className="group hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-6 group-hover:text-blue-400">Rental Clothing Shop</h3>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop destination for all your clothing rental needs. Manage inventory, checkout rentals, and more.
            </p>
          </div>
          <div className="group hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-6 group-hover:text-blue-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/inventory" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
                  Inventory
                </a>
              </li>
              <li>
                <a href="/checkout" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
                  Checkout
                </a>
              </li>
              <li>
                <a href="/rented-clothes" className="text-gray-400 hover:text-white transition duration-300 hover:underline">
                  Rented Clothes
                </a>
              </li>
            </ul>
          </div>
          <div className="group hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-6 group-hover:text-blue-400">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-blue-400 hover:text-white transition duration-300 hover:scale-110 animate-pulse">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition duration-300 hover:scale-110 animate-pulse">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-pink-400 hover:text-white transition duration-300 hover:scale-110 animate-pulse">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-blue-500 hover:text-white transition duration-300 hover:scale-110 animate-pulse">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-500">
          © 2024 Rental Clothing Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
