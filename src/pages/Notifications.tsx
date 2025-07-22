import {
  ArrowLeftIcon,
  BellIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

type FoodItem = {
  id: string;
  name: string;
  category: string;
  urgency: "urgent" | "soon" | "safe" | "expired";
  expiryDate?: string;
};

const Notifications = () => {
  const [, setRefreshTrigger] = React.useState(0);

  // Delete function
  const handleDeleteItem = (itemId: string) => {
    // Get saved items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
    // Remove the item with matching ID
    const updatedItems = savedItems.filter(
      (item: FoodItem) => item.id !== itemId
    );
    // Save back to localStorage
    localStorage.setItem("foodItems", JSON.stringify(updatedItems));
    // Trigger refresh
    setRefreshTrigger((prev) => prev + 1);
  };

  const getNotificationItems = (): FoodItem[] => {
    const savedItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
    const today = new Date();

    return savedItems
      .map((item: FoodItem) => {
        if (!item.expiryDate) return { ...item, urgency: "safe" };

        const expiryDate = new Date(item.expiryDate);
        const daysDiff = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        let urgency: "urgent" | "soon" | "safe" | "expired";
        if (daysDiff < 0) urgency = "expired";
        else if (daysDiff <= 1) urgency = "urgent";
        else if (daysDiff <= 3) urgency = "soon";
        else urgency = "safe";

        return { ...item, urgency };
      })
      .filter(
        (item: FoodItem) =>
          item.urgency === "urgent" ||
          item.urgency === "soon" ||
          item.urgency === "expired"
      )
      .sort((a: FoodItem, b: FoodItem) => {
        const urgencyOrder = { expired: 0, urgent: 1, soon: 2, safe: 3 };
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      });
  };

  const notificationItems = getNotificationItems();

  const getNotificationMessage = (item: FoodItem): string => {
    if (!item.expiryDate) return `${item.name} needs attention`;

    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysDiff = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff < 0) {
      const expiredDays = Math.abs(daysDiff);
      return `${item.name} expired ${expiredDays} day${
        expiredDays > 1 ? "s" : ""
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
    switch (item.urgency) {
      case "expired":
        return "border-red-500 bg-red-50";
      case "urgent":
        return "border-orange-500 bg-orange-50";
      case "soon":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-green-500 bg-green-50";
    }
  };

  const getNotificationIcon = (item: FoodItem) => {
    switch (item.urgency) {
      case "expired":
        return "🚨";
      case "urgent":
        return "⚠️";
      case "soon":
        return "🔔";
      default:
        return "✅";
    }
  };

  return (
    <div className="pb-16 min-h-screen bg-gray-50">
      <div className="p-6 pt-12">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/home" className="mr-4">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </Link>
          <div className="flex items-center">
            <BellIcon className="h-7 w-7 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-green-600">Notifications</h1>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <p className="text-gray-600">
            You have{" "}
            <span className="font-semibold text-orange-600">
              {notificationItems.length}
            </span>{" "}
            item{notificationItems.length !== 1 ? "s" : ""} that need attention
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notificationItems.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                No notifications
              </h3>
              <p className="text-gray-400">All your food items are fresh! 🎉</p>
            </div>
          ) : (
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
                      {getNotificationIcon(item)} {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getNotificationMessage(item)}
                    </p>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full mt-2 inline-block">
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="ml-3 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete item"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Notifications;
