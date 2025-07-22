import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-green-50  flex flex-col px-4 py-8">
      {/* Logo and Header */}
      <div className="flex flex-col items-center mt-8 mb-8">
        {" "}
        {/* Reduced mb-12 to mb-8 */}
        <img src="/image.png" alt="FoodPrint Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold text-green-600 mb-2">FoodPrint</h1>
        <p className="text-xl text-gray-700">Scan To Save Food!</p>
      </div>

      {/* Value Proposition - Moved up to fill space */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Never waste food again
        </h2>
        <p className="text-gray-600">
          Track expiration dates and get smart reminders before your food goes
          bad.
        </p>
      </div>

      {/* Action Buttons - Moved higher on the page */}
      <div className="mt-8 mb-12 space-y-4">
        {" "}
        {/* Changed mt-auto to mt-8 */}
        <Link
          to="/signin"
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl text-lg active:scale-95 transition-all duration-200"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="block w-full border-2 border-green-600 text-green-600 font-medium py-4 px-6 rounded-xl text-lg active:scale-95 transition-all duration-200"
        >
          Create Account
        </Link>
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-500 text-sm mb-4">
        Reduce waste, save money, eat fresh
      </p>
    </div>
  );
}
