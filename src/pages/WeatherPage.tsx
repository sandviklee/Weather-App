import style from "../style/Weather.module.css";
import WeatherInfo from "../components/WeatherInfo";
import WeatherDayCourse from "../components/WeatherDayCourse";
import TodaysDate from "../components/TodaysDate";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillCalendar } from "react-icons/ai";

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
