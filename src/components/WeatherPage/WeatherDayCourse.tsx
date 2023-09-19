import style from "./WeatherDayCourse.module.css";

interface DayCourseProps {
    extremalTemperatures: Array<string>;
    weatherCourse: Array<string>;
}

const WeatherDayCourse = (props: DayCourseProps) => {
    return (
        <main className={style.main}>
            <p className={style.extremalTemp}>Maks/Min Temperatur</p>
            <p className={style.temperatures}>
                {props.extremalTemperatures[0]}C° /{" "}
                {props.extremalTemperatures[1]}C°
            </p>

            <div className={style.weathers}>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>NATT</p>
                        <img
                            className={style.weatherImage}
                            src={`../src/assets/images/svg/${props.weatherCourse[0]}.svg`}
                            alt="Morning Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>MORGEN</p>
                        <img
                            className={style.weatherImage}
                            src={`../src/assets/images/svg/${props.weatherCourse[1]}.svg`}
                            alt="Noon Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>AFTEN</p>
                        <img
                            className={style.weatherImage}
                            src={`../src/assets/images/svg/${props.weatherCourse[2]}.svg`}
                            alt="Afternoon Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>KVELD</p>
                        <img
                            className={style.weatherImage}
                            src={`../src/assets/images/svg/${props.weatherCourse[3]}.svg`}
                            alt="Night Weather"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WeatherDayCourse;
