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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/add-manual" element={<Add_Manually />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
