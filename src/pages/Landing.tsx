import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col px-4 py-8">
      {/* Logo and Header */}
      <div className="flex flex-col items-center mt-8 mb-12">
        <img
          src="/logo.png"
          alt="FoodPrint Logo"
          className="w-24 h-24 mb-4" // Slightly smaller for mobile
        />
        <h1 className="text-4xl font-bold text-green-600 mb-2">FoodPrint</h1>
        <p className="text-xl text-gray-700">Scan To Save Food!</p>
      </div>

      {/* Hero Illustration */}
      <div className="flex justify-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>

      {/* Value Proposition */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Never waste food again
        </h2>
        <p className="text-gray-600">
          Track expiration dates and get smart reminders before your food goes
          bad.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto mb-12 space-y-4">
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
