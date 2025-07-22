import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/24/outline";
import { BrowserMultiFormatReader } from "@zxing/browser";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface ScanQRProps {}

const ScanQR: React.FC<ScanQRProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [productInfo, setProductInfo] = useState<{
    name: string;
    brand: string;
  } | null>(null);
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(
    null
  );

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    setCodeReader(reader);

    return () => {
      // Cleanup is handled automatically by the library
      // No explicit reset needed for newer versions
    };
  }, []);

  const startScanning = async () => {
    if (!codeReader || !videoRef.current) return;

    try {
      setIsScanning(true);

      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current
      );

      if (result) {
        setScannedData(result.getText());
        setIsScanning(false);
        await fetchProductInfo(result.getText());
      }
    } catch (error) {
      console.error("Error scanning:", error);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    // Stop scanning by setting state
    // The library handles cleanup automatically
    setIsScanning(false);
  };

  const fetchProductInfo = async (barcode: string) => {
    try {
      // Using Open Food Facts API (free and reliable)
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();

      if (data.status === 1 && data.product) {
        setProductInfo({
          name: data.product.product_name || `Product ${barcode}`,
          brand: data.product.brands || "Unknown Brand",
        });
      } else {
        // Fallback if product not found
        setProductInfo({
          name: `Product ${barcode}`,
          brand: "Unknown Brand",
        });
      }
    } catch (error) {
      console.error("Error fetching product info:", error);
      setProductInfo({
        name: `Product ${scannedData}`,
        brand: "Unknown Brand",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productInfo || !category || !expiryDate) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate urgency based on expiry date
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let urgency: "urgent" | "soon" | "safe" | "expired";
    let expiresIn: string;

    if (daysDiff < 0) {
      urgency = "expired";
      expiresIn = "Expired";
    } else if (daysDiff <= 2) {
      urgency = "urgent";
      expiresIn =
        daysDiff === 0 ? "Today" : `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
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
      name: productInfo.name,
      category: category,
      expiresIn: expiresIn,
      urgency: urgency,
      expiryDate: expiryDate,
      barcode: scannedData,
      brand: productInfo.brand,
    };

    // Save to localStorage
    const existingItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
    existingItems.push(newFoodItem);
    localStorage.setItem("foodItems", JSON.stringify(existingItems));

    // Navigate to home
    navigate("/home");
  };

  return (
    <div className="pb-16 min-h-screen flex flex-col bg-gray-50">
      <div className="p-6 pt-12 flex-grow">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <Link to="/scanner" className="mr-4">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-green-600">FoodPrint</h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Scan Product Barcode
        </h2>

        {!productInfo ? (
          <div className="space-y-6">
            {/* Camera View */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                playsInline
                muted
              />
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center text-white">
                    <CameraIcon className="h-12 w-12 mx-auto mb-2" />
                    <p className="mb-4">Point camera at barcode</p>
                  </div>
                </div>
              )}
            </div>

            {/* Scan Controls */}
            <div className="flex space-x-4">
              {!isScanning ? (
                <button
                  onClick={startScanning}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Start Scanning
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Stop Scanning
                </button>
              )}
            </div>

            {scannedData && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Scanned:</strong> {scannedData}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Fetching product information...
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Product Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Info Display */}
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg text-gray-800">
                {productInfo.name}
              </h3>
              <p className="text-gray-500 text-sm">{productInfo.brand}</p>
              <p className="text-xs text-gray-400 mt-1">
                Barcode: {scannedData}
              </p>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Storage Location *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              >
                <option value="" disabled>
                  Where will you store this?
                </option>
                <option value="Fridge">Fridge</option>
                <option value="Freezer">Freezer</option>
                <option value="Pantry">Pantry</option>
                <option value="Storage">Storage</option>
              </select>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  setProductInfo(null);
                  setScannedData("");
                  setCategory("");
                  setExpiryDate("");
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Scan Again
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Add Product
              </button>
            </div>
          </form>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default ScanQR;
