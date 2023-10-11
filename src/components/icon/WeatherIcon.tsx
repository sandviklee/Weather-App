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

interface WeatherIconProps {
    status: WeatherStatus;
    size?: number;
}

const WeatherIcon = ({ status, size = 24 }: WeatherIconProps) => {
    let iconSrc = `./yr-icons/${status}.svg`;

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
