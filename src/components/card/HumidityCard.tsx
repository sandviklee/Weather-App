import styles from "./HumidityCard.module.css";

interface CardProps {
  humidity: number;
}

/**
 * Returns a status for given humidity.
 * @param humidity 
 * @returns status string
 */
const convertFromRelativeHumidityToStatusString = (humidity: number) => {
  if (humidity < 30) {
    return "Lav";
  } else if (humidity >= 30 && humidity <= 60) {
    return "Normal";
  } else {
    return "Høy";
  }
};

/**
 * Returns a color for given humidity.
 * @param humidity 
 * @returns a hex color string
 */
const convertFromRelativeHumidityToColorStatus = (humidity: number) => {
  if (humidity < 30) {
    return "#FFFA8D";
  } else if (humidity >= 30 && humidity <= 60) {
    return "#B2FF8D";
  } else {
    return "#FF8D8D";
  }
};

const HumidityCard = ({ humidity }: CardProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Luftfuktighet</p>
      <div className={styles.humidity_container}>
        <div className={styles.status_container}>
          <div
            className={styles.circle}
            style={{
              backgroundColor:
                convertFromRelativeHumidityToColorStatus(humidity),
            }}
          ></div>
          <p>{convertFromRelativeHumidityToStatusString(humidity)}</p>
        </div>
        <p className={styles.humidity}>{humidity}%</p>
      </div>
    </div>
  );
};

export default HumidityCard;
