import "./App.css";
import { useState } from "react";
import { siteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";
import { setParents } from "./modules/parse-objects";

const navWidth = 400;

function App() {
  const mySiteMap = siteMap;
  const [currentUrl, setCurrentUrl] = useState(mySiteMap.url);

  // Make sure the parent property is set for each page
  const sitemapWithParents = setParents(mySiteMap);

  return (
    <div className="App" style={{ marginBottom: 50 }}>
      <p style={{ marginBottom: 100 }}>{currentUrl}</p>
      <BubbleNav
        siteMap={sitemapWithParents}
        currentUrl={currentUrl}
        maxWidth={navWidth}
        onBubbleClick={(url) => {
          setCurrentUrl(url);
        }}
      />
    </div>
  );
}

export default App;
