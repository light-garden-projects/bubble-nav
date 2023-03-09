import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";

type BubbleNavProps = {
  siteMap: Page;
};

const width = 500;
const height = 500;
const centre: Point = [width / 2, height / 2];

export const BubbleNav = ({ siteMap }: BubbleNavProps) => {
  return (
    <div>
      <h1>Bubble Nav</h1>
      <svg width={width} height={height}>
        {siteMap.children.map((page) => {
          return (
            <Bubble
              key={page.title}
              startPoint={centre}
              endPoint={[Math.random() * width, Math.random() * height]}
              r={20}
            />
          );
        })}
      </svg>
    </div>
  );
};
