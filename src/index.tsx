import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Page } from "./types/types";

declare global {
  interface Window {
    embedBubbleNav: Function;
  }
}

export type Theme = {
  primaryColor: string;
};

export type BubbleNavOpts = {
  siteMap?: Page;
  width?: number;
  theme?: Theme;
  showChildren?: boolean;
};

window.embedBubbleNav = function (
  elementId: keyof HTMLElementTagNameMap,
  opts: BubbleNavOpts = {}
) {
  // const params = qs.parse(window.location.search.slice(1));
  const { siteMap, width, theme, showChildren } = opts;
  console.log("width", width);
  console.log("siteMap", siteMap);

  const navTheme = theme || {
    primaryColor: "rgba(4,100,128, 1)",
  };

  const el = document.querySelector(elementId);
  const render = () =>
    ReactDOM.render(
      <React.StrictMode>
        <App
          siteMap={siteMap}
          width={width}
          theme={navTheme}
          showChildren={Boolean(showChildren)}
        />
      </React.StrictMode>,
      el
    );
  render();
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
