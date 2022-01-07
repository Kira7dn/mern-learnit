import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "../src/component/routing/ProtectedRoute";
import NavbarMenu from "./component/layout/NavbarMenu";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <About />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
