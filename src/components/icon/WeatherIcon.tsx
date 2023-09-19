interface WeatherIconProps {
  dayOrNight: "day" | "night" | "neutral";
  status: "sunny" | "cloudy" | "rain" | "snowy";
  size?: number;
}

const WeatherIcon = ({ dayOrNight, status, size = 24 }: WeatherIconProps) => {
  let iconSrc = `public/weather-icons/wi-${dayOrNight}-${status}.svg`;
  if (dayOrNight == "neutral") {
    iconSrc = `public/weather-icons/wi-${status}.svg`;
  }

  return (
    <img
      src={iconSrc}
      alt="WeatherStatus"
      width={size}
      height={size}
      style={{ margin: "0px" }}
    />
  );
};

export default WeatherIcon;
