/* 
  
  Author: Gulam Choudhury
  Moderator: 
  Last Updated: 26 July, 2025
  Description: Holds the 
  
  */

import { BrowserRouter as Router } from "react-router-dom";
import { RootRouter } from "./routes";

export default function App() {
  return (
    <Router>
      <RootRouter />
    </Router>
  );
}
