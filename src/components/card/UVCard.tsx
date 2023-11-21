import styles from "./UVCard.module.css";

interface CardProps {
  UVindex: number;
}

const UVCard = ({ UVindex }: CardProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>UV Index</p>
      <div className={styles.bar_container}>
        <div className={styles.bar}>
          <div
            style={{
              backgroundColor: "#FF8E3C",
              height: "100%",
              width: `${(UVindex / 6) * 100}%`,
            }}
          ></div>
        </div>
        <p className={styles.uv_index}>{UVindex}</p>
      </div>
    </div>
  );
};

export default UVCard;
