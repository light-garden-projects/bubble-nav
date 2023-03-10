import "./App.css";
import { useState } from "react";
import { siteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";
import { setParents } from "./modules/parse-objects";

function App() {
  const mySiteMap = siteMap;
  const [currentUrl, setCurrentUrl] = useState(mySiteMap.url);

  // Make sure the parent property is set for each page
  const sitemapWithParents = setParents(mySiteMap);

  return (
    <div className="App">
      <BubbleNav
        siteMap={sitemapWithParents}
        currentUrl={currentUrl}
        onBubbleClick={(url) => {
          setCurrentUrl(url);
        }}
      />
      <p>{currentUrl}</p>
    </div>
  );
}

export default App;
