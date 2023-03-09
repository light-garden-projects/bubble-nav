import { animated, useSpring } from "react-spring";
import { Page, Point } from "../types/types";

type BubbleProps = {
  page: Page;
  startPoint: Point;
  endPoint: Point;
  r?: number;
  fill?: string;
  stroke?: string;
  opacity?: number;
  strokeWidth?: number;
  onClick?: (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
  onMouseOver?: (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
  onMouseOut?: () => void;
};

export const Bubble = ({
  page,
  r = 20,
  stroke = "black",
  strokeWidth = 1,
  fill = "white",
  onMouseOver,
  onMouseOut,
  startPoint,
  endPoint,
  opacity,
  onClick,
}: BubbleProps) => {
  const [startX, startY] = startPoint;
  const [endX, endY] = endPoint;

  const moveIntoPlaceCircleSpring = useSpring({
    to: { cx: endX, cy: endY },
    from: { cx: startX, cy: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  const moveIntoPlaceSpring = useSpring({
    to: { x: endX, y: endY },
    from: { x: startX, y: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  return (
    <>
      <a href={page.url}>
        <animated.circle
          {...moveIntoPlaceCircleSpring}
          r={r}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={`url(#${page.backgroundImage})`}
          opacity={opacity}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          style={{ cursor: "pointer" }}
          onClick={onClick}
        />
      </a>
      <a href={page.url}>
        <animated.text
          {...moveIntoPlaceSpring}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize={12}
          fontWeight="bold"
        >
          {page.title}
        </animated.text>
      </a>
    </>
  );
};
