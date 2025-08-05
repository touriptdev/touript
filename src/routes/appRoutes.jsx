/*
    Author: Gulam Choudhury
    Moderator:
    Last Update: July 27, 2025
    Tricky: 
    Description: Create all the App router here. BackgroundLocation help you navigate the previous routing. Use the loggedin or other measure to secure the paths. Most of the element can be found in page folder but the layout is in layout folder. 
*/

import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../layouts";
import BookNow from "../pages/bookNow.pages";
import Flights from "../pages/flights.pages";
import FlightDetails from "../pages/flightDetails.pages";
import FarFable from "../pages/farFable.pages";
import FireSight from "../pages/firesight.pages";
import Profile from "../pages/profile.pages";
import Settings from "../pages/settings.pages";
import Notification from "../pages/notification.pages";

export default function AppRoutes({ backgroundLocation }) {
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
    </>
  );
}
