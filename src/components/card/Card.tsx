import styles from "./Card.module.css";
import WeatherIcon from "../icon/WeatherIcon";

interface CardProps {
  location: string;
  selected?: boolean;
  temperature: number;
  nightTemperature: number;
}

const Card = ({
  location,
  selected = false,
  temperature,
  nightTemperature,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h1 className={styles.location}>{location}</h1>
        <WeatherIcon status={"clearsky_day"} />
        <div className={styles.temperatures}>
          <p className={styles.temperature}>{temperature}°</p>
          <p className={styles.night_temperature}>{nightTemperature}°</p>
        </div>
      </div>
      {selected && <div className={styles.selected}></div>}
    </div>
  );
};

export default Card;
