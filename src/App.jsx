import {
  HomeLayout,
  Landing,
  ErrorPage,
  Bookings,
  MyBookings,
  SingleBooking,
  About,
  Register,
  Login,
  MapBookings,
} from "./pages";
import { ErrorElement } from "./components";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "mapbookings",
        element: <MapBookings/>,
        errorElement: <ErrorElement/>
      },
      {
        path: "bookings",
        element: <Bookings />,
        errorElement: <ErrorElement />,
      },
      {
        path: "bookings/:id",
        element: <SingleBooking />,
        errorElement: <ErrorElement />,
      },
      {
        path: "mybookings",
        element: <MyBookings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
