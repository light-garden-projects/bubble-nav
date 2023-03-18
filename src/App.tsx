import "./App.css";
import { siteMap as defaultSiteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";
import { setParents } from "./modules/parse-objects";
import { BubbleNavOpts, Theme } from "./index";

type AppProps = {
  siteMap: BubbleNavOpts["siteMap"];
  width: BubbleNavOpts["width"];
  theme: Theme;
  showChildren: boolean;
};

function App({ siteMap, width = 300, theme, showChildren }: AppProps) {
  // Detect the current page from the url
  let currentUrl = window.location.pathname;

  if (!currentUrl.includes("https://scalar.usc.edu")) {
    currentUrl = `https://scalar.usc.edu${currentUrl}`;
  }
  console.log("currentUrl is:", currentUrl);

  const mySiteMap = siteMap || defaultSiteMap;

  // Make sure the parent property is set for each page
  const sitemapWithParents = setParents(mySiteMap);

  return (
    <div className="App" style={{ width: width }}>
      <BubbleNav
        siteMap={sitemapWithParents}
        currentUrl={currentUrl}
        maxWidth={width}
        onBubbleClick={(url) => {
          // setCurrentUrl(url);
          console.log("Going to url", url);
        }}
        theme={theme}
        showChildren={showChildren}
      />
    </div>
  );
}

export default App;
