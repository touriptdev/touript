import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookNow from '../pages/bookNow.pages';
import Flights from '../pages/flights.pages';
import FlightDetails from '../pages/flightDetails.pages';
import FarFable from '../pages/farFable.pages';
import FireSight from '../pages/firesight.pages';
import Profile from '../pages/profile.pages';
import Settings from '../pages/settings.pages';
import SignIn from '../pages/signin.pages';
import SignUp from '../pages/signup.pages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BookNow />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/flights/:id" element={<FlightDetails />} />
      <Route path="/farfable" element={<FarFable />} />
      <Route path="/fireshight" element={<FireSight />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}