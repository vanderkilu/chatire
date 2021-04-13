import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Auth0ProviderWithHistory from "./components/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="top-center"
      >
        <App />
      </ToastProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
