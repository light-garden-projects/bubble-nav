type IconProps = {
  color?: string;
  size?: number;
  onClick?: () => void;
  x?: number;
  y?: number;
};

export const ArrowRightCircle = ({ color, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill={color || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0-512 0zm281 129c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24h182.1l-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
    </svg>
  );
};

export const AngleRight = ({ color, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 512"
      fill={color || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
    </svg>
  );
};

export const AngleLeft = ({ color, size = 24 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 512"
      fill={color || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    </svg>
  );
};

export const Compass = ({
  color,
  size = 24,
  onClick,
  x = 50,
  y = 50,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill={color || "currentColor"}
      xmlns="http://://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
      x={x}
      y={y}
    >
      <path
        fill={color || "currentColor"}
        d="M464 256a208 208 0 1 0-416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm306.7 69.1-144.3 55.5c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31l-55.5 144.3c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0-64 0 32 32 0 1 0 64 0z"
      />
    </svg>
  );
};

export const IconEyeOpen = ({ color, size }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M12 19.5C6.5 19.5 3 15 1.5 12 3 9 6.5 4.5 12 4.5S21 9 22.5 12c-1.5 3-5 7.5-10.5 7.5Z"
        stroke={"currentColor"}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={color || "none"}
      />
      <circle
        cx={12}
        cy={12}
        r={3}
        stroke={"currentColor"}
        strokeWidth={2}
        fill={color || "none"}
      />
    </svg>
  );
};
