// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts";

import BookNow from "./pages/bookNow.pages";
import Flights from "./pages/flights.pages";
import FlightDetails from "./pages/flightDetails.pages";
import FarFable from "./pages/farFable.pages";
import FireSight from "./pages/firesight.pages";
import Profile from "./pages/profile.pages";
import Settings from "./pages/settings.pages";
import SignIn from "./pages/signin.pages";
import SignUp from "./pages/signup.pages";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <BookNow />{" "}
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
