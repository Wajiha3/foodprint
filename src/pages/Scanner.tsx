import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { QrCodeIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";

// Force this file to be treated as a module
export {};

const Scanner = () => {
  return (
    <div className="pb-16 min-h-screen flex flex-col bg-gray-50">
      <div className="p-6 flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-green-600 mb-8">FoodPrint</h1>

        <div className="w-full max-w-md space-y-6">
          <Link
            to="/add-manual"
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <DocumentPlusIcon className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h2 className="font-semibold text-lg">Add Manually</h2>
                <p className="text-gray-500 text-sm">Enter product details</p>
              </div>
            </div>
            <span className="text-gray-400">{">"}</span>
          </Link>

          <Link
            to="/scan-qr"
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <QrCodeIcon className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h2 className="font-semibold text-lg">Scan QR</h2>
                <p className="text-gray-500 text-sm">Scan product barcode</p>
              </div>
            </div>
            <span className="text-gray-400">{">"}</span>
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Scanner;
