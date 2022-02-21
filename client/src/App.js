import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Space from "./views/Space";
import About from "./views/About";
import Friend from "./views/Friends";
import UserInfo from "./views/UserInfo";
import ProjectList from "./views/ProjectList";
import ProjectDetail from "./views/ProjectDetail";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "../src/component/routing/ProtectedRoute";
import NavbarMenu from "./component/layout/NavbarMenu";
import PostContextProvider from "./contexts/PostContext";
import FriendContextProvider from "./contexts/FriendContext";
import SpaceContextProvider from "./contexts/SpaceContext";
import ProjectContextProvider from "./contexts/ProjectContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <FriendContextProvider>
          <SpaceContextProvider>
            <ProjectContextProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Auth authRoute="login" />} />
                  <Route
                    path="/register"
                    element={<Auth authRoute="register" />}
                  />
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
                    path="/work-space"
                    element={
                      <ProtectedRoute>
                        <NavbarMenu />
                        <Space />
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
                  <Route
                    path="/user-info"
                    element={
                      <ProtectedRoute>
                        <NavbarMenu />
                        <UserInfo />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/friend/*"
                    element={
                      <ProtectedRoute>
                        <NavbarMenu />
                        <Friend />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/work-space/project"
                    element={
                      <ProtectedRoute>
                        <NavbarMenu />
                        <ProjectList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/work-space/project-detail"
                    element={
                      <ProtectedRoute>
                        <NavbarMenu />
                        <ProjectDetail />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </ProjectContextProvider>
          </SpaceContextProvider>
        </FriendContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
