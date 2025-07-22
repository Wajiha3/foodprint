import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Add_Manually from "./pages/Add_Manually";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Notifications from "./pages/Notifications";
import Profile_Page from "./pages/Profile_Page";
import Scanner from "./pages/ScannerNew";
import ScanQR from "./pages/ScanQR";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

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
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Route path="/profile" element={<Profile_Page />} />
      </Routes>
    </Router>
  );
}

export default App;
