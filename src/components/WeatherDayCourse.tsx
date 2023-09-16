import style from "../style/WeatherDayCourse.module.css";
import weatherMock from "../assets/images/svg/25d.svg";

interface Info {
    extremalTemperatures: string;
    weatherCourse: Array<string>;
}

const WeatherDayCourse = () => {
    return (
        <main className={style.main}>
            <p className={style.extremalTemp}>Maks/Min Temperatur</p>
            <p className={style.temperatures}>11C° / 8C°</p>

            <div className={style.weathers}>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>NATT</p>
                        <img
                            className={style.weatherImage}
                            src={weatherMock}
                            alt="Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>MORGEN</p>
                        <img
                            className={style.weatherImage}
                            src={weatherMock}
                            alt="Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>AFTEN</p>
                        <img
                            className={style.weatherImage}
                            src={weatherMock}
                            alt="Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>KVELD</p>
                        <img
                            className={style.weatherImage}
                            src={weatherMock}
                            alt="Weather"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WeatherDayCourse;
