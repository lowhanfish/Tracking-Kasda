import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
// import Login from "./auth/Login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Profile from "./pages/profile.jsx";
import Template1 from "./pages/example/template1.jsx";
import Template2 from "./pages/example/template2.jsx";
import Documentation from "./pages/example/documentation.jsx";
import AccessSetting from "./auth/accessSetting.jsx";

import Login from "./auth/login.jsx";
import Registration from "./auth/registration.jsx";
import Home from "./auth/home.jsx";


const PublicRoute = () => {
  const token = localStorage.getItem('authToken');

  // Jika token ada, arahkan ke dashboard
  if (token) {
    return <Navigate to="/Dashboard" replace />;
  }

  // Jika token tidak ada, izinkan akses ke rute publik
  return <Outlet />;
};


// Komponen ProtectedRoute yang sudah dimodifikasi
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');

  // Jika ada token, izinkan akses ke rute anak
  if (token) {
    return <Outlet />;
  }

  // Jika tidak ada token, kembalikan ke login
  return <Navigate to="/login" replace />;
};



function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes tanpa drawer */}

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        {/* Pages routes dengan drawer */}
        {/* <Route element={<MainLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Template1" element={<Template1 />} />
          <Route path="/Template2" element={<Template2 />} />
          <Route path="/Documentation" element={<Documentation />} />
          <Route path="/AccessSetting" element={<AccessSetting />} />
          <Route path="/Registration" element={<Registration />} />
        </Route> */}


        {/* ------------------------------------------- */}
        {/* Rute terproteksi */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Template1" element={<Template1 />} />
            <Route path="/Template2" element={<Template2 />} />
            <Route path="/Documentation" element={<Documentation />} />
            <Route path="/AccessSetting" element={<AccessSetting />} />

          </Route>
        </Route>
        {/* ------------------------------------------- */}
      </Routes>
    </Router>
  );
}

export default App;
