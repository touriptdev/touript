import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Layout, ResponsiveModal } from "../layouts";
import BookNow from "../pages/bookNow.pages";
import Flights from "../pages/flights.pages";
import FlightDetails from "../pages/flightDetails.pages";
import FarFable from "../pages/farFable.pages";
import FireSight from "../pages/firesight.pages";
import Profile from "../pages/profile.pages";
import Settings from "../pages/settings.pages";
import Notification from "../pages/notification.pages";
import SignIn from "../pages/signin.pages";
import SignUp from "../pages/signup.pages";

export default function AppRoutes() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation || location;

  return (
    <>
      <Routes location={backgroundLocation}>
        <Route
          path="/"
          element={
            <Layout>
              <BookNow />
            </Layout>
          }
        />
        <Route
          path="/flights"
          element={
            <Layout>
              <Flights />
            </Layout>
          }
        />
        <Route
          path="/flights/:id"
          element={
            <Layout>
              <FlightDetails />
            </Layout>
          }
        />
        <Route
          path="/farfable"
          element={
            <Layout>
              <FarFable />
            </Layout>
          }
        />
        <Route
          path="/firesight"
          element={
            <Layout>
              <FireSight />
            </Layout>
          }
        />
        <Route
          path="/notification"
          element={
            <Layout>
              <Notification />
            </Layout>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Modal overlays */}
      {/* {location.pathname === "/signup" && (
        <ResponsiveModal>
          <SignUp />
        </ResponsiveModal>
      )}
      {location.pathname === "/signin" && (
        <ResponsiveModal>
          <SignIn />
        </ResponsiveModal>
      )} */}

      {backgroundLocation && (
        <Routes>
          <Route
            path="/signin"
            element={
              <ResponsiveModal>
                <SignIn />
              </ResponsiveModal>
            }
          />
          <Route
            path="/signup"
            element={
              <ResponsiveModal>
                <SignUp />
              </ResponsiveModal>
            }
          />
        </Routes>
      )}
    </>
  );
}
