import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage></Homepage>,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path:'/signin',
        element:<Signin/>
      }
    ],
  },
]);
export default router;
