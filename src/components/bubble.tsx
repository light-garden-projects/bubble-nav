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
};

export const Bubble = ({
  page,
  r = 20,
  stroke = "black",
  strokeWidth = 1,
  fill = "rgba(4,100,128, 1)",
  onMouseOver,
  onMouseOut,
  startPoint,
  endPoint,
  opacity,
  onClick,
  selected,
  fontSize = 12,
}: BubbleProps) => {
  const [startX, startY] = startPoint;
  const [endX, endY] = endPoint;

  const radius = selected
    ? r * SELECTED_CIRCLE_MULTIPLIER
    : r * UNSELECTED_CIRCLE_MULTIPLIER;

  const moveIntoPlaceCircleSpring = useSpring({
    to: { cx: endX, cy: endY },
    from: { cx: startX, cy: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  const moveIntoPlaceSpring = useSpring({
    to: { x: endX, y: endY + radius + fontSize },
    from: { x: startX, y: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  return (
    <>
      {/* <a href={page.url}> */}
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
      />
      {/* </a> */}
      {/* <a href={page.url}> */}
      <animated.text
        {...moveIntoPlaceSpring}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="black"
        fontSize={fontSize}
        fontWeight={selected ? "bold" : "normal"}
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        {page.title}
      </animated.text>
      {/* </a> */}
    </>
  );
};
