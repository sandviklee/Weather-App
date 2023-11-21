export type WeatherStatus =
  | "clearsky_day"
  | "clearsky_night"
  | "cloudy"
  | "fair_day"
  | "fog"
  | "heavyrain"
  | "heavyrainandthunder"
  | "heavyrainshowers_day"
  | "lightrain"
  | "lightrainshowers_day"
  | "lightrain"
  | "lightrainshowers_day"
  | "no_weather"
  | "partlycloudy_day"
  | "partlycloudy_night"
  | "rain"
  | "rainshowers_day"
  | "rainshowers_night"
  | "rainshowersandthunder_day"
  | "sleet"
  | "snow"
  | "snowandthunder";

export const norwegianWeatherStatusMapping = {
  clearsky_day: "Klarvær",
  clearsky_night: "Klarvær",
  cloudy: "Overskyet",
  fair_day: "Delvis skyet",
  fog: "Tåke",
  heavyrain: "Kraftig regn",
  heavyrainandthunder: "Kraftig regn og torden",
  heavyrainshowers_day: "Kraftige regnbyger",
  lightrain: "Lett regn",
  lightrainshowers_day: "Lette regnbyger",
  no_weather: "Ingen værdata",
  partlycloudy_day: "Delvis skyet",
  partlycloudy_night: "Delvis skyet",
  rain: "Regn",
  rainshowers_day: "Regnbyger",
  rainshowers_night: "Regnbyger",
  rainshowersandthunder_day: "Regnbyger og torden",
  sleet: "Sludd",
  snow: "Snø",
  snowandthunder: "Snø og torden",
};

interface WeatherIconProps {
  status: WeatherStatus;
  size?: number;
}

const WeatherIcon = ({ status, size = 24 }: WeatherIconProps) => {
  const iconSrc = `/project1/yr-icons/${status}.svg`;

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
