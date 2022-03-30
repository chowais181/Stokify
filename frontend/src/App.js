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
import store from "./store";
import { loadUser } from "./actions/userAction";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  //  const { isAuthenticated,user} = useSelector((state) => state.user);

  React.useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login", { replace: true });
    }
    store.dispatch(loadUser());
  }, [navigate]);

  return (
    <ThemeConfig>
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
