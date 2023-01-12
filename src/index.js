import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
    <BrowserRouter basename="contacts-manager">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
