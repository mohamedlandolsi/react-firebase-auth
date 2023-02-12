import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import AuthProvider from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    index: true,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  { path: "signup", element: <Signup /> },
  { path: "login", element: <Login /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  {
    path: "update-profile",
    element: (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
