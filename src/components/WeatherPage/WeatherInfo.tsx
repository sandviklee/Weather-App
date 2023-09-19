import style from "./WeatherInfo.module.css";
import { BsThermometerHalf, BsUmbrella, BsWind } from "react-icons/bs";

interface WeatherProps {
    temperature: string;
    rain: string;
    wind: string;
}

const WeatherInfo = (props: WeatherProps) => {
    return (
        <main className={style.main}>
            <div className={style.container}>
                <BsThermometerHalf className={style.icon} />
                <p className={style.information}>{props.temperature} C°</p>
            </div>
            <div className={style.container}>
                <BsUmbrella className={style.icon} />
                <p className={style.information}>
                    {props.rain} <sub>mm</sub>
                </p>
            </div>
            <div className={style.container}>
                <BsWind className={style.icon} />
                <p className={style.information}>
                    {props.wind} <sub>m/s</sub>
                </p>
            </div>
        </main>
    );
};

export default WeatherInfo;
