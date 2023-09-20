interface WeatherIconProps {
  dayOrNight: "day" | "night" | "neutral";
  status: "sunny" | "cloudy" | "rain" | "snowy";
  size?: number;
}

const WeatherIcon = ({ dayOrNight, status, size = 24 }: WeatherIconProps) => {
  let iconSrc = `/weather-icons/wi-${dayOrNight}-${status}.svg`;
  if (dayOrNight == "neutral") {
    iconSrc = `/weather-icons/wi-${status}.svg`;
  }

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

export default WeatherIcon;
