import { getCirclePoints } from "../modules/points-on-circle";
import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";

type BubbleNavProps = {
  siteMap: Page;
  currentUrl: string;
  onBubbleClick: (url: string) => void;
};

const width = 500;
const height = 500;
const center: Point = [width / 2, height / 2];
const circleRadius = 60;
const bounceOffset = 20;

export const BubbleNav = ({
  siteMap,
  currentUrl,
  onBubbleClick,
}: BubbleNavProps) => {
  const numPointsOnCircle = 7;
  const circlePoints = getCirclePoints(
    numPointsOnCircle,
    width / 2 - circleRadius - bounceOffset,
    center
  );

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
                  patternUnits="objectBoundingBox"
                  height="1"
                  width="1"
                >
                  <image
                    x="0"
                    y="0"
                    height={circleRadius * 2}
                    width={circleRadius * 2}
                    xlinkHref={page.backgroundImage}
                  ></image>
                </pattern>
              );
            })}
        </defs>
        <circle id="top" cx="50" cy="50" r="50" fill="url(#image)" />
        {siteMap.children.map((page, i) => {
          return (
            <Bubble
              key={page.url}
              page={page}
              startPoint={center}
              endPoint={circlePoints[i]}
              r={circleRadius}
              onClick={() => onBubbleClick(page.url)}
            />
          );
        })}
      </svg>
    </div>
  );
};
