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
