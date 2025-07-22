import { BellIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

type FoodItem = {
  id: string;
  name: string;
  category: string;
  expiresIn: string;
  urgency: "urgent" | "soon" | "safe" | "expired";
  expiryDate?: string; // Optional for backward compatibility with existing data
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "expiring" | "expired"
  >("all");

  // Load items from localStorage and combine with default items
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    // Calculate expiry dates for default items (for demo purposes)
    const today = new Date();
    const defaultItems: FoodItem[] = [
      {
        id: "1",
        name: "Meat",
        category: "Freezer",
        expiresIn: "3 days",
        urgency: "urgent",
        expiryDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        id: "2",
        name: "Fish",
        category: "Freezer",
        expiresIn: "2 days",
        urgency: "urgent",
        expiryDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        id: "3",
        name: "Milk",
        category: "Fridge",
        expiresIn: "1 days",
        urgency: "urgent",
        expiryDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        id: "4",
        name: "Sugar",
        category: "Storage",
        expiresIn: "1 month",
        urgency: "soon",
        expiryDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        id: "5",
        name: "Juice",
        category: "Fridge",
        expiresIn: "3 months",
        urgency: "safe",
        expiryDate: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    ];

    // Load saved items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("foodItems") || "[]");

    // Combine and sort by actual expiry date (closest expiry first)
    const allItems = [...defaultItems, ...savedItems];
    const sortedItems = allItems.sort((a, b) => {
      // First, separate expired items to put them at the end
      if (a.urgency === "expired" && b.urgency !== "expired") return 1;
      if (a.urgency !== "expired" && b.urgency === "expired") return -1;
      if (a.urgency === "expired" && b.urgency === "expired") {
        // Sort expired items by expiry date (most recently expired first)
        if (!a.expiryDate || !b.expiryDate) return 0;
        return (
          new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
        );
      }

      // For non-expired items, sort by expiry date (earliest first)
      if (!a.expiryDate || !b.expiryDate) return 0;
      return (
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      );
    });

    setFoodItems(sortedItems);
  }, []);

  // Delete function
  const deleteItem = (itemId: string) => {
    // Remove from state
    const updatedItems = foodItems.filter((item) => item.id !== itemId);
    setFoodItems(updatedItems);

    // Remove from localStorage (only user-added items)
    const savedItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
    const updatedSavedItems = savedItems.filter(
      (item: any) => item.id !== itemId
    );
    localStorage.setItem("foodItems", JSON.stringify(updatedSavedItems));
  };

  // Count notification items (expires in 2 days or less)
  const getNotificationCount = (): number => {
    const today = new Date();
    return foodItems.filter((item) => {
      if (!item.expiryDate) return false;
      const expiryDate = new Date(item.expiryDate);
      const timeDiff = expiryDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff <= 2; // Expires in 2 days or less
    }).length;
  };

  const notificationCount = getNotificationCount();

  const filteredItems = foodItems.filter((item) => {
    if (activeFilter === "all") return item.urgency !== "expired"; // Exclude expired from all items
    if (activeFilter === "expiring")
      return item.urgency === "urgent" || item.urgency === "soon";
    if (activeFilter === "expired") return item.urgency === "expired";
    return false;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "soon":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="pb-16">
      <div className="p-4 pt-12">
        {/* Header with notification icon */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-green-600">FoodPrint</h1>
          </div>
          <Link to="/notifications" className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 hover:text-green-600 transition-colors" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>
        </div>
        <p className="text-gray-500 mb-4">Track your food expiry dates</p>

        {/* Filters */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveFilter("expiring")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "expiring"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Expiring Soon
          </button>
          <button
            onClick={() => setActiveFilter("expired")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "expired"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Expired
          </button>
        </div>

        {/* Food Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(
                      item.urgency
                    )}`}
                  >
                    {item.expiresIn}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Delete item"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
