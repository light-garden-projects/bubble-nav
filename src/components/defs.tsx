import {
  CirclePoint,
  SELECTED_CIRCLE_MULTIPLIER,
  UNSELECTED_CIRCLE_MULTIPLIER,
} from "./bubble-nav";

type DefsProps = {
  circles: CirclePoint[];
  currentUrl: string;
  isRootPage: boolean;
  circleRadius: number;
  isOpen: boolean;
};

// SVG defs are used to define reusable elements
// This is where we put the background images for the circles
export const Defs = ({
  circles,
  currentUrl,
  isRootPage,
  circleRadius,
}: DefsProps) => {
  return (
    <defs>
      {circles
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
                  filter: isSelected || isRootPage ? "none" : "grayscale(100%)",
                }}
              ></image>
            </pattern>
          );
        })}
    </defs>
  );
};
