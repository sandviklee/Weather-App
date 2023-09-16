import style from "../style/WeatherDayCourse.module.css";

interface Info {
    extremalTemperatures: string;
    weatherCourse: Array<string>;
}

const WeatherDayCourse = () => {
    return (
        <main className={style.main}>
            <div className={style.container}>
                <p>Hei!</p>
            </div>
            <div className={style.container}>
                <p>Hei!</p>
            </div>
            <div className={style.container}>
                <p>Hei!</p>
            </div>
            <div className={style.container}>
                <p>Hei!</p>
            </div>
        </main>
    );
};

export default WeatherDayCourse;
