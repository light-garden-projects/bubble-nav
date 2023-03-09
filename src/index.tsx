import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

declare global {
  interface Window {
    embedBubbleNav: Function;
  }
}

window.embedBubbleNav = function (
  elementId: keyof HTMLElementTagNameMap,
  opts: any
) {
  // const params = qs.parse(window.location.search.slice(1));

  const el = document.querySelector(elementId);
  const render = () =>
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      el
    );
  render();
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
