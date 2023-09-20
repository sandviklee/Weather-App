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
<<<<<<< HEAD
                            src={`/yr-icons/${props.weatherCourse[0]}.svg`}
=======
                            src={`../../src/assets/images/svg/${props.weatherCourse[0]}.svg`}
>>>>>>> d7388e3dc008ad0fd1af89f68a55ff891f2cc5c3
                            alt="Morning Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>MORGEN</p>
                        <img
                            className={style.weatherImage}
<<<<<<< HEAD
                            src={`/yr-icons/${props.weatherCourse[1]}.svg`}
=======
                            src={`../../src/assets/images/svg/${props.weatherCourse[1]}.svg`}
>>>>>>> d7388e3dc008ad0fd1af89f68a55ff891f2cc5c3
                            alt="Noon Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>AFTEN</p>
                        <img
                            className={style.weatherImage}
<<<<<<< HEAD
                            src={`/yr-icons/${props.weatherCourse[2]}.svg`}
=======
                            src={`../../src/assets/images/svg/${props.weatherCourse[2]}.svg`}
>>>>>>> d7388e3dc008ad0fd1af89f68a55ff891f2cc5c3
                            alt="Afternoon Weather"
                        />
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.weatherContainer}>
                        <p>KVELD</p>
                        <img
                            className={style.weatherImage}
<<<<<<< HEAD
                            src={`/yr-icons/${props.weatherCourse[3]}.svg`}
=======
                            src={`../../src/assets/images/svg/${props.weatherCourse[3]}.svg`}
>>>>>>> d7388e3dc008ad0fd1af89f68a55ff891f2cc5c3
                            alt="Night Weather"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WeatherDayCourse;
