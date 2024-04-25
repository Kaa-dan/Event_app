import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="font-bold text-xl">Esports Management</Link>
            </div>
            <div className="flex">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
              <Link to="/teams" className="text-gray-300 hover:text-white px-3 py-2">Teams</Link>
              <Link to="/players" className="text-gray-300 hover:text-white px-3 py-2">Players</Link>
              {/* Add more links for other sections as needed */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Esports Management Application</h1>
        <p className="text-lg mb-8">Manage your teams, players, matches, and more!</p>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Manage multiple esports teams</li>
            <li>Add, edit, and remove players</li>
            <li>Schedule matches and tournaments</li>
            <li>Track team and player statistics</li>
            {/* Add more features as needed */}
          </ul>
        </section>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis ultricies lectus vel viverra.
            Vestibulum scelerisque, odio vitae luctus fermentum, nulla ligula tempus metus, vel bibendum orci lorem eget ex.
            In hac habitasse platea dictumst.
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>Have questions or feedback? Contact us at:</p>
          <p>Email: contact@esportsmanagement.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
