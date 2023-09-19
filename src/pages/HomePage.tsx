import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./../style/Home.module.css";
import Card from "../components/card/Card";
import Field from "../components/input/field/Field";
import WeatherIcon from "../components/icon/WeatherIcon";
import Icon from "../components/icon/Icon";
import Selector from "../components/input/selector/Selector";

const HomePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        // Cleanup: clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour clock
    };
    const formattedTime = currentDate.toLocaleTimeString(
        undefined,
        timeOptions
    );

    const dagNavn = [
        "Søndag",
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag",
    ];

    const dag = dagNavn[currentDate.getDay()];

    return (
        <main className={styles.main}>
            <div className={styles.sidebar}>
                <div className={styles.input}>
                    <Field placeholder="Søk for områder" icon="search" />
                </div>
                <div className={styles.current_weather}>
                    <WeatherIcon dayOrNight="day" status="sunny" size={120} />
                </div>
                <h3 className={styles.temperature}>15°C</h3>
                <h3 className={styles.location}>Trondheim</h3>
                <h3 className={styles.day_time}>
                    <span className={styles.day}>{dag},</span>{" "}
                    <span className={styles.time}>{formattedTime}</span>
                </h3>
                <div className={styles.extra_info}>
                    <WeatherIcon dayOrNight="day" status="sunny" size={40} />
                    <h4>Sol</h4>
                </div>
                <div className={styles.extra_info}>
                    <WeatherIcon dayOrNight="neutral" status="rain" size={40} />
                    <h4>Nedbør - 10mm</h4>
                </div>
                <div className={styles.link_container}>
                    <Link to="/Weather/Trondheim" className={styles.link}>
                        <p>Trykk her for å se mer info for Trondheim</p>
                        <Icon icon="arrow-right" size={25} />
                    </Link>
                </div>
            </div>
            <div className={styles.favorites}>
                <h3>Oversikt over dine plasser</h3>
                <Selector selections={["I dag", "I morgen"]} />
                <div className={styles.card_container}>
                    <Card
                        location="Trondheim"
                        temperature={15}
                        selected={true}
                        nightTemperature={-3}
                    />
                    <Card
                        location="Oslo"
                        temperature={12}
                        nightTemperature={-8}
                    />
                    <Card
                        location="Fornebu"
                        temperature={19}
                        nightTemperature={-2}
                    />
                </div>
                <div className={styles.header}>
                    <h3>
                        Høydepunkter for{" "}
                        <span style={{ textDecoration: "underline" }}>
                            Trondheim
                        </span>
                    </h3>
                    <Link to="/Weather/Trondheim" className={styles.link2}>
                        <div className={styles.link2}>
                            <p>Se mer info</p>
                            <Icon icon="arrow-right" size={25} />
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default HomePage;
