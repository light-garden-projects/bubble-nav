import { animated, useSpring } from "react-spring";
import { Page, Point } from "../types/types";
import {
  SELECTED_CIRCLE_MULTIPLIER,
  UNSELECTED_CIRCLE_MULTIPLIER,
} from "./bubble-nav";

type BubbleProps = {
  page: Page;
  startPoint: Point;
  endPoint: Point;
  r?: number;
  fill?: string;
  stroke?: string;
  opacity?: number;
  strokeWidth?: number;
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseOver?: (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
  onMouseOut?: () => void;
  selected?: boolean;
  fontSize?: number;
  showText?: boolean;
};

export const Bubble = ({
  page,
  r = 20,
  stroke = "black",
  strokeWidth = 0,
  fill = "rgba(4,100,128, 1)",
  onMouseOver,
  onMouseOut,
  startPoint,
  endPoint,
  opacity,
  onClick,
  selected,
  fontSize = 10,
  showText = true,
}: BubbleProps) => {
  const [startX, startY] = startPoint;
  const [endX, endY] = endPoint;

  const radius = selected
    ? r * SELECTED_CIRCLE_MULTIPLIER
    : r * UNSELECTED_CIRCLE_MULTIPLIER;

  const radiusAdjustedEndX = selected ? endX : endX;

  const moveIntoPlaceCircleSpring = useSpring({
    to: { cx: radiusAdjustedEndX, cy: endY },
    from: { cx: startX, cy: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  const moveIntoPlaceText1Spring = useSpring({
    to: { x: radiusAdjustedEndX, y: endY + radius + fontSize },
    from: { x: startX, y: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  const moveIntoPlaceText2Spring = useSpring({
    to: { x: radiusAdjustedEndX, y: endY + radius + fontSize * 2 + 2 },
    from: { x: startX, y: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  return (
    <>
      <a href={page.url}>
        <animated.circle
          {...moveIntoPlaceCircleSpring}
          r={radius}
          stroke={stroke}
          strokeWidth={selected ? strokeWidth + 5 : strokeWidth}
          fill={page.backgroundImage ? `url(#${page.backgroundImage})` : fill}
          opacity={opacity}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          style={{ cursor: "pointer" }}
          onClick={onClick}
          // tabIndex={1}
        />
      </a>
      {showText && (
        <a href={page.url}>
          <animated.text
            {...moveIntoPlaceText1Spring}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="black"
            fontSize={fontSize}
            fontWeight={selected ? "bold" : "normal"}
            style={{ cursor: "pointer" }}
            onClick={onClick}
          >
            {page.titleLine1 || page.title}
          </animated.text>
          {page.titleLine2 && (
            <animated.text
              {...moveIntoPlaceText2Spring}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="black"
              fontSize={fontSize}
              fontWeight={selected ? "bold" : "normal"}
              style={{ cursor: "pointer" }}
              onClick={onClick}
            >
              {page.titleLine2}
            </animated.text>
          )}
        </a>
      )}
    </>
  );
};
