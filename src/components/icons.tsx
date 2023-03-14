type IconProps = {
  color?: string;
  size?: number;
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
