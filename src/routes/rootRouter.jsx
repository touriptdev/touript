/*
    Author: Gulam Choudhury
    Moderator:
    Last Update: July 27, 2025
    Tricky: Don't use Router here. As you can't call useLocation outside of Router. 
    Description: Combining the both App router and Modal Router Here. 
*/

import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./appRoutes";
import ModalRoutes from "./modalRoutes";

export default function RootRouter() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation ?? location;
  return (
    <>
      <AppRoutes backgroundLocation={backgroundLocation} />
      <ModalRoutes
        backgroundLocation={backgroundLocation}
        currentLocation={location}
      />
    </>
  );
}
