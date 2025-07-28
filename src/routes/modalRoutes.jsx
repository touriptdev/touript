/*
    Author: Gulam Choudhury
    Moderator:
    Last Update: July 27, 2025
    Tricky: 
    Description: Create all the Modal router here. BackgroundLocation and CurrentLocation help you navigate the routing. Each Modal is wrapped with ResponsiveModal. Check the Layout Folder for responsiveModal.jsx 
*/

import { Routes, Route } from "react-router-dom";
import { ResponsiveModal } from "../layouts";
import SignIn from "../pages/signin.pages";
import SignUp from "../pages/signup.pages";

export default function ModalRoutes({ backgroundLocation, currentLocation }) {
  const showModal =
    backgroundLocation && currentLocation !== backgroundLocation;

  return (
    <>
      {showModal && (
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
