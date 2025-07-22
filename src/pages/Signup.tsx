import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col px-4 py-8">
      {/* Logo and Header */}
      <div className="flex flex-col items-center mt-8 mb-8">
        <img src="/image.png" alt="FoodPrint Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold text-green-600 mb-2">FoodPrint</h1>
        <p className="text-xl text-gray-700">Scan To Save Food!</p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-md p-6 mx-auto w-full max-w-md mb-8">
        {" "}
        {/* Added mb-8 for bottom margin */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl text-lg active:scale-95 transition-all duration-200"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-green-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Footer Note with Added Spacing */}
      <div className="mt-8">
        {" "}
        {/* Added this wrapper div with mt-8 */}
        <p className="text-center text-gray-500 text-sm mb-4">
          Reduce waste, save money, eat fresh
        </p>
      </div>
    </div>
  );
}
