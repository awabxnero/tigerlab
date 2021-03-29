import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./firebase";
import "./tailwind.css";
import "./tailwind.output.css";
import { GlobalProvider } from "./contexts/GlobalContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    {/* pass conext to the app */}
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  // incase of testing enviroment
  document.getElementById("root") || document.createElement("div")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
