import style from "./WeatherDayCourse.module.css";
import WeatherIcon, { WeatherStatus } from "../icon/WeatherIcon";

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
        {props.extremalTemperatures[0]}C° / {props.extremalTemperatures[1]}C°
      </p>

      <div className={style.weathers}>
        <div className={style.container}>
          <div className={style.weatherContainer}>
            <p>NATT</p>
            <WeatherIcon
              status={props.weatherCourse[0] as WeatherStatus}
              size={60}
            />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.weatherContainer}>
            <p>MORGEN</p>
            <WeatherIcon
              status={props.weatherCourse[0] as WeatherStatus}
              size={60}
            />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.weatherContainer}>
            <p>AFTEN</p>
            <WeatherIcon
              status={props.weatherCourse[0] as WeatherStatus}
              size={60}
            />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.weatherContainer}>
            <p>KVELD</p>
            <WeatherIcon
              status={props.weatherCourse[0] as WeatherStatus}
              size={60}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WeatherDayCourse;
