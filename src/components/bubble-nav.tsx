import { useEffect, useMemo } from "react";
import {
  getCurrentPage,
  getParent,
  getSiblings,
} from "../modules/parse-objects";
import { getCirclePoints } from "../modules/points-on-circle";
import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";

type BubbleNavProps = {
  siteMap: Page;
  currentUrl: string;
  onBubbleClick: (url: string) => void;
};

export const SELECTED_CIRCLE_MULTIPLIER = 1.2;
export const UNSELECTED_CIRCLE_MULTIPLIER = 0.8;

const width = 500;
const height = 500;
const center: Point = [width / 2, height / 2];
const circleRadius = 50;
const bounceOffset = 20;

export const BubbleNav = ({
  siteMap,
  currentUrl,
  onBubbleClick,
}: BubbleNavProps) => {
  useEffect(() => {
    console.log("currentUrl", currentUrl);
  }, [currentUrl]);

  // Get the page object for the current URL
  const currentPage = useMemo(() => {
    return getCurrentPage(currentUrl, siteMap);
  }, [currentUrl, siteMap]);

  // Get the sibling pages for the current page
  const siblingPages = useMemo(() => {
    return getSiblings(currentPage);
  }, [currentPage]);

  //////////// CIRCLE1 ////////////
  // If the current page is the root page, circle1 is the children
  // Else, circle1 is the siblings
  const circle1 = useMemo(() => {
    if (currentPage && currentPage.url === siteMap.url) {
      return currentPage.children;
    } else {
      return siblingPages;
    }
  }, [currentPage, siteMap, siblingPages]);

  const numPointsOnCircle = circle1.length;
  const circlePoints = getCirclePoints(
    numPointsOnCircle,
    width / 2 - circleRadius - bounceOffset,
    center
  );

  //////////// CIRCLE2 ////////////
  // If the root page is selected, there is no circle2
  // Else, circle2 is the children of the selected page
  const circle2 = useMemo(() => {
    if (currentPage && currentPage.url === siteMap.url) {
      return [];
    } else {
      return currentPage?.children || [];
    }
  }, [currentPage, siteMap]);

  //////////// CENTER CIRCLE ////////////
  // If the current page is the root page, the center circle is the root page
  // Else, the center circle is the parent page
  const centerCircle = useMemo(() => {
    if (currentPage && currentPage.url === siteMap.url) {
      return currentPage;
    } else {
      return getParent(currentPage);
    }
  }, [currentPage, siteMap]);

  if (!currentPage) {
    return null;
  }

  return (
    <div
      key={currentUrl}
      style={{
        border: "1px solid black",
      }}
    >
      <svg width={width} height={height}>
        <defs>
          {circle1
            .filter((page) => page.backgroundImage)
            .map((page) => {
              const isSelected = page.url === currentUrl;
              const multiplier = isSelected
                ? SELECTED_CIRCLE_MULTIPLIER
                : UNSELECTED_CIRCLE_MULTIPLIER;
              const effectiveRadius = circleRadius * multiplier;
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
                    height={effectiveRadius * 2}
                    width={effectiveRadius * 2}
                    xlinkHref={page.backgroundImage}
                  ></image>
                </pattern>
              );
            })}
        </defs>
        <circle id="top" cx="50" cy="50" r="50" fill="url(#image)" />
        {circle1.map((page, i) => {
          const isSelected = page.url === currentUrl;
          return (
            <>
              <Bubble
                key={page.url}
                page={page}
                startPoint={center}
                endPoint={circlePoints[i]}
                r={circleRadius}
                onClick={() => onBubbleClick(page.url)}
                selected={page.url === currentUrl}
                stroke={"rgba(4,100,128, 1)"}
              />
              {isSelected && (
                <>
                  {circle2.map((page, i) => {
                    return (
                      <>
                        <Bubble
                          key={page.url}
                          page={page}
                          startPoint={circlePoints[i]}
                          endPoint={circlePoints[i]}
                          r={circleRadius}
                          onClick={() => onBubbleClick(page.url)}
                          selected={page.url === currentUrl}
                          stroke={"rgba(4,100,128, 1)"}
                        />
                      </>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
        {/* Central circle */}
        {centerCircle && (
          <Bubble
            key={centerCircle.url}
            page={centerCircle}
            startPoint={center}
            endPoint={center}
            r={circleRadius}
            onClick={() => onBubbleClick(centerCircle.url)}
            stroke={"rgba(4,100,128, 1)"}
            selected={centerCircle.url === currentUrl}
          />
        )}
      </svg>
    </div>
  );
};
