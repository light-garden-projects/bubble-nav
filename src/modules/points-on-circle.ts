import { Point } from "../types/types";

// A circle has 2 PI radians worth of angles
const NUM_RADIANS_IN_CIRCLE = Math.PI * 2;
// 90 degrees is one quarter of this
const NINETY_DEGREES = NUM_RADIANS_IN_CIRCLE / 4;
const FORTY_FIVE_DEGREES = NUM_RADIANS_IN_CIRCLE / 8;

type offset = "ninety" | "forty-five" | "one-eighty";

// const getPointsOnCircle = (numPoints, radius, centerXY, offset, rotate, simple);

// Calculates an arbitrary number of points on a circle,
// Given the radius and centre coordinates of the circle
export const getCirclePoints = (
  numPoints: number,
  radius = 1,
  centre: Point = [0, 0],
  offsetCircle?: offset,
  rotateCircle?: boolean
): Point[] => {
  if (!numPoints) return [];

  const offset: number = offsetCircle
    ? offsetCircle === "ninety"
      ? NINETY_DEGREES
      : offsetCircle === "forty-five"
      ? FORTY_FIVE_DEGREES
      : Math.PI
    : 0;

  const [centreX, centreY] = centre;

  const points: Point[] = Array(numPoints)
    .fill(0)
    .map((_, i) => {
      // Angle gap between points
      const angleGap = NUM_RADIANS_IN_CIRCLE / numPoints;
      // Go around the circle incrementing i
      const baseAngle = angleGap * i;
      // Start at TOP of the circle (90), not right edge (0)
      const offsetAngle = baseAngle - NINETY_DEGREES;
      // If num points is even
      // We want something more like a square than a diamond, to conserve space
      //   const theta = offsetCircle ? offsetAngle - angleGap / 2 : offsetAngle;
      const theta = offsetCircle ? offsetAngle + offset : offsetAngle;

      const x = centreX + radius * Math.cos(theta);
      const y = centreY + radius * Math.sin(theta);
      return [x, y];
    });

  const rotateAmount: number =
    Math.ceil(points.length / 4) + Math.ceil(points.length / 2);

  const rotatedPoints: Point[] = rotateArray(points, rotateAmount);

  return rotateCircle ? rotatedPoints : points;
};

const rotateArray = (arr: Point[], count = 1): Point[] => {
  return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
};
