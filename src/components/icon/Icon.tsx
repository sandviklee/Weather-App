export type IconType = "search" | "arrow-right" | "map-pin";

interface IconProps {
  icon: IconType;
  size?: number;
}

const Icon = ({ icon, size = 24 }: IconProps) => {
  const iconSrc = `/icons/${icon}.svg`;
  return (
    <img
      src={iconSrc}
      alt="WeatherStatus"
      width={size}
      height={size}
      style={{ margin: "0px" }}
      draggable={false}
    />
  );
};

export default Icon;
