import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Scanner from "./pages/ScannerNew";
import Add_Manually from "./pages/Add_Manually";
import Notifications from "./pages/Notifications";
import ScanQR from "./pages/ScanQR";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Route path="/add-manual" element={<Add_Manually />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/scan-qr" element={<ScanQR />} />
      </Routes>
    </Router>
  );
}

export default App;
