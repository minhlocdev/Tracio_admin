import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LoadableHome,
  LoadableAbout,
} from "./utils/imports/LoadableComponents";
import ErrorBoundary from "./components/hoc/ErrorBoundary";
import Login from "./pages/Login";
import AppConfigProvider from "./components/hoc/AppConfigProvider";

const App: React.FC = () => {
  const [isDarkMode] = useState(true); // Manage dark mode state

  return (
    <Router>
      <ErrorBoundary>
        <AppConfigProvider isDarkMode={isDarkMode}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LoadableHome />} />
            <Route path="/about" element={<LoadableAbout />} />
          </Routes>
        </AppConfigProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
