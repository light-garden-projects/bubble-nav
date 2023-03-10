import "./App.css";
import { useState } from "react";
import { siteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";
import { setParents } from "./modules/parse-objects";

function App() {
  const mySiteMap = siteMap;

  // Make sure the parent property is set for each page
  const sitemapWithParents = setParents(mySiteMap);
  console.log(sitemapWithParents);

  const [currentUrl, setCurrentUrl] = useState(mySiteMap.url);

  return (
    <div className="App">
      <BubbleNav
        siteMap={mySiteMap}
        currentUrl={currentUrl}
        onBubbleClick={(url) => {
          setCurrentUrl(url);
        }}
      />
    </div>
  );
}

export default App;
