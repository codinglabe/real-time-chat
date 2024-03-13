import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
function App() {
  const {authUser} = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={authUser ? <Home />:<Navigate to="/login"/>} />
        <Route path="/login" element={authUser ? <Navigate to="/"/>:<Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/"/>:<SignUp />} />
      </>
    )
  );

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  );
}

export default App;
