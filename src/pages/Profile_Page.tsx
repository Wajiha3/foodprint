import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile_Page: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "",
    birthday: "1990-01-01",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [showAppSettings, setShowAppSettings] = useState(false);

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    expiryAlerts: true,
    dailyReminders: true,
  });

  // App settings state
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    autoSync: true,
    dataBackup: true,
    language: "English",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage (you can replace this with actual API call)
      localStorage.setItem("userProfile", JSON.stringify(formData));

      setMessage("Profile updated successfully!");

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification settings toggle
  const handleNotificationToggle = (
    setting: keyof typeof notificationSettings
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handle app settings toggle
  const handleAppSettingsToggle = (setting: keyof typeof appSettings) => {
    if (setting === "language") return; // Handle language separately
    setAppSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof Omit<typeof appSettings, "language">],
    }));
  };

  // Save settings
  const handleSaveSettings = (type: "notification" | "app") => {
    if (type === "notification") {
      localStorage.setItem(
        "notificationSettings",
        JSON.stringify(notificationSettings)
      );
      setShowNotificationSettings(false);
    } else {
      localStorage.setItem("appSettings", JSON.stringify(appSettings));
      setShowAppSettings(false);
    }
    setMessage(
      `${
        type === "notification" ? "Notification" : "App"
      } settings saved successfully!`
    );
    setTimeout(() => setMessage(""), 3000);
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
            <UserIcon className="h-7 w-7 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-green-600">Profile</h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-4">
          {/* User Info Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Profile Information
                </h3>
                <p className="text-gray-500">Manage your personal details</p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {/* Success/Error Message */}
              {message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.includes("successfully")
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  placeholder="Enter new password (leave blank to keep current)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>

          {/* Settings Options */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
            </div>

            <div className="divide-y divide-gray-100">
              <button
                onClick={() => setShowNotificationSettings(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🔔</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-gray-900">
                      Notifications
                    </h4>
                    <p className="text-xs text-gray-500">
                      Manage your notification preferences
                    </p>
                  </div>
                </div>
                <ArrowLeftIcon className="h-4 w-4 text-gray-400 rotate-180" />
              </button>

              <button
                onClick={() => setShowAppSettings(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-sm">⚙️</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-gray-900">
                      App Settings
                    </h4>
                    <p className="text-xs text-gray-500">
                      Configure app preferences
                    </p>
                  </div>
                </div>
                <ArrowLeftIcon className="h-4 w-4 text-gray-400 rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings Modal */}
        {showNotificationSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Push Notifications
                  </span>
                  <button
                    onClick={() =>
                      handleNotificationToggle("pushNotifications")
                    }
                    className={`w-12 h-6 rounded-full ${
                      notificationSettings.pushNotifications
                        ? "bg-green-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        notificationSettings.pushNotifications
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Email Notifications
                  </span>
                  <button
                    onClick={() =>
                      handleNotificationToggle("emailNotifications")
                    }
                    className={`w-12 h-6 rounded-full ${
                      notificationSettings.emailNotifications
                        ? "bg-green-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        notificationSettings.emailNotifications
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Expiry Alerts</span>
                  <button
                    onClick={() => handleNotificationToggle("expiryAlerts")}
                    className={`w-12 h-6 rounded-full ${
                      notificationSettings.expiryAlerts
                        ? "bg-green-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        notificationSettings.expiryAlerts
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Daily Reminders</span>
                  <button
                    onClick={() => handleNotificationToggle("dailyReminders")}
                    className={`w-12 h-6 rounded-full ${
                      notificationSettings.dailyReminders
                        ? "bg-green-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        notificationSettings.dailyReminders
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowNotificationSettings(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveSettings("notification")}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* App Settings Modal */}
        {showAppSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                App Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Dark Mode</span>
                  <button
                    onClick={() => handleAppSettingsToggle("darkMode")}
                    className={`w-12 h-6 rounded-full ${
                      appSettings.darkMode ? "bg-green-600" : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        appSettings.darkMode
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto Sync</span>
                  <button
                    onClick={() => handleAppSettingsToggle("autoSync")}
                    className={`w-12 h-6 rounded-full ${
                      appSettings.autoSync ? "bg-green-600" : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        appSettings.autoSync
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Data Backup</span>
                  <button
                    onClick={() => handleAppSettingsToggle("dataBackup")}
                    className={`w-12 h-6 rounded-full ${
                      appSettings.dataBackup ? "bg-green-600" : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        appSettings.dataBackup
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Language</span>
                  <select
                    value={appSettings.language}
                    onChange={(e) =>
                      setAppSettings((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAppSettings(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveSettings("app")}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default Profile_Page;
