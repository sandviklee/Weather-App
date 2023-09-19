import style from "./WeatherDayCourse.module.css";

interface DayCourseProps {
    extremalTemperatures: Array<string>;
    weatherCourse: Array<string>;
}

/**
 * This is the Course of day Weather Information component.
 * @summary Renders a component with information about the course of day
 * @param props (extrmalTemperatures, weatherCourse)
 * @returns Weather Course of Day JSX Element
 */
const WeatherDayCourse = (props: DayCourseProps): JSX.Element => {
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
                            src={`../../src/assets/images/svg/${props.weatherCourse[0]}.svg`}
                            alt="Morning Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>MORGEN</p>
                        <img
                            className={style.weatherImage}
                            src={`../../src/assets/images/svg/${props.weatherCourse[1]}.svg`}
                            alt="Noon Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>AFTEN</p>
                        <img
                            className={style.weatherImage}
                            src={`../../src/assets/images/svg/${props.weatherCourse[2]}.svg`}
                            alt="Afternoon Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>KVELD</p>
                        <img
                            className={style.weatherImage}
                            src={`../../src/assets/images/svg/${props.weatherCourse[3]}.svg`}
                            alt="Night Weather"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WeatherDayCourse;
