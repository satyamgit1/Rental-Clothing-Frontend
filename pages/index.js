import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GiClothes, GiShoppingCart, GiLifeBuoy } from 'react-icons/gi';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200 m-0 p-0">
      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-transparent z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold text-blue-600 hover:text-purple-600 transition-colors duration-300">
            Rental Clothing Shop
          </a>
          <div className="hidden md:flex space-x-6">
            <a href="/inventory" className="text-gray-700 hover:text-blue-500 transition duration-200">
              Inventory
            </a>
            <a href="/checkout" className="text-gray-700 hover:text-blue-500 transition duration-200">
              Checkout
            </a>
            <a href="/rented-clothes" className="text-gray-700 hover:text-blue-500 transition duration-200">
              Rented Clothes
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full max-w-5xl text-center py-24 px-4 mt-20">
        <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-fade-in">
          Welcome to the Rental Clothing Shop
        </h1>
        <p className="text-2xl mb-8 text-gray-800 leading-relaxed animate-slide-in">
          Seamlessly manage your inventory, checkout rentals, and explore our exclusive services.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 animate-bounce-on-hover">
          <a
            href="/inventory"
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Go to Inventory
          </a>
          <a
            href="/checkout"
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Go to Checkout
          </a>
          <a
            href="/rented-clothes"
            className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            View Rented Clothes
          </a>
          <a
            href="/RentedUsers"
            className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Balance Amount
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-6 py-12 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center group hover:scale-105 transition duration-300">
            <GiClothes className="text-blue-600 text-6xl mb-4 group-hover:text-blue-700" />
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Easy Inventory Management</h3>
            <p className="text-gray-600">
              Track and manage your clothing inventory effortlessly with our user-friendly tools.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group hover:scale-105 transition duration-300">
            <GiShoppingCart className="text-green-600 text-6xl mb-4 group-hover:text-green-700" />
            <h3 className="text-xl font-semibold mb-2 text-green-600">Quick and Easy Checkout</h3>
            <p className="text-gray-600">
              Fast and secure rental checkout process for a seamless customer experience.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group hover:scale-105 transition duration-300">
            <GiLifeBuoy className="text-purple-600 text-6xl mb-4 group-hover:text-purple-700" />
            <h3 className="text-xl font-semibold mb-2 text-purple-600">24/7 Customer Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is here to assist you at any time, day or night.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full max-w-6xl px-6 py-12 mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6 text-purple-800">About Us</h2>
        <p className="text-lg text-gray-700 text-center leading-relaxed">
          We are committed to providing the best rental services with an extensive collection of clothing for every occasion.
          Whether you need to manage inventory, checkout rentals, or keep track of your rented items, we’ve got you covered.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-6xl px-6 py-12 mt-12 bg-blue-50 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-800">Ready to Get Started?</h2>
        <p className="text-lg mb-6 text-gray-700">
          Explore our platform and streamline your rental management process today!
        </p>
        <a
          href="/checkout"
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          Start Your Rental Journey
        </a>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-white py-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold mb-4">Rental Clothing Shop</h3>
            <p className="text-gray-400">
              Your one-stop destination for all your clothing rental needs. Manage inventory, checkout rentals, and more.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/inventory" className="text-gray-400 hover:text-white transition duration-200">
                  Inventory
                </a>
              </li>
              <li>
                <a href="/checkout" className="text-gray-400 hover:text-white transition duration-200">
                  Checkout
                </a>
              </li>
              <li>
                <a href="/rented-clothes" className="text-gray-400 hover:text-white transition duration-200">
                  Rented Clothes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-blue-400 hover:text-white transition duration-200">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-pink-400 hover:text-white transition duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-blue-500 hover:text-white transition duration-200">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500">
          © 2024 Rental Clothing Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
