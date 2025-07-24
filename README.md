# touript

Meets your travel enthusiasm. We develop the the best platform for your travel. 

### Folder Structure

```bash
.
+-- index.css
+-- index.html
+-- package-lock.json
+-- package.json
+-- tailwind.config.js
\-- vite.config.js
+-- public
│   +-- touript.svg
│   \-- vite.svg
+-- README.md
+-- src
│   +-- App.jsx
│   +-- index.css
│   +-- main.jsx
│   
│   +-- assets...................→ Static files (images, icons, illustrations)
│   │   \-- react.svg
│   +-- components...............→ Reusable UI elements (Button, Card, etc.)
│   │   +-- buttons
│   │   │   +-- buttonWithBorder.components.jsx
│   │   │   +-- iconButton.components.jsx
│   │   │   \-- tabBarButton.components.jsx
│   │   +-- header.components.jsx
│   │   +-- index.jsx
│   │   \-- navProfile.login.components.jsx
│   +-- contexts................→ Global state/context providers (AuthContext, ThemeContext)
│   +-- features................→ Domain logic grouped by feature (Auth, Flights, Chat, etc.)
│   +-- hooks...................→ Custom React hooks
│   +-- layouts.................→ Page shells (Navbar, Sidebar, etc.)
│   │   \-- index.jsx
│   +-- pages...................→ Route-based views (FlightSearch, Community, etc.)
│   │   +-- bookNow.pages.jsx
│   │   +-- farFable.pages.jsx
│   │   +-- firesight.pages.jsx
│   │   +-- flightDetails.pages.jsx
│   │   +-- flights.pages.jsx
│   │   +-- profile.pages.jsx
│   │   +-- settings.pages.jsx
│   │   +-- signin.pages.jsx
│   │   \-- signup.pages.jsx
│   +-- routes.................→ Centralized route configuration (React Router)
│   │   \-- index.jsx
│   +-- services...............→ API request handlers or mock service logic
│   \-- utils..................→ Utility functions and helpers
│       \-- navItems.jsx

```