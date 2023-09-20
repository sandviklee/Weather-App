import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./../style/Home.module.css";
import Card from "../components/card/Card";
import Field from "../components/input/field/Field";
import WeatherIcon from "../components/icon/WeatherIcon";
import Icon from "../components/icon/Icon";
import Selector from "../components/input/selector/Selector";
import { useQueries, useQuery } from "@tanstack/react-query";

const HomePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fieldValue, setFieldValue] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [weathers, setWeathers] = useState<any>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 10000); // Update every second

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

    // const favorites_test = [
    //     { name: "Trondheim", lat: "63.43048", lon: "10.39506" },
    //     { name: "Oslo", lat: "59.91273", lon: "10.74609" },
    // ];

    // const favorites_test = ["Trondheim", "Oslo"];

    // localStorage.setItem("favorites", JSON.stringify(favorites_test));

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const [currentLocation, setCurrentLocation] = useState<string | null>(
        favorites[0]["name"]
    );

    const results = useQueries({
        queries: favorites.map((place: any) => ({
            queryKey: ["weatherData", place["name"]],
            queryFn: () =>
                fetch(
                    `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${place["lat"]}&lon=${place["lon"]}`
                ).then((res) => res.json()),
        })),
    });

    useEffect(() => {
        // console.log(favorites);
        // console.log(results[0]["data"]["properties"]["timeseries"]);
        let weatherDataWithPlace = "";
        results.map(
            (data: any) =>
                (weatherDataWithPlace += `{ place: ${
                    favorites[results.indexOf(data)]["name"]
                }, data: ${data["data"]["properties"]["timeseries"]} }`)
        );
    }, [results]);

    return (
        <>
            {fieldValue.length > 0 && (
                <div
                    className={styles.search}
                    onClick={() => setFieldValue("")}
                >
                    <div className={styles.search_box}></div>
                </div>
            )}
            <div className={styles.input}>
                <Field
                    placeholder="Søk for områder"
                    icon="search"
                    value={fieldValue}
                    setValue={setFieldValue}
                />
            </div>
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <div className={styles.current_weather}>
                        <WeatherIcon
                            dayOrNight="day"
                            status="sunny"
                            size={120}
                        />
                    </div>
                    <h3 className={styles.temperature}>15°C</h3>
                    <h3 className={styles.location}>{currentLocation}</h3>
                    <h3 className={styles.day_time}>
                        <span className={styles.day}>{dag},</span>{" "}
                        <span className={styles.time}>{formattedTime}</span>
                    </h3>
                    <div className={styles.extra_info}>
                        <WeatherIcon
                            dayOrNight="day"
                            status="sunny"
                            size={40}
                        />
                        <h4>Sol</h4>
                    </div>
                    <div className={styles.extra_info}>
                        <WeatherIcon
                            dayOrNight="neutral"
                            status="rain"
                            size={40}
                        />
                        <h4>Nedbør - 10mm</h4>
                    </div>
                    <div className={styles.link_container}>
                        <Link
                            to="/Trondheim/63.43048/10.39506"
                            className={styles.link}
                        >
                            <p>
                                Trykk her for å se mer info for{" "}
                                {currentLocation}
                            </p>
                            <Icon icon="arrow-right" size={25} />
                        </Link>
                    </div>
                </div>
                <div className={styles.favorites}>
                    <h3>Oversikt over dine plasser</h3>
                    <Selector selections={["I dag", "I morgen"]} />
                    <div className={styles.card_container}>
                        {favorites.map((location: any, index: number) => (
                            <button
                                key={location["name"]}
                                onClick={() =>
                                    setCurrentLocation(location["name"])
                                }
                                className={styles.button}
                            >
                                <Card
                                    key={index}
                                    location={location["name"]}
                                    temperature={15}
                                    selected={
                                        location["name"] == currentLocation
                                    }
                                    nightTemperature={-3}
                                />
                            </button>
                        ))}
                    </div>
                    <div className={styles.header}>
                        <h3>
                            Høydepunkter for{" "}
                            <span style={{ textDecoration: "underline" }}>
                                {currentLocation}
                            </span>
                        </h3>
                        <Link
                            to="/Trondheim/63.43048/10.39506"
                            className={styles.link2}
                        >
                            <div className={styles.link2}>
                                <p>Se mer info</p>
                                <Icon icon="arrow-right" size={25} />
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;
