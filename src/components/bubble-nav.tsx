import { useMemo, useRef } from "react";
import useComponentSize from "@rehooks/component-size";
import {
  getCurrentPage,
  getParent,
  getSiblings,
} from "../modules/parse-objects";
import { getCirclePoints } from "../modules/points-on-circle";
import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";
import { Defs } from "./defs";

export type CirclePoint = {
  point: Point;
  page: Page;
  id: string;
};

type BubbleNavProps = {
  siteMap: Page;
  currentUrl: string;
  maxWidth: number;
  onBubbleClick: (url: string) => void;
};

export const SELECTED_CIRCLE_MULTIPLIER = 1.2;
export const UNSELECTED_CIRCLE_MULTIPLIER = 0.95;
const SHOW_CIRCLES_RIGHT = false;
const SPRING_PADDING = 0.15;

const MAX_WIDTH = 400;

export const BubbleNav = ({
  siteMap,
  currentUrl,
  maxWidth,
  onBubbleClick,
}: BubbleNavProps) => {
  // Keep track of width of vis
  let visRef = useRef(null);
  let { width: fullGraphWidth } = useComponentSize(visRef);
  const navWidth = useMemo(() => {
    return fullGraphWidth > maxWidth ? maxWidth : fullGraphWidth;
  }, [fullGraphWidth, maxWidth]);
  const center = useMemo(() => {
    const c: Point = navWidth ? [navWidth / 2, navWidth / 2] : [100, 100];
    return c;
  }, [navWidth]);

  // Various dimensions
  const height = navWidth;
  const circle1Radius = height / 10;
  const ring1Radius = height / 2 - 2 * circle1Radius * (1 - SPRING_PADDING);
  const ring2Radius = ring1Radius * 2;

  // Get the page object for the current URL
  const currentPage = useMemo(() => {
    return getCurrentPage(currentUrl, siteMap);
  }, [currentUrl, siteMap]);

  const isRootPage = useMemo(() => {
    return !!currentPage && currentPage.url === siteMap.url;
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
      center,
      isRootPage ? undefined : "ninety"
    );

    // Combine them
    const pts = circle1Pages.map((page, i) => {
      return {
        page,
        point: circle1Points[i],
        id: page.url,
      };
    });

    // Always put the current page at the top
    if (currentPage && !isRootPage) {
      const currentPagePoint = pts.find(
        (pt) => pt.page.url === currentPage.url
      );
      const firstPoint = pts[0];
      return pts.map((pt, i) => {
        if (i === 0) {
          return { ...pt, point: currentPagePoint?.point || firstPoint.point };
        } else if (pt.page.url === currentPage.url) {
          return { ...pt, point: firstPoint.point };
        } else {
          return pt;
        }
      });
    }

    return pts;
  }, [currentPage, siteMap, siblingPages, isRootPage, ring1Radius, center]);

  //////////// CIRCLE2 ////////////
  // Circle2 is not really a circle, but an arc of a large circle

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
    const circle2Center = center;

    // Get the points for those pages
    // We're only using a quarter of the circle for circle2
    // So we need to multiply the number of points by 4
    const numPointsOnCircle =
      circle2pages.length > 1
        ? (circle2pages.length - 1) * 4
        : circle2pages.length;

    const circle2Points = getCirclePoints(
      numPointsOnCircle,
      ring2Radius,
      circle2Center,
      "forty-five"
    );

    // Combine them
    return circle2pages.map((page, i) => {
      return {
        page,
        point: circle2Points[i],
        id: page.url,
      };
    });
  }, [currentPage, siteMap, ring2Radius, center]);

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
      ref={visRef}
      style={{
        border: "3px solid orange",
        maxWidth: MAX_WIDTH,
        height: height,
        margin: "auto",
      }}
    >
      <svg width={navWidth} height={height}>
        <Defs
          circleRadius={circle1Radius}
          currentUrl={currentUrl}
          circle1={circle1}
          isRootPage={isRootPage}
        />
        {circle1.map((circle, i) => {
          const { page, point: circle1end } = circle;
          const isSelected = page.url === currentUrl;
          return (
            <g key={i}>
              <Bubble
                key={page.url}
                page={page}
                startPoint={center}
                endPoint={circle1end}
                r={circle1Radius}
                onClick={() => onBubbleClick(page.url)}
                selected={page.url === currentUrl}
                stroke={"rgba(4,100,128, 1)"}
              />
              {isSelected && SHOW_CIRCLES_RIGHT && (
                <>
                  {circle2.map((circle, i) => {
                    const { page, id, point: circle2end } = circle;
                    return (
                      <Bubble
                        key={id}
                        page={page}
                        startPoint={circle1end}
                        endPoint={circle2end}
                        r={20}
                        onClick={() => onBubbleClick(page.url)}
                        selected={page.url === currentUrl}
                        stroke={"rgba(4,100,128, 1)"}
                      />
                    );
                  })}
                </>
              )}
            </g>
          );
        })}
        {/* Central circle */}
        {centerCircle && (
          <Bubble
            key={centerCircle.url}
            page={centerCircle}
            startPoint={center}
            endPoint={center}
            r={circle1Radius}
            onClick={() => onBubbleClick(centerCircle.url)}
            stroke={"rgba(4,100,128, 1)"}
            selected={centerCircle.url === currentUrl}
          />
        )}
      </svg>
      {circle2.map((x, i) => {
        return <div key={i}>{x.page.title}</div>;
      })}
    </div>
  );
};
