import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";

type BubbleNavProps = {
  siteMap: Page;
};

const width = 500;
const height = 500;
const centre: Point = [width / 2, height / 2];

// const testurl = "https://www.njamed.com/images/phrasebook/Council%20office.jpg";

export const BubbleNav = ({ siteMap }: BubbleNavProps) => {
  return (
    <div
      style={{
        border: "1px solid black",
      }}
    >
      <svg width={width} height={height}>
        <defs>
          <pattern
            id="image"
            patternUnits="userSpaceOnUse"
            height="100"
            width="100"
          >
            <image
              x="0"
              y="0"
              height="100"
              width="100"
              xlinkHref="http://i.imgur.com/7Nlcay7.jpg"
            ></image>
          </pattern>
        </defs>
        <circle id="top" cx="50" cy="50" r="50" fill="url(#image)" />
        {siteMap.children.map((page) => {
          return (
            <Bubble
              key={page.url}
              page={page}
              startPoint={centre}
              endPoint={[Math.random() * width, Math.random() * height]}
              r={50}
            />
          );
        })}
      </svg>
    </div>
  );
};
