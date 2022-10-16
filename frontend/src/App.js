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
import React, { useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  const [stripeApiKey, setStripeApiKey] = useState(
    "pk_test_51KiyJVDWF4zRUS5Ci614ejyt9Kd2JnBKV4ktGkOwbkpBgxO4MfkQ8K3KWpkg7AlmIfwg41fYijjGgc9aJlo2VAiz004WALV7Mv"
  );

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    // if (localStorage.getItem("isAuthenticated")) {
    //   navigate("/register", { replace: true });
    // }
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [navigate]);

  return (
    <ThemeConfig>
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Router />
      </Elements>
    </ThemeConfig>
  );
}
