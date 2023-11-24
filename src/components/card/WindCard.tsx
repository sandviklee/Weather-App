import styles from "./WindCard.module.css";

interface CardProps {
  WindSpeed: number;
  WindGust: number;
  WindDirection: number;
}

const convertFromDegreesToDirectionString = (degrees: number) => {
  const directions = [
    "nord",
    "nordøst",
    "øst",
    "sørøst",
    "sør",
    "sørvest",
    "vest",
    "nordvest",
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

const UVCard = ({ WindSpeed, WindGust, WindDirection }: CardProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Vind</p>
      <div className={styles.info_container}>
        <p className={styles.uv_index}>
          {WindSpeed}m/s{" "}
          <span style={{ color: "rgba(60,103,255,0.6)" }}> ({WindGust})</span>
        </p>
        <div className={styles.compass}>
          {convertFromDegreesToDirectionString(WindDirection)}
          <img
            src="/project1/icons/compass.svg"
            alt="arrow"
            width="24px"
            height="24px"
            style={{ transform: `rotate(${WindDirection}deg)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default UVCard;
