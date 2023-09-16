import style from "../style/Weather.module.css";
import WeatherInfo from "../components/WeatherInfo";
import WeatherDayCourse from "../components/WeatherDayCourse";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillCalendar } from "react-icons/ai";

const TodaysDate = () => {
    const date: Date = new Date();
    const days: Array<string> = new Array(
        "Søndag",
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag"
    );
    const months: Array<string> = new Array(
        "Jan",
        "Feb",
        "Mars",
        "Apr",
        "Mai",
        "Juni",
        "Juli",
        "Aug",
        "Sept",
        "Okt",
        "Nov",
        "Des"
    );
    const curDayOfWeek: string = days[date.getDay()];
    const curMonth: string = months[date.getMonth()];

    return (
        <p>
            {curDayOfWeek} {date.getDay()}. {curMonth}
        </p>
    );
};

const WeatherPage = () => {
    const { id } = useParams();

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
                <hr style={{ width: "46%", marginTop: "12px" }} />
                <div className={style.content}>
                    <div className={style.date}>
                        <AiFillCalendar />
                        <TodaysDate />
                    </div>
                    <WeatherInfo temperature="11" rain="8" wind="2" />
                    <WeatherDayCourse />
                </div>
            </div>
        </main>
    );
};

export default WeatherPage;
