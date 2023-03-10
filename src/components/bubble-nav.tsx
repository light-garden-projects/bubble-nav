import { useEffect, useMemo } from "react";
import {
  getCurrentPage,
  getParent,
  getSiblings,
} from "../modules/parse-objects";
import { getCirclePoints } from "../modules/points-on-circle";
import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";

type CirclePoint = {
  point: Point;
  page: Page;
};

type BubbleNavProps = {
  siteMap: Page;
  currentUrl: string;
  onBubbleClick: (url: string) => void;
};

export const SELECTED_CIRCLE_MULTIPLIER = 1.1;
export const UNSELECTED_CIRCLE_MULTIPLIER = 0.7;

const width = 500;
const height = 500;
const center: Point = [width / 2, height / 2];
const circleRadius = width / 15;
const bounceOffset = 20;
const ring1Radius = width / 4;

export const BubbleNav = ({
  siteMap,
  currentUrl,
  onBubbleClick,
}: BubbleNavProps) => {
  // Get the page object for the current URL
  const currentPage = useMemo(() => {
    return getCurrentPage(currentUrl, siteMap);
  }, [currentUrl, siteMap]);

  const isRootPage = useMemo(() => {
    return currentPage && currentPage.url === siteMap.url;
  }, [currentPage, siteMap]);

  // Get the sibling pages for the current page
  const siblingPages = useMemo(() => {
    return getSiblings(currentPage);
  }, [currentPage]);

  //////////// CIRCLE1 ////////////
  // If the current page is the root page, circle1 is the children
  // Else, circle1 is the siblings
  const circle1: CirclePoint[] = useMemo(() => {
    // Get the pages to display on circle1
    let circle1Pages: Page[] = [];
    if (currentPage && currentPage.url === siteMap.url) {
      circle1Pages = currentPage.children;
    } else {
      circle1Pages = siblingPages;
    }

    // Get the points for those pages
    const numPointsOnCircle = circle1Pages.length;
    const circle1Points = getCirclePoints(
      numPointsOnCircle,
      ring1Radius,
      center
    );

    // Combine them
    return circle1Pages.map((page, i) => {
      return {
        page,
        point: circle1Points[i],
      };
    });
  }, [currentPage, siteMap, siblingPages]);

  //////////// CIRCLE2 ////////////

  const circle2: CirclePoint[] = useMemo(() => {
    let circle2pages: Page[] = [];
    // If the root page is selected, there is no circle2
    if (currentPage && currentPage.url === siteMap.url) {
      circle2pages = [];
    }
    // Else, circle2 is the children of the selected page
    else {
      circle2pages = currentPage?.children || [];
    }

    // Get the center point for circle2
    // This is the center of the selected page
    const circle2Center =
      circle1.find((circle) => circle.page.url === currentPage?.url)?.point ||
      center;

    // Get the points for those pages
    const numPointsOnCircle = circle2pages.length;
    const circle2Points = getCirclePoints(
      numPointsOnCircle,
      circleRadius * 2 + bounceOffset,
      circle2Center
    );

    // Combine them
    return circle2pages.map((page, i) => {
      return {
        page,
        point: circle2Points[i],
      };
    });
  }, [currentPage, siteMap, circle1]);

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

        width: width,
        height: height,
        margin: "auto",
      }}
    >
      <svg width={width} height={height}>
        <defs>
          {circle1
            .filter((circle) => circle.page.backgroundImage)
            .map((circle) => {
              const isSelected = circle.page.url === currentUrl;
              const multiplier = isSelected
                ? SELECTED_CIRCLE_MULTIPLIER
                : UNSELECTED_CIRCLE_MULTIPLIER;
              const effectiveRadius = circleRadius * multiplier;
              return (
                <pattern
                  key={circle.page.url}
                  id={circle.page.backgroundImage}
                  patternUnits="objectBoundingBox"
                  height="1"
                  width="1"
                >
                  <image
                    x="0"
                    y="0"
                    height={effectiveRadius * 2}
                    width={effectiveRadius * 2}
                    xlinkHref={circle.page.backgroundImage}
                    // If it's not selected, make it grayscale
                    style={{
                      filter:
                        isSelected || isRootPage ? "none" : "grayscale(100%)",
                    }}
                  ></image>
                </pattern>
              );
            })}
        </defs>
        {circle1.map((circle, i) => {
          const { page, point: circle1end } = circle;
          const isSelected = page.url === currentUrl;
          return (
            <>
              <Bubble
                key={page.url}
                page={page}
                startPoint={center}
                endPoint={circle1end}
                r={circleRadius}
                onClick={() => onBubbleClick(page.url)}
                selected={page.url === currentUrl}
                stroke={"rgba(4,100,128, 1)"}
              />
              {isSelected && (
                <>
                  {circle2.map((circle, i) => {
                    const { page, point: circle2end } = circle;
                    return (
                      <>
                        <Bubble
                          key={page.url}
                          page={page}
                          startPoint={circle1end}
                          endPoint={circle2end}
                          r={20}
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
