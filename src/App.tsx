import "./App.css";
import { useState } from "react";
import { siteMap as defaultSiteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";
import { setParents } from "./modules/parse-objects";
import { BubbleNavOpts } from "./index";

function App({ siteMap, width = 400 }: BubbleNavOpts) {
  const mySiteMap = siteMap || defaultSiteMap;
  const [currentUrl, setCurrentUrl] = useState(mySiteMap.url);

  // Make sure the parent property is set for each page
  const sitemapWithParents = setParents(mySiteMap);

  return (
    <div className="App" style={{ marginBottom: 50 }}>
      <p style={{ marginBottom: 100 }}>{currentUrl}</p>
      <BubbleNav
        siteMap={sitemapWithParents}
        currentUrl={currentUrl}
        maxWidth={width}
        onBubbleClick={(url) => {
          setCurrentUrl(url);
        }}
      />
    </div>
  );
}

export default App;
