import styles from "./Card.module.css";
import WeatherIcon from "../icon/WeatherIcon";
import { WeatherStatus } from "../icon/WeatherIcon";

interface CardProps {
  location: string;
  selected?: boolean;
  temperature: number;
  next12hours: number;
  status: WeatherStatus;
}

const Card = ({
  location,
  selected = false,
  temperature,
  next12hours,
  status,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.container}
        style={
          selected
            ? { backgroundColor: "black", color: "white" }
            : { backgroundColor: "white" }
        }
      >
        <h1 className={styles.location}>{location}</h1>
        <WeatherIcon status={status} />
        <div className={styles.temperatures}>
          <p className={styles.temperature}>{temperature}°</p>
          <p className={styles.night_temperature}>{next12hours}°</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
