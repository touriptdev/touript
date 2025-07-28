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
import VerificationCode from "../utils/verification.section";

export default function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation ?? location;

  return (
    <>
      <Routes location={backgroundLocation}>
        <Route
          exact
          path="/"
          element={
            <Layout>
              <BookNow />
            </Layout>
          }
        />
        <Route
          exact
          path="/flights"
          element={
            <Layout>
              <Flights />
            </Layout>
          }
        />
        <Route
          exact
          path="/flights/:id"
          element={
            <Layout>
              <FlightDetails />
            </Layout>
          }
        />
        <Route
          exact
          path="/farfable"
          element={
            <Layout>
              <FarFable />
            </Layout>
          }
        />
        <Route
          exact
          path="/firesight"
          element={
            <Layout>
              <FireSight />
            </Layout>
          }
        />
        <Route
          exact
          path="/notification"
          element={
            <Layout>
              <Notification />
            </Layout>
          }
        />
        <Route
          exact
          path="/profile/:id"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          exact
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
      { backgroundLocation && location !== backgroundLocation && (
        <Routes>
          <Route
            exact
            path="/signin"
            element={
              <ResponsiveModal>
                <SignIn />
              </ResponsiveModal>
            }
          />
          <Route
            exact
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
