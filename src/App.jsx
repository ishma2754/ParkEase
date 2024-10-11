import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import ErrorPage from "./pages/ErrorPage"
import { ErrorElement, Loader } from "./components";

const HomeLayout = lazy(() => import("./pages/HomeLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const About = lazy(() => import("./pages/About"));
const ListBookings = lazy(() => import("./pages/ListBookings"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const SingleBooking = lazy(() => import("./pages/SingleBooking"));
const MapBookings = lazy(() => import("./pages/MapBookings"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <HomeLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Landing />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "mapbookings",
        element: (
          <Suspense fallback={<Loader />}>
            <MapBookings />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "listbookings",
        element: (
          <Suspense fallback={<Loader />}>
            <ListBookings/>
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "listbookings/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <SingleBooking />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "listbookings/:id/confirm",
        element: (
          <Suspense fallback={<Loader />}>
            <Confirmation />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "mybookings",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <MyBookings />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
