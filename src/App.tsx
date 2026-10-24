import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/Notfound/Notfound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoute from "./Components/ProtectedRoute/ProtectedAuthRoute";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetails from "./Pages/PostDetails/PostDetails";
import { Toaster } from "react-hot-toast";
import { useNetworkState } from "react-use";
import Offline from "./Components/Offline/Offline";
import UpdateData from "./Pages/UpdateData/UpdateData";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";

const query = new QueryClient();

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "postdetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "updatedata/:postId/:commentId",
        element: (
          <ProtectedRoute>
            <UpdateData />
          </ProtectedRoute>
        ),
      },
      {
        path: "changepassword",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoute>
            <Register />
          </ProtectedAuthRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  const { online } = useNetworkState();

  return (
    <>
      {!online && <Offline />}

      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <Toaster />
          <RouterProvider router={routers}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
