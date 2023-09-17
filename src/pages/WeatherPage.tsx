import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../style/Weather.module.css";
import WeatherInfo from "../components/WeatherInfo";
import WeatherDayCourse from "../components/WeatherDayCourse";
import TodaysDate from "../components/TodaysDate";
import TodaysDateComponent from "../components/TodaysDateComponent";
import { AiOutlineHeart, AiFillCalendar } from "react-icons/ai";

interface WeatherParameters {
    lat: string;
    lon: string;
}

const WeatherPage = (props: WeatherParameters) => {
    const { id } = useParams();
    const [weather, setWeather] = useState(null);
    const endpoint: string = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${props.lat}&lon=${props.lon}`;

    const filterWeatherData: any = (data: any) => {
        return new Array(
            data["properties"]["timeseries"].filter(
                (values: { [x: string]: string }) =>
                    values["time"].split("T")[0] == TodaysDate()
            )
        );
    };

    useEffect(() => {
        axios.get(endpoint).then((response) => {
            setWeather(
                response.data !== null ? filterWeatherData(response.data) : null
            );
        });
    }, []);

    useEffect(() => {
        console.log(weather);
    }, [weather]);

    if (!weather) return null;

    return (
        <main className={style.main}>
            <div className={style.container}>
                <div className={style.titleContent}>
                    <div className={style.titlePlacement}>
                        <p className={style.title}>{id?.toUpperCase()}</p>
                        <button className={style.heartButton}>
                            <AiOutlineHeart className={style.heart} />
                        </button>
                    </div>
                    <p className={style.cityTitle}>by (Trøndelag)</p>
                </div>
                <hr
                    style={{
                        width: "48%",
                        marginTop: "10px",
                        marginBottom: "2px",
                    }}
                />
                <div className={style.contentBackground} />
                <div className={style.content}>
                    <div className={style.date}>
                        <AiFillCalendar />
                        <TodaysDateComponent />
                    </div>
                    <WeatherInfo temperature="11" rain="8" wind="2" />
                    <WeatherDayCourse />
                </div>
            </div>
        </main>
    );
};

export default WeatherPage;
