import "./App.css";
import { siteMap } from "./data/site-map";
import { BubbleNav } from "./components/bubble-nav";

function App() {
  const mySiteMap = siteMap;

  return (
    <div className="App">
      <BubbleNav siteMap={mySiteMap} />
    </div>
  );
}

export default App;
