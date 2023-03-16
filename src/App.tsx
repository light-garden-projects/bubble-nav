import "./App.css";
import { useState } from "react";
import { siteMap as defaultSiteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";
import { setParents } from "./modules/parse-objects";
import { BubbleNavOpts, Theme } from "./index";

type AppProps = {
  siteMap: BubbleNavOpts["siteMap"];
  width: BubbleNavOpts["width"];
  theme: Theme;
};

function App({ siteMap, width = 350, theme }: AppProps) {
  const mySiteMap = siteMap || defaultSiteMap;
  const [currentUrl, setCurrentUrl] = useState(mySiteMap.url);

  // Make sure the parent property is set for each page
  const sitemapWithParents = setParents(mySiteMap);

  return (
    <div className="App" style={{ width: width }}>
      <BubbleNav
        siteMap={sitemapWithParents}
        currentUrl={currentUrl}
        maxWidth={width}
        onBubbleClick={(url) => {
          setCurrentUrl(url);
        }}
        theme={theme}
      />
    </div>
  );
}

export default App;
