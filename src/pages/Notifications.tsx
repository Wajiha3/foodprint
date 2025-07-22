import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  BellIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

type FoodItem = {
  id: string;
  name: string;
  category: string;
  expiresIn: string;
  urgency: "urgent" | "soon" | "safe" | "expired";
  expiryDate?: string;
};

const Notifications: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  // Delete function
  const handleDeleteItem = (itemId: string) => {
    // Get saved items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("foodItems") || "[]");

    // Filter out the item to delete
    const updatedItems = savedItems.filter(
      (item: FoodItem) => item.id !== itemId
    );

    // Save back to localStorage
    localStorage.setItem("foodItems", JSON.stringify(updatedItems));

    // Trigger re-render
    setRefreshTrigger((prev) => prev + 1);
  };

  // Get all food items from localStorage and default items
  const getNotificationItems = (): FoodItem[] => {
    const today = new Date();

    // Default items
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
    ];

    const savedItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
    const allItems = [...defaultItems, ...savedItems];

    // Filter items that expire in 2 days or less (including expired)
    return allItems
      .filter((item) => {
        if (!item.expiryDate) return false;
        const expiryDate = new Date(item.expiryDate);
        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff <= 2; // Expires in 2 days or less (including expired items)
      })
      .sort((a, b) => {
        // Sort by expiry date (soonest first)
        if (!a.expiryDate || !b.expiryDate) return 0;
        return (
          new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
        );
      });
  };

  const notificationItems = React.useMemo(
    () => getNotificationItems(),
    [refreshTrigger]
  );

  const getNotificationMessage = (item: FoodItem): string => {
    if (!item.expiryDate) return `${item.name} needs attention`;

    const today = new Date();
    const expiryDate = new Date(item.expiryDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return `${item.name} expired ${Math.abs(daysDiff)} day${
        Math.abs(daysDiff) > 1 ? "s" : ""
      } ago`;
    } else if (daysDiff === 0) {
      return `${item.name} expires today!`;
    } else if (daysDiff === 1) {
      return `${item.name} expires tomorrow`;
    } else {
      return `${item.name} expires in ${daysDiff} days`;
    }
  };

  const getNotificationColor = (item: FoodItem): string => {
    if (!item.expiryDate) return "bg-gray-50 border-gray-200";

    const today = new Date();
    const expiryDate = new Date(item.expiryDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return "bg-gray-50 border-gray-200"; // Expired
    if (daysDiff === 0) return "bg-red-50 border-red-200"; // Expires today
    if (daysDiff === 1) return "bg-orange-50 border-orange-200"; // Expires tomorrow
    return "bg-yellow-50 border-yellow-200"; // Expires in 2 days
  };

  return (
    <div className="pb-16 min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/home" className="mr-4">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </Link>
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-green-600">Notifications</h1>
          </div>
        </div>

        {/* Notification Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {notificationItems.length > 0
              ? `You have ${notificationItems.length} item${
                  notificationItems.length > 1 ? "s" : ""
                } that need attention`
              : "No urgent notifications at the moment"}
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notificationItems.length > 0 ? (
            notificationItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 ${getNotificationColor(
                  item
                )}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {getNotificationMessage(item)}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.category} • Added to your food list
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-500">
                      {item.expiryDate &&
                        new Date(item.expiryDate).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete item"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">All caught up!</p>
              <p className="text-gray-400 text-sm">
                No items expiring in the next 2 days
              </p>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Notifications;
