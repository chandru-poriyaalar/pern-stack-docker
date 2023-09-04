// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { useEffect } from "react";
import { ProgressBarStyle } from "./components/ProgressBar";
import ScrollToTop from "./components/ScrollToTop";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import ThemeSettings from "./components/settings";

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
    // Fetch get from http://localhost/api/api/v1/auth/get-all-roles

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/get-all-roles`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
