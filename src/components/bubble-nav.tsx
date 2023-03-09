import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";

type BubbleNavProps = {
  siteMap: Page;
};

const width = 500;
const height = 500;
const centre: Point = [width / 2, height / 2];

const testurl =
  "https://scalar.usc.edu/works/2020-dreams/media/appendices_and_repositories-min.png";

export const BubbleNav = ({ siteMap }: BubbleNavProps) => {
  return (
    <div
      style={{
        border: "1px solid black",
      }}
    >
      <svg width={width} height={height}>
        <defs>
          {siteMap.children
            .filter((page) => page.backgroundImage)
            .map((page) => {
              return (
                <pattern
                  key={page.url}
                  id={page.backgroundImage}
                  patternUnits="userSpaceOnUse"
                  height="150"
                  width="150"
                >
                  <image
                    x="0"
                    y="0"
                    height="150"
                    width="150"
                    xlinkHref={page.backgroundImage}
                  ></image>
                </pattern>
              );
            })}
        </defs>
        <circle id="top" cx="50" cy="50" r="50" fill="url(#image)" />
        {siteMap.children.map((page) => {
          return (
            <Bubble
              key={page.url}
              page={page}
              startPoint={centre}
              endPoint={[Math.random() * width, Math.random() * height]}
              r={75}
            />
          );
        })}
      </svg>
    </div>
  );
};
