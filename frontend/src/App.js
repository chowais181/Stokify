// routes
import Router from "./routes";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
// import store from "./store";
import React from "react";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <ThemeConfig>
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
