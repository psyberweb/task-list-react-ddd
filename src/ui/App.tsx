import React from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Page404 from "./pages/Page404";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/user/UserPage";
import TaskPage from "./pages/task/TaskPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainPage>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/users" element={<UserPage />} />
              <Route path="/tasks" element={<TaskPage />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </MainPage>
      </Router>
    </AuthProvider>
  );
}

export default App;
