import style from "./WeatherInfo.module.css";
import { BsThermometerHalf, BsUmbrella, BsWind } from "react-icons/bs";

interface WeatherProps {
    temperature: string;
    rain: string;
    wind: string;
}
/**
 * This is the Weather Info component that is implemented at Weather Page.
 * @summary Renders a component that shows the current weather information.
 * @param props (temperature, rain and wind)
 * @returns Weather Info JSX Element
 */
const WeatherInfo = (props: WeatherProps): JSX.Element => {
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
