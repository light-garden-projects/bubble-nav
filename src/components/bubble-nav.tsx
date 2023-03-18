import { useMemo, useRef, useState } from "react";
import useComponentSize from "@rehooks/component-size";
import {
  getAncestors,
  getCurrentPage,
  getParent,
  getSiblings,
  getTheme,
  shadeHexColor,
} from "../modules/parse-objects";
import { getCirclePoints } from "../modules/points-on-circle";
import { Page, Point } from "../types/types";
import { Bubble } from "./bubble";
import { Defs } from "./defs";
import { ParentOrChildCard } from "./child-card";
import { Theme } from "../index";
// import { Compass, IconEyeOpen } from "./icons";
import { IconEyeOpen } from "./icons";

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
  theme: Theme;
  showChildren: boolean;
};

export const SELECTED_CIRCLE_MULTIPLIER = 1.1;
export const UNSELECTED_CIRCLE_MULTIPLIER = 0.9;
const SHOW_CIRCLES_RIGHT = false;

export const BubbleNav = ({
  siteMap,
  currentUrl,
  maxWidth,
  theme,
  onBubbleClick,
  showChildren,
}: BubbleNavProps) => {
  const [open, setOpen] = useState(false);

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

  // Get the page object for the current URL
  const currentPage = useMemo(() => {
    return getCurrentPage(currentUrl, siteMap);
  }, [currentUrl, siteMap]);

  // Get the sibling pages for the current page
  const siblingPages = useMemo(() => {
    return getSiblings(currentPage);
  }, [currentPage]);

  // Get width of circles
  const circle1Radius = useMemo(() => {
    return siblingPages.length >= 10 ? navWidth / 14 : navWidth / 10;
  }, [navWidth, siblingPages]);

  const ring1Radius = useMemo(() => {
    const padding =
      siblingPages.length === 2 || siblingPages.length === 4 ? 1.1 : 0.8;
    const multiplier = siblingPages.length >= 10 ? 2.5 : 2;
    return navWidth / 2 - multiplier * circle1Radius * padding;
  }, [navWidth, circle1Radius, siblingPages]);

  const ring2Radius = ring1Radius * 2;
  const height = navWidth;

  const isRootPage = useMemo(() => {
    return !!currentPage && currentPage.url === siteMap.url;
  }, [currentPage, siteMap]);

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
      // isRootPage ? undefined : "forty-five"
    );

    // Combine them
    const pts = circle1Pages.map((page, i) => {
      return {
        page,
        point: circle1Points[i],
        id: page.url,
      };
    });

    return pts;
  }, [currentPage, siteMap, siblingPages, ring1Radius, center]);

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
  const centerCircle: CirclePoint | null = useMemo(() => {
    if (currentPage && currentPage.url === siteMap.url) {
      const p = { page: currentPage, point: center, id: currentPage.url };

      return p;
    } else {
      const parentPage = getParent(currentPage);
      return parentPage
        ? { page: parentPage, point: center, id: parentPage?.url }
        : null;
    }
  }, [currentPage, siteMap, center]);

  const parentPage: Page | undefined = useMemo(() => {
    if (currentPage && currentPage.url === siteMap.url) {
      return undefined;
    } else {
      const parentPage = getParent(currentPage);
      return parentPage;
    }
  }, [currentPage, siteMap]);

  const ancestorPages: Page[] = useMemo(() => {
    const ancestors = getAncestors(parentPage);
    // Reverse the array so that the root page is first
    return ancestors.reverse();
  }, [parentPage]);

  if (!currentPage) {
    return null;
  }

  return (
    <div
      key={currentUrl}
      ref={visRef}
      style={{
        maxWidth: maxWidth,
        height: height,
        margin: "auto",
      }}
    >
      {open && (
        <div style={{ marginBottom: 30 }}>
          {ancestorPages.map((page, i) => {
            return (
              <ParentOrChildCard
                key={i}
                page={page}
                onClick={() => onBubbleClick(page.url)}
                themeOverride={getTheme(currentPage).color}
                type={"parent"}
              />
            );
          })}
        </div>
      )}

      <svg width={navWidth} height={height}>
        <Defs
          circleRadius={circle1Radius}
          currentUrl={currentUrl}
          circles={centerCircle ? [...circle1, centerCircle] : [...circle1]}
          isRootPage={isRootPage}
          isOpen={open}
        />
        {open &&
          circle1.map((circle, i) => {
            const { page, point: circle1end } = circle;
            const isSelected = page.url === currentUrl;
            const { color: themeColor, level } = getTheme(page);
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
                  stroke={shadeHexColor(getTheme(page).color, -0.1)}
                  fill={shadeHexColor(themeColor, 0.25 * level)}
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
        {centerCircle && open && (
          <Bubble
            key={centerCircle.page.url}
            page={centerCircle.page}
            startPoint={centerCircle.point}
            endPoint={center}
            r={circle1Radius}
            onClick={() => {
              onBubbleClick(centerCircle.page.url);
              if (isRootPage && open) {
                setOpen(false);
              } else {
                setOpen(true);
              }
            }}
            stroke={getTheme(currentPage).color}
            selected={centerCircle.page.url === currentUrl}
            fill={shadeHexColor(
              getTheme(currentPage).color,
              getTheme(currentPage).level * 0.25
            )}
            showText={open}
          />
        )}
      </svg>
      {showChildren && open && (
        <div style={{ marginTop: 30 }}>
          {circle2.map((x, i) => {
            return (
              <ParentOrChildCard
                key={i}
                page={x.page}
                onClick={() => {
                  onBubbleClick(x.page.url);
                }}
              />
            );
          })}
        </div>
      )}
      {!open && (
        <button
          style={{
            background: "none",
            border: "none",
            outline: "none",
            cursor: "pointer",
            position: "absolute",
            top: 55,
            left: navWidth + 17,
            color: "rgba(251,248,253, 1)",
          }}
          onClick={() => setOpen(true)}
        >
          <IconEyeOpen color={theme.primaryColor} size={25} />
        </button>
      )}
    </div>
  );
};
