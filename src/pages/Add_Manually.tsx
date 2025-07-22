import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Add_ManuallyProps {}

const Add_Manually: React.FC<Add_ManuallyProps> = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    expiryDate: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate urgency based on expiry date
    const today = new Date();
    const expiryDate = new Date(formData.expiryDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let urgency: "urgent" | "soon" | "safe" | "expired";
    let expiresIn: string;

    if (daysDiff < 0) {
      urgency = "expired";
      expiresIn = `Expired ${Math.abs(daysDiff)} day${
        Math.abs(daysDiff) > 1 ? "s" : ""
      } ago`;
    } else if (daysDiff <= 3) {
      urgency = "urgent";
      expiresIn =
        daysDiff === 0
          ? "Expires today"
          : `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
    } else if (daysDiff <= 7) {
      urgency = "soon";
      expiresIn = `${daysDiff} days`;
    } else {
      urgency = "safe";
      if (daysDiff < 30) {
        expiresIn = `${daysDiff} days`;
      } else if (daysDiff < 365) {
        const months = Math.floor(daysDiff / 30);
        expiresIn = `${months} month${months > 1 ? "s" : ""}`;
      } else {
        const years = Math.floor(daysDiff / 365);
        expiresIn = `${years} year${years > 1 ? "s" : ""}`;
      }
    }

    // Create new food item
    const newFoodItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      expiresIn: expiresIn,
      urgency: urgency,
      expiryDate: formData.expiryDate,
    };

    // Store in localStorage for now (we'll improve this later with proper state management)
    const existingItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
    existingItems.push(newFoodItem);
    localStorage.setItem("foodItems", JSON.stringify(existingItems));

    // Navigate to home page
    navigate("/home");
  };

  return (
    <div className="pb-16 min-h-screen flex flex-col bg-gray-50">
      <div className="p-6 flex-grow">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <Link to="/scanner" className="mr-4">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-green-600">FoodPrint</h1>
        </div>

        {/* Form Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Product Details
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Expiry Date Field */}
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Fridge">Fridge</option>
              <option value="Freezer">Freezer</option>
              <option value="Pantry">Pantry</option>
              <option value="Storage">Storage</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default Add_Manually;
