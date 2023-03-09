import { animated, useSpring } from "react-spring";
import { Point } from "../types/types";

type BubbleProps = {
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

  const moveIntoPlaceSpring = useSpring({
    to: { cx: endX, cy: endY },
    from: { cx: startX, cy: startY },
    config: { mass: 5, tension: 500, friction: 65, clamp: false },
  });

  return (
    <animated.circle
      {...moveIntoPlaceSpring}
      r={r}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    />
  );
};
